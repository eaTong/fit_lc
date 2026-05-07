import { describe, it, expect } from '@jest/globals';
import { triggerService } from '../../../src/services/triggerService';

// Mock repositories
jest.mock('../../../src/repositories/triggerEventRepository');

describe('TriggerService', () => {
  describe('method existence', () => {
    it('should have shouldTrigger method', () => {
      expect(typeof triggerService.shouldTrigger).toBe('function');
    });

    it('should have recordAndMaybeTrigger method', () => {
      expect(typeof triggerService.recordAndMaybeTrigger).toBe('function');
    });

    it('should have getEligibleTriggers method', () => {
      expect(typeof triggerService.getEligibleTriggers).toBe('function');
    });

    it('should have getTriggerHistory method', () => {
      expect(typeof triggerService.getTriggerHistory).toBe('function');
    });

    it('should have deleteTrigger method', () => {
      expect(typeof triggerService.deleteTrigger).toBe('function');
    });

    it('should have cleanupOldTriggers method', () => {
      expect(typeof triggerService.cleanupOldTriggers).toBe('function');
    });
  });
});