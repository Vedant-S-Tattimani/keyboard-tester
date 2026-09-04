import { useState, useCallback } from 'react';

const HISTORY_KEY = 'keycheck_test_history';
const MAX_HISTORY = 10;

export const useTestHistory = () => {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to read test history from localStorage', e);
    }
    return [];
  });

  const saveSession = useCallback((session) => {
    setHistory(prev => {
      const currentHistory = Array.isArray(prev) ? prev : [];
      const newHistory = [session, ...currentHistory].slice(0, MAX_HISTORY);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (e) {
        console.error('Failed to save test history to localStorage', e);
      }
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear test history in localStorage', e);
    }
  }, []);

  return { history, saveSession, clearHistory };
};
