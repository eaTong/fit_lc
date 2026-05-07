import { describe, it, expect } from '@jest/globals';
import { userService } from '../../../src/services/userService';

// Mock prisma
jest.mock('../../../src/config/prisma');

describe('UserService', () => {
  describe('method existence', () => {
    it('should have getProfile method', () => {
      expect(typeof userService.getProfile).toBe('function');
    });

    it('should have updateProfile method', () => {
      expect(typeof userService.updateProfile).toBe('function');
    });

    it('should have changePassword method', () => {
      expect(typeof userService.changePassword).toBe('function');
    });

    it('should have getMetrics method', () => {
      expect(typeof userService.getMetrics).toBe('function');
    });

    it('should have addMetric method', () => {
      expect(typeof userService.addMetric).toBe('function');
    });

    it('should have deleteAccount method', () => {
      expect(typeof userService.deleteAccount).toBe('function');
    });

    it('should have getMeasurementsLatest method', () => {
      expect(typeof userService.getMeasurementsLatest).toBe('function');
    });

    it('should have getMeasurementsHistory method', () => {
      expect(typeof userService.getMeasurementsHistory).toBe('function');
    });
  });
});