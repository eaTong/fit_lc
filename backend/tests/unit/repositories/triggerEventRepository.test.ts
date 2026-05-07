import { describe, it, expect } from '@jest/globals';
import { triggerEventRepository } from '../../../src/repositories/triggerEventRepository';

describe('TriggerEventRepository', () => {
  it('should be importable', () => {
    expect(triggerEventRepository).toBeDefined();
  });

  it('should have hasTriggeredToday method', () => {
    expect(typeof triggerEventRepository.hasTriggeredToday).toBe('function');
  });

  it('should have record method', () => {
    expect(typeof triggerEventRepository.record).toBe('function');
  });

  it('should have findByUserId method', () => {
    expect(typeof triggerEventRepository.findByUserId).toBe('function');
  });

  it('should have findByTriggerType method', () => {
    expect(typeof triggerEventRepository.findByTriggerType).toBe('function');
  });

  it('should have findById method', () => {
    expect(typeof triggerEventRepository.findById).toBe('function');
  });

  it('should have findRecentByType method', () => {
    expect(typeof triggerEventRepository.findRecentByType).toBe('function');
  });

  it('should have delete method', () => {
    expect(typeof triggerEventRepository.delete).toBe('function');
  });

  it('should have deleteOld method', () => {
    expect(typeof triggerEventRepository.deleteOld).toBe('function');
  });
});