import { describe, it, expect } from '@jest/globals';
import { workoutRepository } from '../../../src/repositories/workoutRepository';

// Smoke test - verify module is importable with all methods
describe('WorkoutRepository', () => {
  it('should be importable', () => {
    expect(workoutRepository).toBeDefined();
    expect(typeof workoutRepository.create).toBe('function');
    expect(typeof workoutRepository.findById).toBe('function');
    expect(typeof workoutRepository.findByUserAndDateRange).toBe('function');
    expect(typeof workoutRepository.softDelete).toBe('function');
    expect(typeof workoutRepository.addExercise).toBe('function');
  });
});