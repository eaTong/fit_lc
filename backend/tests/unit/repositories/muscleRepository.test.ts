import { describe, it, expect } from '@jest/globals';
import { muscleRepository } from '../../../src/repositories/muscleRepository';

describe('MuscleRepository', () => {
  it('should be importable', () => {
    expect(muscleRepository).toBeDefined();
  });

  it('should have findAll method', () => {
    expect(typeof muscleRepository.findAll).toBe('function');
  });

  it('should have findByGroup method', () => {
    expect(typeof muscleRepository.findByGroup).toBe('function');
  });

  it('should have findById method', () => {
    expect(typeof muscleRepository.findById).toBe('function');
  });

  it('should have getHierarchy method', () => {
    expect(typeof muscleRepository.getHierarchy).toBe('function');
  });

  it('should have create method', () => {
    expect(typeof muscleRepository.create).toBe('function');
  });

  it('should have update method', () => {
    expect(typeof muscleRepository.update).toBe('function');
  });

  it('should have delete method', () => {
    expect(typeof muscleRepository.delete).toBe('function');
  });
});