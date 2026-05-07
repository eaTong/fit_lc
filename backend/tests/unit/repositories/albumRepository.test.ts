import { describe, it, expect } from '@jest/globals';
import { albumRepository } from '../../../src/repositories/albumRepository';

describe('AlbumRepository', () => {
  it('should be importable', () => {
    expect(albumRepository).toBeDefined();
  });

  it('should have create method', () => {
    expect(typeof albumRepository.create).toBe('function');
  });

  it('should have findByUserAndMonth method', () => {
    expect(typeof albumRepository.findByUserAndMonth).toBe('function');
  });

  it('should have softDelete method', () => {
    expect(typeof albumRepository.softDelete).toBe('function');
  });

  it('should have findById method', () => {
    expect(typeof albumRepository.findById).toBe('function');
  });

  it('should have findByUserAll method', () => {
    expect(typeof albumRepository.findByUserAll).toBe('function');
  });
});