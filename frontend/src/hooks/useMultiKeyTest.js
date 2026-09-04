import { useState, useEffect, useCallback } from 'react';

export const useMultiKeyTest = () => {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [maxSimultaneous, setMaxSimultaneous] = useState(0);
  const [eventHistory, setEventHistory] = useState([]);

  const addEventToHistory = (type, code) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEventHistory(prev => {
      const newEvent = { id: Date.now() + Math.random(), type, code, timestamp };
      const nextHistory = [newEvent, ...prev];
      if (nextHistory.length > 50) {
        return nextHistory.slice(0, 50);
      }
      return nextHistory;
    });
  };

  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    if (e.repeat) return; // Ignore repeats completely

    const { code } = e;

    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.add(code);
      
      setMaxSimultaneous(currentMax => Math.max(currentMax, next.size));
      return next;
    });

    addEventToHistory('+', code);
  }, []);

  const handleKeyUp = useCallback((e) => {
    e.preventDefault();
    const { code } = e;
    
    setPressedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
        addEventToHistory('-', code);
      }
      return next;
    });
  }, []);

  const handleBlur = useCallback(() => {
    setPressedKeys(new Set());
  }, []);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      setPressedKeys(new Set());
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp, { passive: false });
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
  }, [handleKeyDown, handleKeyUp, handleBlur, handleVisibilityChange]);

  const reset = useCallback(() => {
    setPressedKeys(new Set());
    setMaxSimultaneous(0);
    setEventHistory([]);
  }, []);

  return { pressedKeys, maxSimultaneous, eventHistory, reset };
};
