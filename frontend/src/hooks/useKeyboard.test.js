import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useKeyboard } from './useKeyboard';

// Mock the getRequiredTestableKeys utility
vi.mock('../components/Keyboard/keyboardUtils', () => ({
  getRequiredTestableKeys: (layout, mode) => {
    if (mode === 'Function') {
      return new Set(['F1', 'F2', 'F3']);
    }
    return new Set(['KeyA', 'KeyB', 'KeyC']);
  }
}));

describe('useKeyboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const dispatchKeyEvent = (type, code, key, repeat = false) => {
    const event = new KeyboardEvent(type, {
      code,
      key,
      repeat,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  };

  it('initializes with NOT STARTED status', () => {
    const { result } = renderHook(() => useKeyboard('QWERTY', 'FULL'));
    expect(result.current.status).toBe('NOT STARTED');
    expect(result.current.pressedKeys.size).toBe(0);
    expect(result.current.testedKeys.size).toBe(0);
    expect(result.current.elapsedTime).toBe(0);
  });

  it('starts testing and tracks keys on keydown', () => {
    const { result } = renderHook(() => useKeyboard('QWERTY', 'FULL'));

    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a');
    });

    expect(result.current.status).toBe('TESTING');
    expect(result.current.pressedKeys.has('KeyA')).toBe(true);
    expect(result.current.testedKeys.has('KeyA')).toBe(true);
    expect(result.current.lastEvent.code).toBe('KeyA');
  });

  it('removes keys from pressedKeys on keyup but keeps them in testedKeys', () => {
    const { result } = renderHook(() => useKeyboard('QWERTY', 'FULL'));

    act(() => {
      dispatchKeyEvent('keydown', 'KeyB', 'b');
      dispatchKeyEvent('keyup', 'KeyB', 'b');
    });

    expect(result.current.pressedKeys.has('KeyB')).toBe(false);
    expect(result.current.testedKeys.has('KeyB')).toBe(true);
  });

  it('ignores repeated keydown events', () => {
    const { result } = renderHook(() => useKeyboard('QWERTY', 'FULL'));

    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a', false);
    });
    
    const sizeBefore = result.current.pressedKeys.size;
    
    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a', true);
    });

    expect(result.current.pressedKeys.size).toBe(sizeBefore); // Should not change
  });

  it('completes the test when all required keys are tested', () => {
    const { result } = renderHook(() => useKeyboard('QWERTY', 'FULL'));

    // Mock required keys: KeyA, KeyB, KeyC
    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a');
      dispatchKeyEvent('keydown', 'KeyB', 'b');
      dispatchKeyEvent('keydown', 'KeyC', 'c');
    });

    expect(result.current.status).toBe('COMPLETE');
    expect(result.current.completionPercentage).toBe(100);
  });

  it('tracks elapsed time accurately while TESTING', () => {
    const { result } = renderHook(() => useKeyboard('QWERTY', 'FULL'));

    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a');
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.elapsedTime).toBe(2);

    act(() => {
      result.current.reset();
    });

    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.status).toBe('NOT STARTED');
  });

  it('detects focus loss anomalies if keys are held', () => {
    const { result } = renderHook(() => useKeyboard('QWERTY', 'FULL'));

    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a');
    });

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });

    expect(result.current.status).toBe('POSSIBLE ISSUE');
    expect(result.current.anomalies.length).toBe(1);
    expect(result.current.pressedKeys.has('KeyA')).toBe(false);
  });
});
