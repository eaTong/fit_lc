import { describe, it, expect } from '@jest/globals';
import { statsService } from '../../../src/services/statsService';

// Mock prisma and repositories
jest.mock('../../../src/config/prisma');
jest.mock('../../../src/repositories/aggregatedStatsRepository');

describe('StatsService', () => {
  describe('method existence', () => {
    it('should have updateAggregatedStats method', () => {
      expect(typeof statsService.updateAggregatedStats).toBe('function');
    });

    it('should have calculateTotalVolume method', () => {
      expect(typeof statsService.calculateTotalVolume).toBe('function');
    });

    it('should have calculateWeeklyVolume method', () => {
      expect(typeof statsService.calculateWeeklyVolume).toBe('function');
    });

    it('should have calculateStreakDays method', () => {
      expect(typeof statsService.calculateStreakDays).toBe('function');
    });

    it('should have getStats method', () => {
      expect(typeof statsService.getStats).toBe('function');
    });

    it('should have getWeekStart method', () => {
      expect(typeof statsService.getWeekStart).toBe('function');
    });

    it('should have getMonthStart method', () => {
      expect(typeof statsService.getMonthStart).toBe('function');
    });
  });
});