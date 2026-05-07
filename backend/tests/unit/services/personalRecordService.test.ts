import { describe, it, expect } from '@jest/globals';
import { personalRecordService } from '../../../src/services/personalRecordService';

// Mock repositories
jest.mock('../../../src/repositories/personalRecordRepository');

describe('PersonalRecordService', () => {
  describe('method existence', () => {
    it('should have checkAndUpdatePR method', () => {
      expect(typeof personalRecordService.checkAndUpdatePR).toBe('function');
    });

    it('should have checkSinglePR method', () => {
      expect(typeof personalRecordService.checkSinglePR).toBe('function');
    });

    it('should have getUserPRs method', () => {
      expect(typeof personalRecordService.getUserPRs).toBe('function');
    });

    it('should have getPRsByExercise method', () => {
      expect(typeof personalRecordService.getPRsByExercise).toBe('function');
    });

    it('should have getTopPRs method', () => {
      expect(typeof personalRecordService.getTopPRs).toBe('function');
    });
  });
});