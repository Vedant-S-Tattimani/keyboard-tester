import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useLayout } from './useLayout';

describe('useLayout', () => {
  const LAYOUT_KEY = 'keycheck_layout';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to QWERTY when localStorage is empty', () => {
    const { result } = renderHook(() => useLayout());
    expect(result.current.layout).toBe('QWERTY');
  });

  it('loads supported layout from localStorage', () => {
    localStorage.setItem(LAYOUT_KEY, 'AZERTY');
    const { result } = renderHook(() => useLayout());
    expect(result.current.layout).toBe('AZERTY');
  });

  it('falls back to QWERTY if localStorage contains an unsupported layout', () => {
    localStorage.setItem(LAYOUT_KEY, 'DVORAK');
    const { result } = renderHook(() => useLayout());
    expect(result.current.layout).toBe('QWERTY');
  });

  it('updates layout and syncs to localStorage', () => {
    const { result } = renderHook(() => useLayout());
    
    act(() => {
      result.current.setLayout('QWERTZ');
    });

    expect(result.current.layout).toBe('QWERTZ');
    expect(localStorage.getItem(LAYOUT_KEY)).toBe('QWERTZ');
  });

  it('ignores invalid layouts via setLayout', () => {
    const { result } = renderHook(() => useLayout());
    
    act(() => {
      result.current.setLayout('UNSUPPORTED_LAYOUT');
    });

    // Should remain QWERTY
    expect(result.current.layout).toBe('QWERTY');
    expect(localStorage.getItem(LAYOUT_KEY)).toBeNull();
  });

  it('synchronizes state across multiple hook instances via CustomEvent', () => {
    const { result: hook1 } = renderHook(() => useLayout());
    const { result: hook2 } = renderHook(() => useLayout());
    
    act(() => {
      hook1.current.setLayout('AZERTY');
    });

    expect(hook1.current.layout).toBe('AZERTY');
    expect(hook2.current.layout).toBe('AZERTY');
  });
});
