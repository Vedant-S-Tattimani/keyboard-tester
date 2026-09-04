import { useState, useEffect, useCallback, useRef } from 'react';
import { getRequiredTestableKeys } from '../components/Keyboard/keyboardUtils';

export const useKeyboard = (layout, mode = 'FULL') => {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [testedKeys, setTestedKeys] = useState(new Set());
  const [lastEvent, setLastEvent] = useState(null);
  
  // Session tracking
  const [status, setStatus] = useState('NOT STARTED'); // NOT STARTED, TESTING, COMPLETE, INCOMPLETE, POSSIBLE ISSUE
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [anomalies, setAnomalies] = useState([]);
  
  // Refs for timer and anomaly detection
  const timerRef = useRef(null);
  const keydownTimes = useRef(new Map()); // track how long a key is held

  const pressedKeysRef = useRef(pressedKeys);
  useEffect(() => {
    pressedKeysRef.current = pressedKeys;
  }, [pressedKeys]);

  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const requiredKeys = getRequiredTestableKeys(layout, mode);
  const totalRequired = requiredKeys.size;
  
  // Compute coverage (intersection of tested and required)
  const requiredTestedCount = Array.from(testedKeys).filter(k => requiredKeys.has(k)).length;
  const completionPercentage = totalRequired > 0 ? Math.floor((requiredTestedCount / totalRequired) * 100) : 0;

  // Check for auto-completion (ignoring set-state-in-effect as this logic controls test completion boundaries)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (status === 'TESTING' && requiredTestedCount >= totalRequired) {
      setStatus('COMPLETE');
      clearInterval(timerRef.current);
    }
  }, [requiredTestedCount, totalRequired, status]);

  // Timer
  useEffect(() => {
    if (status === 'TESTING') {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [status]);

  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    
    // Status management
    setStatus(prev => {
      if (prev === 'NOT STARTED') {
        return 'TESTING';
      }
      return prev;
    });

    if (e.repeat) return; // Do not process held keys repeatedly

    const { code, key } = e;

    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.add(code);
      return next;
    });

    setTestedKeys((prev) => {
      const next = new Set(prev);
      next.add(code);
      return next;
    });

    setLastEvent({ code, key });
    keydownTimes.current.set(code, Date.now());
  }, []);

  const handleKeyUp = useCallback((e) => {
    e.preventDefault();
    const { code } = e;
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(code);
      return next;
    });
    keydownTimes.current.delete(code);
  }, []);

  const handleBlur = useCallback(() => {
    // If keys were held during blur, flag an anomaly (Stuck Key)
    if (pressedKeysRef.current.size > 0 && statusRef.current === 'TESTING') {
      setAnomalies(prev => [...prev, 'Stuck key detected across focus loss.']);
      setStatus('POSSIBLE ISSUE');
    }
    setPressedKeys(new Set());
    keydownTimes.current.clear();
  }, []);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      setPressedKeys(new Set());
      keydownTimes.current.clear();
    }
  }, []);

  useEffect(() => {
    // We only attach listeners if the test isn't forcefully finished
    if (status !== 'COMPLETE' && status !== 'INCOMPLETE') {
      window.addEventListener('keydown', handleKeyDown, { passive: false });
      window.addEventListener('keyup', handleKeyUp, { passive: false });
    }
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('layoutChange', handleBlur); 
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('layoutChange', handleBlur);
    };
  }, [handleKeyDown, handleKeyUp, handleBlur, handleVisibilityChange, status]);

  const reset = useCallback(() => {
    setPressedKeys(new Set());
    setTestedKeys(new Set());
    setLastEvent(null);
    setStatus('NOT STARTED');
    setElapsedTime(0);
    setAnomalies([]);
    keydownTimes.current.clear();
    clearInterval(timerRef.current);
  }, []);

  const finishTest = useCallback(() => {
    if (status === 'TESTING') {
      setStatus('INCOMPLETE');
      clearInterval(timerRef.current);
    }
  }, [status]);

  // Reset when mode changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    reset();
  }, [mode, reset]);

  return { 
    pressedKeys, 
    testedKeys, 
    lastEvent, 
    reset,
    finishTest,
    status,
    elapsedTime,
    requiredKeys,
    requiredTestedCount,
    totalRequired,
    completionPercentage,
    anomalies
  };
};
