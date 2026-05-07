import { describe, it, expect } from '@jest/globals';
import { recordService } from '../../../src/services/recordService';

// Mock repositories
jest.mock('../../../src/repositories/workoutRepository');
jest.mock('../../../src/repositories/measurementRepository');
jest.mock('../../../src/repositories/statsRepository');

describe('RecordService', () => {
  describe('method existence', () => {
    it('should have getWorkouts method', () => {
      expect(typeof recordService.getWorkouts).toBe('function');
    });

    it('should have getWorkout method', () => {
      expect(typeof recordService.getWorkout).toBe('function');
    });

    it('should have deleteWorkout method', () => {
      expect(typeof recordService.deleteWorkout).toBe('function');
    });

    it('should have restoreWorkout method', () => {
      expect(typeof recordService.restoreWorkout).toBe('function');
    });

    it('should have getMeasurements method', () => {
      expect(typeof recordService.getMeasurements).toBe('function');
    });

    it('should have getMeasurement method', () => {
      expect(typeof recordService.getMeasurement).toBe('function');
    });

    it('should have getMeasurementByDate method', () => {
      expect(typeof recordService.getMeasurementByDate).toBe('function');
    });

    it('should have createMeasurementWithItems method', () => {
      expect(typeof recordService.createMeasurementWithItems).toBe('function');
    });

    it('should have deleteMeasurement method', () => {
      expect(typeof recordService.deleteMeasurement).toBe('function');
    });

    it('should have restoreMeasurement method', () => {
      expect(typeof recordService.restoreMeasurement).toBe('function');
    });

    it('should have upsertMeasurementItems method', () => {
      expect(typeof recordService.upsertMeasurementItems).toBe('function');
    });

    it('should have getStats method', () => {
      expect(typeof recordService.getStats).toBe('function');
    });
  });
});