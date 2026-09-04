import { useState, useEffect, useCallback, useRef } from 'react';

const MAX_EVENTS = 100;
const MAX_ANOMALIES = 100;
const MAX_DURATIONS = 500;

const DEFAULT_DIAGNOSTIC_STATE = {
  isActive: false,
  startedAt: null,
  endedAt: null,
  counters: {
    events: 0,
    keydown: 0,
    keyup: 0,
    repeats: 0,
    paired: 0,
    focusInterruptions: 0
  },
  uniqueCodes: new Set(),
  activeKeydowns: new Map(), // code -> { timestamp, repeat }
  anomalies: [],
  holdDurations: []
};

export const useEventInspector = () => {
  const [events, setEvents] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  
  // Track counts separately since the queue is bounded
  const [counters, setCounters] = useState({
    total: 0,
    keydown: 0,
    keyup: 0,
    repeats: 0
  });

  const [diagnostic, setDiagnostic] = useState(DEFAULT_DIAGNOSTIC_STATE);

  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const diagnosticRef = useRef(diagnostic);
  useEffect(() => {
    diagnosticRef.current = diagnostic;
  }, [diagnostic]);

  const handleEvent = useCallback((e) => {
    if (isPausedRef.current) return;

    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault();
    }

    const {
      type, key, code, location, repeat, isComposing,
      ctrlKey, shiftKey, altKey, metaKey
    } = e;
    
    const timestamp = performance.now();

    const eventPayload = {
      id: crypto.randomUUID(),
      type, key, code, location, repeat, isComposing,
      ctrlKey, shiftKey, altKey, metaKey,
      timestamp,
      date: new Date()
    };

    setEvents(prev => {
      const newQueue = [eventPayload, ...prev];
      if (newQueue.length > MAX_EVENTS) {
        return newQueue.slice(0, MAX_EVENTS);
      }
      return newQueue;
    });

    setCounters(prev => ({
      total: prev.total + 1,
      keydown: prev.keydown + (type === 'keydown' ? 1 : 0),
      keyup: prev.keyup + (type === 'keyup' ? 1 : 0),
      repeats: prev.repeats + (repeat ? 1 : 0)
    }));

    setPressedKeys(prev => {
      const newSet = new Set(prev);
      if (type === 'keydown') {
        newSet.add(code);
      } else if (type === 'keyup') {
        newSet.delete(code);
      }
      return newSet;
    });

    // --- Diagnostic Logic ---
    if (diagnosticRef.current.isActive) {
      setDiagnostic(prev => {
        const { counters: dCounters, uniqueCodes, activeKeydowns, anomalies, holdDurations } = prev;
        
        const newCounters = { ...dCounters };
        newCounters.events++;
        if (type === 'keydown') newCounters.keydown++;
        if (type === 'keyup') newCounters.keyup++;
        if (repeat) newCounters.repeats++;

        const newUniqueCodes = new Set(uniqueCodes);
        if (code) newUniqueCodes.add(code);

        const newActiveKeydowns = new Map(activeKeydowns);
        let newAnomalies = [...anomalies];
        let newHoldDurations = [...holdDurations];

        const addAnomaly = (anomaly) => {
          newAnomalies.unshift(anomaly);
          if (newAnomalies.length > MAX_ANOMALIES) {
            newAnomalies = newAnomalies.slice(0, MAX_ANOMALIES);
          }
        };

        // Modifier validation (simple heuristic)
        if (code === 'ShiftLeft' || code === 'ShiftRight') {
           if (type === 'keydown' && !shiftKey) {
               addAnomaly({ type: 'MODIFIER_STATE_CHANGE', code, timestamp, explanation: 'Shift keydown but event.shiftKey is false', severity: 'WARNING' });
           }
        }
        if (code === 'ControlLeft' || code === 'ControlRight') {
           if (type === 'keydown' && !ctrlKey) {
               addAnomaly({ type: 'MODIFIER_STATE_CHANGE', code, timestamp, explanation: 'Control keydown but event.ctrlKey is false', severity: 'WARNING' });
           }
        }
        if (code === 'AltLeft' || code === 'AltRight') {
           if (type === 'keydown' && !altKey) {
               addAnomaly({ type: 'MODIFIER_STATE_CHANGE', code, timestamp, explanation: 'Alt keydown but event.altKey is false', severity: 'WARNING' });
           }
        }

        if (type === 'keydown') {
          if (!repeat) {
            if (newActiveKeydowns.has(code)) {
              addAnomaly({ type: 'KEYDOWN_WITHOUT_KEYUP', code, timestamp, explanation: 'Keydown observed without prior keyup for this key', severity: 'WARNING' });
            }
            newActiveKeydowns.set(code, { timestamp, repeat });
          } else {
             // Normal repeat - do nothing for anomalies
          }
        } else if (type === 'keyup') {
          if (!newActiveKeydowns.has(code)) {
            addAnomaly({ type: 'UNPAIRED_KEYUP', code, timestamp, explanation: 'Keyup observed without prior keydown for this key', severity: 'WARNING' });
          } else {
            const startEvent = newActiveKeydowns.get(code);
            const duration = timestamp - startEvent.timestamp;
            newHoldDurations.push(duration);
            if (newHoldDurations.length > MAX_DURATIONS) {
              newHoldDurations.shift(); // Keep bounded
            }
            newActiveKeydowns.delete(code);
            newCounters.paired++;
          }
        }

        return {
          ...prev,
          counters: newCounters,
          uniqueCodes: newUniqueCodes,
          activeKeydowns: newActiveKeydowns,
          anomalies: newAnomalies,
          holdDurations: newHoldDurations
        };
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEvent);
    window.addEventListener('keyup', handleEvent);

    return () => {
      window.removeEventListener('keydown', handleEvent);
      window.removeEventListener('keyup', handleEvent);
    };
  }, [handleEvent]);

  // Handle window blur (focus loss) to prevent stuck visual keys
  useEffect(() => {
    const handleBlur = () => {
      setPressedKeys(new Set());
      
      if (diagnosticRef.current.isActive) {
        setDiagnostic(prev => {
          if (prev.activeKeydowns.size > 0) {
            let newAnomalies = [{ 
              type: 'FOCUS_INTERRUPTION', 
              code: 'Multiple', 
              timestamp: performance.now(), 
              explanation: 'Focus lost while keys were held. Keyups may be unobservable.', 
              severity: 'WARNING' 
            }, ...prev.anomalies];
            
            if (newAnomalies.length > MAX_ANOMALIES) {
                newAnomalies = newAnomalies.slice(0, MAX_ANOMALIES);
            }
            
            const newCounters = { ...prev.counters };
            newCounters.focusInterruptions++;

            return {
              ...prev,
              activeKeydowns: new Map(),
              anomalies: newAnomalies,
              counters: newCounters
            };
          }
          return prev;
        });
      }
    };
    
    const handleVisibilityChange = () => {
       if (document.visibilityState === 'hidden') handleBlur();
    };

    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
    setCounters({ total: 0, keydown: 0, keyup: 0, repeats: 0 });
    setPressedKeys(new Set());
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(p => !p);
  }, []);

  const startDiagnostic = useCallback(() => {
    setDiagnostic({
      ...DEFAULT_DIAGNOSTIC_STATE,
      isActive: true,
      startedAt: new Date()
    });
  }, []);

  const stopDiagnostic = useCallback(() => {
    setDiagnostic(prev => {
      if (!prev.isActive) return prev;
      
      let newAnomalies = [...prev.anomalies];
      let activeKeysLeft = prev.activeKeydowns.size;
      
      if (activeKeysLeft > 0) {
        prev.activeKeydowns.forEach((val, code) => {
           newAnomalies.unshift({ 
               type: 'UNPAIRED_KEYDOWN_AT_END', 
               code, 
               timestamp: performance.now(), 
               explanation: 'Session ended before keyup was observed.', 
               severity: 'INFO' 
            });
        });
      }
      if (newAnomalies.length > MAX_ANOMALIES) {
          newAnomalies = newAnomalies.slice(0, MAX_ANOMALIES);
      }

      return {
        ...prev,
        isActive: false,
        endedAt: new Date(),
        activeKeydowns: new Map(),
        anomalies: newAnomalies
      };
    });
  }, []);

  const resetDiagnostic = useCallback(() => {
    setDiagnostic(DEFAULT_DIAGNOSTIC_STATE);
  }, []);

  return {
    events,
    isPaused,
    pressedKeys,
    counters,
    clearEvents,
    togglePause,
    diagnostic,
    startDiagnostic,
    stopDiagnostic,
    resetDiagnostic
  };
};
