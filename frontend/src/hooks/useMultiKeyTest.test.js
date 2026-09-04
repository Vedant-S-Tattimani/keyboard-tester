import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useMultiKeyTest } from './useMultiKeyTest';

describe('useMultiKeyTest', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it('tracks simultaneous keys and peak accurately', () => {
    const { result } = renderHook(() => useMultiKeyTest());

    expect(result.current.pressedKeys.size).toBe(0);
    expect(result.current.maxSimultaneous).toBe(0);

    act(() => {
      dispatchKeyEvent('keydown', 'KeyW', 'w');
      dispatchKeyEvent('keydown', 'KeyA', 'a');
    });

    expect(result.current.pressedKeys.size).toBe(2);
    expect(result.current.maxSimultaneous).toBe(2);
    expect(result.current.pressedKeys.has('KeyW')).toBe(true);

    act(() => {
      dispatchKeyEvent('keydown', 'KeyS', 's');
    });

    expect(result.current.pressedKeys.size).toBe(3);
    expect(result.current.maxSimultaneous).toBe(3);

    act(() => {
      dispatchKeyEvent('keyup', 'KeyW', 'w');
    });

    expect(result.current.pressedKeys.size).toBe(2);
    expect(result.current.maxSimultaneous).toBe(3); // Peak remains 3
  });

  it('ignores duplicate keydown repeats to prevent artificial inflation', () => {
    const { result } = renderHook(() => useMultiKeyTest());

    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a', false);
      dispatchKeyEvent('keydown', 'KeyA', 'a', true);
      dispatchKeyEvent('keydown', 'KeyA', 'a', true);
    });

    expect(result.current.pressedKeys.size).toBe(1);
    expect(result.current.maxSimultaneous).toBe(1);
  });

  it('handles focus loss (blur) by resetting active keys but preserving max', () => {
    const { result } = renderHook(() => useMultiKeyTest());

    act(() => {
      dispatchKeyEvent('keydown', 'KeyQ', 'q');
      dispatchKeyEvent('keydown', 'KeyE', 'e');
    });

    expect(result.current.pressedKeys.size).toBe(2);

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });

    expect(result.current.pressedKeys.size).toBe(0);
    expect(result.current.maxSimultaneous).toBe(2);
  });

  it('resets max simultaneous back to 0', () => {
    const { result } = renderHook(() => useMultiKeyTest());

    act(() => {
      dispatchKeyEvent('keydown', 'KeyZ', 'z');
      dispatchKeyEvent('keyup', 'KeyZ', 'z');
      result.current.reset();
    });

    expect(result.current.maxSimultaneous).toBe(0);
  });
});
