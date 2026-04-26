import { describe, it, expect } from '@jest/globals';
import { saveService } from '../../../src/services/saveService';

// Smoke test - verify module is importable with all methods
describe('SaveService', () => {
  it('should be importable', () => {
    expect(saveService).toBeDefined();
    expect(typeof saveService.saveWorkout).toBe('function');
    expect(typeof saveService.saveMeasurement).toBe('function');
  });
});