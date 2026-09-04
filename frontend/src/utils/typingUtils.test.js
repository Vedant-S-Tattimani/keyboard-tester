import { describe, it, expect } from 'vitest';
import { calculateWPM, calculateAccuracy } from './typingUtils';

describe('typingUtils', () => {
  describe('calculateWPM', () => {
    it('calculates 20 WPM for 100 correct characters in 60 seconds', () => {
      expect(calculateWPM(100, 60)).toBe(20);
    });

    it('returns 0 if elapsed minutes is 0', () => {
      expect(calculateWPM(100, 0)).toBe(0);
    });

    it('returns 0 if correct characters is 0', () => {
      expect(calculateWPM(0, 60)).toBe(0);
    });
    
    it('calculates fractional minutes properly (30 seconds)', () => {
      // 50 characters in 30 seconds = 10 words / 0.5 mins = 20 WPM
      expect(calculateWPM(50, 30)).toBe(20);
    });
  });

  describe('calculateAccuracy', () => {
    it('calculates 100% accuracy', () => {
      expect(calculateAccuracy(100, 100)).toBe(100);
    });

    it('calculates 95% accuracy', () => {
      expect(calculateAccuracy(95, 100)).toBe(95);
    });

    it('returns 0 if total characters is 0 (prevents division by zero)', () => {
      expect(calculateAccuracy(0, 0)).toBe(0);
    });

    it('rounds correctly to one decimal place', () => {
      // 2 correct out of 3 = 66.666... % -> 66.7%
      expect(calculateAccuracy(2, 3)).toBe(66.7);
    });
  });
});
