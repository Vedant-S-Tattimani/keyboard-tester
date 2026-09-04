import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateReportData, generateReportText, formatKeyCode, downloadJSON } from './reportUtils';

describe('reportUtils', () => {
  describe('generateReportData', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-01T12:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('generates a complete report from test state', () => {
      const state = {
        layout: 'AZERTY',
        mode: 'Function',
        status: 'completed',
        requiredTestedCount: 12,
        totalRequired: 12,
        completionPercentage: 100,
        elapsedTime: 5.5,
        requiredKeys: new Set(['F1', 'F2']),
        testedKeys: new Set(['F1', 'F2'])
      };

      const result = generateReportData(state);

      expect(result.reportVersion).toBe(1);
      expect(result.generatedAt).toBe('2024-01-01T12:00:00.000Z');
      expect(result.test.layout).toBe('AZERTY');
      expect(result.test.mode).toBe('Function');
      expect(result.test.testedKeys).toBe(12);
      expect(result.test.totalTestableKeys).toBe(12);
      expect(result.test.completionPercentage).toBe(100);
      expect(result.test.durationSeconds).toBe(5.5);
      expect(result.test.status).toBe('completed');
      expect(result.test.remainingKeys).toEqual([]);
    });

    it('handles incomplete sessions correctly', () => {
      const state = {
        requiredKeys: new Set(['KeyA', 'KeyB', 'KeyC']),
        testedKeys: new Set(['KeyB']),
        completionPercentage: 33
      };

      const result = generateReportData(state);
      expect(result.test.remainingKeys).toEqual(['KeyA', 'KeyC']); // Alphabetical sorting
      expect(result.test.completionPercentage).toBe(33);
    });

    it('handles empty states safely', () => {
      const result = generateReportData({});
      expect(result.test.layout).toBe('QWERTY');
      expect(result.test.mode).toBe('FULL');
      expect(result.test.testedKeys).toBe(0);
      expect(result.test.totalTestableKeys).toBe(0);
      expect(result.test.remainingKeys).toEqual([]);
    });
  });

  describe('generateReportText', () => {
    it('formats a report string correctly', () => {
      const data = {
        test: {
          status: 'completed',
          mode: 'Main',
          layout: 'QWERTZ',
          testedKeys: 60,
          totalTestableKeys: 60,
          completionPercentage: 100,
          durationSeconds: 125
        }
      };
      
      const text = generateReportText(data);
      expect(text).toContain('Status: completed');
      expect(text).toContain('Mode: Main');
      expect(text).toContain('Layout: QWERTZ');
      expect(text).toContain('Coverage: 60/60');
      expect(text).toContain('Completion: 100%');
      expect(text).toContain('Duration: 02:05');
      expect(text).toContain('No raw keyboard events are included.');
    });
  });

  describe('formatKeyCode', () => {
    it('formats standard keys', () => {
      expect(formatKeyCode('KeyA')).toBe('Key A');
      expect(formatKeyCode('Digit1')).toBe('Digit1');
      expect(formatKeyCode('ShiftLeft')).toBe('Shift Left');
      expect(formatKeyCode('NumpadEnter')).toBe('Numpad Enter');
    });

    it('handles falsy values', () => {
      expect(formatKeyCode('')).toBe('');
      expect(formatKeyCode(null)).toBe('');
      expect(formatKeyCode(undefined)).toBe('');
    });
  });

  describe('downloadJSON', () => {
    it('constructs a blob and triggers download', () => {
      // Mock DOM methods
      const mockCreateObjectURL = vi.fn();
      const mockRevokeObjectURL = vi.fn();
      global.URL.createObjectURL = mockCreateObjectURL;
      global.URL.revokeObjectURL = mockRevokeObjectURL;

      const mockAppendChild = vi.fn();
      const mockRemoveChild = vi.fn();
      document.body.appendChild = mockAppendChild;
      document.body.removeChild = mockRemoveChild;

      const clickMock = vi.fn();
      const aMock = { click: clickMock };
      vi.spyOn(document, 'createElement').mockReturnValue(aMock);

      downloadJSON({ test: 123 }, 'test.json');

      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(mockAppendChild).toHaveBeenCalledWith(aMock);
      expect(clickMock).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalledWith(aMock);
      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockRevokeObjectURL).toHaveBeenCalled();
    });
  });
});
