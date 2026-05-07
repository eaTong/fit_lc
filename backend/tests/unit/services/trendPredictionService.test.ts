import { describe, it, expect } from '@jest/globals';
import { trendPredictionService } from '../../../src/services/trendPredictionService';

// Mock repositories
jest.mock('../../../src/repositories/trendPredictionRepository');
jest.mock('../../../src/config/prisma');

describe('TrendPredictionService', () => {
  describe('method existence', () => {
    it('should have updatePrediction method', () => {
      expect(typeof trendPredictionService.updatePrediction).toBe('function');
    });

    it('should have getPrediction method', () => {
      expect(typeof trendPredictionService.getPrediction).toBe('function');
    });

    it('should have getAllPredictions method', () => {
      expect(typeof trendPredictionService.getAllPredictions).toBe('function');
    });

    it('should have calculateBodyPartTrend method', () => {
      expect(typeof trendPredictionService.calculateBodyPartTrend).toBe('function');
    });
  });

  describe('updatePrediction', () => {
    it('should return null for insufficient data points', async () => {
      const result = await trendPredictionService.updatePrediction(1, 'weight', [
        { date: new Date(), value: 70 }
      ]);
      expect(result).toBeNull();
    });
  });
});