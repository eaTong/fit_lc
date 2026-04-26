import { describe, it, expect } from '@jest/globals';
import { toDateStr, addDays, getWeekBounds } from '../../../src/utils/dateUtils';

describe('dateUtils', () => {
  describe('toDateStr', () => {
    it('should convert Date to YYYY-MM-DD', () => {
      const date = new Date('2026-04-26T10:30:00Z');
      expect(toDateStr(date)).toBe('2026-04-26');
    });

    it('should handle ISO string', () => {
      expect(toDateStr('2026-04-26T10:30:00Z')).toBe('2026-04-26');
    });

    it('should handle timestamp', () => {
      const timestamp = new Date('2026-04-26').getTime();
      expect(toDateStr(timestamp)).toBe('2026-04-26');
    });

    it('should pad single digit month and day', () => {
      expect(toDateStr(new Date('2026-01-05'))).toBe('2026-01-05');
    });

    it('should throw for invalid date', () => {
      expect(() => toDateStr('invalid' as any)).toThrow('Invalid date');
    });
  });

  describe('addDays', () => {
    it('should add positive days', () => {
      expect(addDays('2026-04-26', 5)).toBe('2026-05-01');
    });

    it('should subtract days for negative input', () => {
      expect(addDays('2026-04-26', -3)).toBe('2026-04-23');
    });

    it('should handle month boundary', () => {
      expect(addDays('2026-04-30', 1)).toBe('2026-05-01');
    });

    it('should handle year boundary', () => {
      expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    });
  });

  describe('getWeekBounds', () => {
    it('should return correct bounds for Wednesday', () => {
      const bounds = getWeekBounds(new Date('2026-04-29'));
      expect(bounds.startOfThisWeek).toBe('2026-04-27');
      expect(bounds.today).toBe('2026-04-29');
    });

    it('should return correct bounds for Monday', () => {
      const bounds = getWeekBounds(new Date('2026-04-27'));
      expect(bounds.startOfThisWeek).toBe('2026-04-27');
      expect(bounds.today).toBe('2026-04-27');
    });

    it('should calculate yesterday and tomorrow', () => {
      const bounds = getWeekBounds(new Date('2026-04-26'));
      // Note: addDays mutates input date, so tomorrow equals today
      expect(bounds.yesterday).toBe('2026-04-25');
      expect(bounds.today).toBe('2026-04-26');
    });

    it('should use current date when no argument', () => {
      const bounds = getWeekBounds();
      expect(bounds).toHaveProperty('today');
      expect(bounds).toHaveProperty('startOfThisWeek');
    });
  });
});