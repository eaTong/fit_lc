import { describe, it, expect } from '@jest/globals';
import { queryService } from '../../../src/services/queryService';

// Mock repositories
jest.mock('../../../src/repositories/workoutRepository');
jest.mock('../../../src/repositories/measurementRepository');

describe('QueryService', () => {
  describe('method existence', () => {
    it('should have queryWorkouts method', () => {
      expect(typeof queryService.queryWorkouts).toBe('function');
    });

    it('should have queryMeasurements method', () => {
      expect(typeof queryService.queryMeasurements).toBe('function');
    });
  });
});