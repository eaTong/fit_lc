import { describe, it, expect } from '@jest/globals';
import { badgeRepository } from '../../../src/repositories/badgeRepository';

describe('BadgeRepository', () => {
  it('should be importable', () => {
    expect(badgeRepository).toBeDefined();
  });

  it('should have create method', () => {
    expect(typeof badgeRepository.create).toBe('function');
  });

  it('should have findById method', () => {
    expect(typeof badgeRepository.findById).toBe('function');
  });

  it('should have findByCode method', () => {
    expect(typeof badgeRepository.findByCode).toBe('function');
  });

  it('should have findAll method', () => {
    expect(typeof badgeRepository.findAll).toBe('function');
  });

  it('should have findByCategory method', () => {
    expect(typeof badgeRepository.findByCategory).toBe('function');
  });

  it('should have findByConditionType method', () => {
    expect(typeof badgeRepository.findByConditionType).toBe('function');
  });

  it('should have update method', () => {
    expect(typeof badgeRepository.update).toBe('function');
  });

  it('should have delete method', () => {
    expect(typeof badgeRepository.delete).toBe('function');
  });
});