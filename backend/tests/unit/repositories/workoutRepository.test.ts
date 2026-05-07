import { describe, it, expect } from '@jest/globals';
import { workoutRepository } from '../../../src/repositories/workoutRepository';
import { measurementRepository } from '../../../src/repositories/measurementRepository';

describe('WorkoutRepository', () => {
  it('should be importable', () => {
    expect(workoutRepository).toBeDefined();
  });

  it('should have create method', () => {
    expect(typeof workoutRepository.create).toBe('function');
  });

  it('should have createWithExercises method', () => {
    expect(typeof workoutRepository.createWithExercises).toBe('function');
  });

  it('should have findById method', () => {
    expect(typeof workoutRepository.findById).toBe('function');
  });

  it('should have findByUserAndDateRange method', () => {
    expect(typeof workoutRepository.findByUserAndDateRange).toBe('function');
  });

  it('should have softDelete method', () => {
    expect(typeof workoutRepository.softDelete).toBe('function');
  });

  it('should have restore method', () => {
    expect(typeof workoutRepository.restore).toBe('function');
  });

  it('should have addExercise method', () => {
    expect(typeof workoutRepository.addExercise).toBe('function');
  });
});

describe('MeasurementRepository', () => {
  it('should be importable', () => {
    expect(measurementRepository).toBeDefined();
  });

  it('should have create method', () => {
    expect(typeof measurementRepository.create).toBe('function');
  });

  it('should have createWithItems method', () => {
    expect(typeof measurementRepository.createWithItems).toBe('function');
  });

  it('should have findById method', () => {
    expect(typeof measurementRepository.findById).toBe('function');
  });

  it('should have findByDate method', () => {
    expect(typeof measurementRepository.findByDate).toBe('function');
  });

  it('should have findByUserAndDateRange method', () => {
    expect(typeof measurementRepository.findByUserAndDateRange).toBe('function');
  });

  it('should have softDelete method', () => {
    expect(typeof measurementRepository.softDelete).toBe('function');
  });

  it('should have restore method', () => {
    expect(typeof measurementRepository.restore).toBe('function');
  });

  it('should have upsertItem method', () => {
    expect(typeof measurementRepository.upsertItem).toBe('function');
  });

  it('should have upsertItems method', () => {
    expect(typeof measurementRepository.upsertItems).toBe('function');
  });

  it('should have addItem method', () => {
    expect(typeof measurementRepository.addItem).toBe('function');
  });
});