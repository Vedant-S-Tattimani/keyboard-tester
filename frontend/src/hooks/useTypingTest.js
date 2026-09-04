import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomPassage } from '../utils/typingPassages';
import { calculateCorrectCharacters, calculateWPM, calculateAccuracy, splitGraphemes } from '../utils/typingUtils';

export const useTypingTest = (language = 'en') => {
  const [duration, setDuration] = useState(30);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [passage, setPassage] = useState(getRandomPassage(language));
  const [userInput, setUserInput] = useState('');
  
  const [status, setStatus] = useState('idle'); // 'idle', 'running', 'paused', 'finished'
  
  const timerRef = useRef(null);

  // Stats
  const correctCharacters = calculateCorrectCharacters(userInput, passage);
  const totalCharacters = splitGraphemes(userInput).length;
  const elapsedSeconds = duration - timeRemaining;
  const wpm = calculateWPM(correctCharacters, elapsedSeconds);
  const accuracy = calculateAccuracy(correctCharacters, totalCharacters);
  const incorrectCharacters = totalCharacters - correctCharacters;

  const changeDuration = useCallback((newDuration) => {
    if (status === 'idle') {
      setDuration(newDuration);
      setTimeRemaining(newDuration);
    }
  }, [status]);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setUserInput('');
    setTimeRemaining(duration);
    setTimeRemaining(duration);
    setStatus('idle');
    setPassage(getRandomPassage(language));
  }, [duration, language]);

  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus('finished');
  }, []);

  // Update passage when language changes, but only if idle
  useEffect(() => {
    if (status === 'idle') {
      setPassage(getRandomPassage(language));
    }
  }, [language]);

  // Timer Tick
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, finishTest]);

  // Focus loss
  useEffect(() => {
    const handleBlur = () => {
      if (status === 'running') setStatus('paused');
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && status === 'running') setStatus('paused');
    };

    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [status]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status === 'finished') return;
      if (status === 'paused') {
        setStatus('running'); // Resume on key press
      }
      
      const { key, ctrlKey, altKey, metaKey } = e;
      if (ctrlKey || altKey || metaKey) return; // Ignore system shortcuts

      if (key === 'Backspace') {
        e.preventDefault();
        setUserInput(prev => splitGraphemes(prev).slice(0, -1).join(''));
        return;
      }

      if (key.length > 1) return; // Ignore modifiers

      if (status === 'idle') {
        setStatus('running');
      }

      if (key === ' ') e.preventDefault(); // Stop page scroll

      setUserInput(prev => {
        const next = prev + key;
        if (splitGraphemes(next).length >= splitGraphemes(passage).length) {
          finishTest();
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, passage, finishTest]);

  return {
    passage,
    userInput,
    duration,
    timeRemaining,
    wpm,
    accuracy,
    correctCharacters,
    incorrectCharacters,
    status,
    changeDuration,
    resetTest
  };
};
