import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useEventInspector } from './useEventInspector';

describe('useEventInspector', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const dispatchKeyEvent = (type, code, key, repeat = false, modifiers = {}) => {
    const event = new KeyboardEvent(type, {
      code,
      key,
      repeat,
      ctrlKey: modifiers.ctrlKey || false,
      shiftKey: modifiers.shiftKey || false,
      altKey: modifiers.altKey || false,
      metaKey: modifiers.metaKey || false,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  };

  it('records keydown and keyup events', () => {
    const { result } = renderHook(() => useEventInspector());

    act(() => {
      dispatchKeyEvent('keydown', 'KeyA', 'a');
    });

    expect(result.current.events.length).toBe(1);
    expect(result.current.events[0].type).toBe('keydown');
    expect(result.current.events[0].code).toBe('KeyA');
    expect(result.current.pressedKeys.has('KeyA')).toBe(true);

    act(() => {
      dispatchKeyEvent('keyup', 'KeyA', 'a');
    });

    expect(result.current.events.length).toBe(2);
    expect(result.current.events[0].type).toBe('keyup'); // prepended
    expect(result.current.pressedKeys.has('KeyA')).toBe(false);
  });

  it('bounds the event log to MAX_EVENTS (100)', () => {
    const { result } = renderHook(() => useEventInspector());

    act(() => {
      for (let i = 0; i < 110; i++) {
        dispatchKeyEvent('keydown', 'KeyA', 'a');
      }
    });

    expect(result.current.events.length).toBe(100);
    expect(result.current.counters.total).toBe(110);
  });

  it('pauses and resumes event recording', () => {
    const { result } = renderHook(() => useEventInspector());

    act(() => {
      result.current.togglePause();
    });

    act(() => {
      dispatchKeyEvent('keydown', 'KeyB', 'b');
    });

    expect(result.current.events.length).toBe(0);

    act(() => {
      result.current.togglePause();
    });
    act(() => {
      dispatchKeyEvent('keydown', 'KeyB', 'b');
    });

    expect(result.current.events.length).toBe(1);
  });

  it('detects modifier anomalies in diagnostic mode', () => {
    const { result } = renderHook(() => useEventInspector());

    act(() => {
      result.current.startDiagnostic();
    });
    act(() => {
      // Dispatching ShiftLeft keydown but event.shiftKey is false
      dispatchKeyEvent('keydown', 'ShiftLeft', 'Shift', false, { shiftKey: false });
    });

    expect(result.current.diagnostic.anomalies.length).toBe(1);
    expect(result.current.diagnostic.anomalies[0].type).toBe('MODIFIER_STATE_CHANGE');
  });

  it('handles focus loss safely (blur)', () => {
    const { result } = renderHook(() => useEventInspector());

    act(() => {
      dispatchKeyEvent('keydown', 'KeyC', 'c');
    });

    expect(result.current.pressedKeys.has('KeyC')).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });

    expect(result.current.pressedKeys.has('KeyC')).toBe(false);
  });
});
