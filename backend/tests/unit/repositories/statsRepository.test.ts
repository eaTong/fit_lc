import { describe, it, expect } from '@jest/globals';
import { statsRepository } from '../../../src/repositories/statsRepository';

describe('StatsRepository', () => {
  it('should be importable', () => {
    expect(statsRepository).toBeDefined();
  });

  it('should have getWeeklyStats method', () => {
    expect(typeof statsRepository.getWeeklyStats).toBe('function');
  });

  it('should have getChanges method', () => {
    expect(typeof statsRepository.getChanges).toBe('function');
  });

  it('should have getStats method', () => {
    expect(typeof statsRepository.getStats).toBe('function');
  });

  it('should have getVolumeByMuscleGroup method', () => {
    expect(typeof statsRepository.getVolumeByMuscleGroup).toBe('function');
  });
});