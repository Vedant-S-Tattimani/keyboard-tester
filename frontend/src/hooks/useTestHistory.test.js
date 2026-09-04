import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useTestHistory } from './useTestHistory';

describe('useTestHistory', () => {
  const HISTORY_KEY = 'keycheck_test_history';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes with empty history if localStorage is empty', () => {
    const { result } = renderHook(() => useTestHistory());
    expect(result.current.history).toEqual([]);
  });

  it('safely recovers from malformed localStorage JSON', () => {
    localStorage.setItem(HISTORY_KEY, '{ "malformed": true }'); // Object instead of Array
    const { result } = renderHook(() => useTestHistory());
    expect(result.current.history).toEqual([]); // Fallback
  });

  it('loads valid array from localStorage', () => {
    const mockData = [{ id: 1, mode: 'Full' }];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(mockData));
    
    const { result } = renderHook(() => useTestHistory());
    expect(result.current.history).toEqual(mockData);
  });

  it('saves new session and prepends it to history', () => {
    const { result } = renderHook(() => useTestHistory());
    
    act(() => {
      result.current.saveSession({ id: 2, mode: 'Main' });
    });

    expect(result.current.history).toEqual([{ id: 2, mode: 'Main' }]);
    expect(JSON.parse(localStorage.getItem(HISTORY_KEY))).toEqual([{ id: 2, mode: 'Main' }]);

    act(() => {
      result.current.saveSession({ id: 3, mode: 'Numpad' });
    });

    expect(result.current.history).toEqual([
      { id: 3, mode: 'Numpad' },
      { id: 2, mode: 'Main' }
    ]);
  });

  it('strictly limits history to 10 items (MAX_HISTORY)', () => {
    const mockInitial = Array.from({ length: 10 }, (_, i) => ({ id: i }));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(mockInitial));

    const { result } = renderHook(() => useTestHistory());
    
    act(() => {
      result.current.saveSession({ id: 100 });
    });

    expect(result.current.history.length).toBe(10);
    expect(result.current.history[0]).toEqual({ id: 100 });
    // The oldest item (id: 9) should be dropped
    expect(result.current.history).not.toContainEqual({ id: 9 });
  });

  it('clears history completely', () => {
    const mockData = [{ id: 1, mode: 'Full' }];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(mockData));

    const { result } = renderHook(() => useTestHistory());
    
    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toEqual([]);
    expect(localStorage.getItem(HISTORY_KEY)).toBeNull();
  });
});
