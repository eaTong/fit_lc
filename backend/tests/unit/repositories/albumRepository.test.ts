import { describe, it, expect } from '@jest/globals';
import { albumRepository } from '../../../src/repositories/albumRepository';

describe('AlbumRepository', () => {
  it('should be importable', () => {
    expect(albumRepository).toBeDefined();
    expect(typeof albumRepository.create).toBe('function');
    expect(typeof albumRepository.findById).toBe('function');
    expect(typeof albumRepository.findByUserAndMonth).toBe('function');
    expect(typeof albumRepository.softDelete).toBe('function');
  });
});