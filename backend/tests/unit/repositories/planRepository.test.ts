import { describe, it, expect } from '@jest/globals';
import { planRepository } from '../../../src/repositories/planRepository';

describe('PlanRepository', () => {
  it('should be importable', () => {
    expect(planRepository).toBeDefined();
  });

  it('should have create method', () => {
    expect(typeof planRepository.create).toBe('function');
  });

  it('should have createWithExercises method', () => {
    expect(typeof planRepository.createWithExercises).toBe('function');
  });

  it('should have findByUserId method', () => {
    expect(typeof planRepository.findByUserId).toBe('function');
  });

  it('should have findActive method', () => {
    expect(typeof planRepository.findActive).toBe('function');
  });

  it('should have findById method', () => {
    expect(typeof planRepository.findById).toBe('function');
  });

  it('should have update method', () => {
    expect(typeof planRepository.update).toBe('function');
  });

  it('should have delete method', () => {
    expect(typeof planRepository.delete).toBe('function');
  });

  it('should have addExercise method', () => {
    expect(typeof planRepository.addExercise).toBe('function');
  });

  it('should have recordExecution method', () => {
    expect(typeof planRepository.recordExecution).toBe('function');
  });

  it('should have getExecutions method', () => {
    expect(typeof planRepository.getExecutions).toBe('function');
  });

  it('should have findExercisesByPlanId method', () => {
    expect(typeof planRepository.findExercisesByPlanId).toBe('function');
  });

  it('should have updateExercise method', () => {
    expect(typeof planRepository.updateExercise).toBe('function');
  });

  it('should have deleteExercise method', () => {
    expect(typeof planRepository.deleteExercise).toBe('function');
  });

  it('should have getExecutionStats method', () => {
    expect(typeof planRepository.getExecutionStats).toBe('function');
  });
});