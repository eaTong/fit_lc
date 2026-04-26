import { describe, it, expect } from '@jest/globals';
import { measurementRepository } from '../../../src/repositories/measurementRepository';

// Smoke test - verify module is importable with all methods
describe('MeasurementRepository', () => {
  it('should be importable', () => {
    expect(measurementRepository).toBeDefined();
    expect(typeof measurementRepository.create).toBe('function');
    expect(typeof measurementRepository.findById).toBe('function');
    expect(typeof measurementRepository.softDelete).toBe('function');
    expect(typeof measurementRepository.addItem).toBe('function');
    expect(typeof measurementRepository.restore).toBe('function');
  });
});