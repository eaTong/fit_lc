import { describe, it, expect } from '@jest/globals';
import { saveService } from '../../../src/services/saveService';

describe('SaveService', () => {
  it('should be importable', () => {
    expect(saveService).toBeDefined();
  });

  it('should have saveWorkout method', () => {
    expect(typeof saveService.saveWorkout).toBe('function');
  });

  it('should have saveMeasurement method', () => {
    expect(typeof saveService.saveMeasurement).toBe('function');
  });
});