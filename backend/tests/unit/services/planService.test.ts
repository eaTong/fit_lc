import { describe, it, expect } from '@jest/globals';
import { planService } from '../../../src/services/planService';

// Mock repositories
jest.mock('../../../src/repositories/planRepository');
jest.mock('../../../src/repositories/aggregatedStatsRepository');
jest.mock('../../../src/config/prisma');

describe('PlanService', () => {
  describe('method existence', () => {
    it('should have createPlan method', () => {
      expect(typeof planService.createPlan).toBe('function');
    });

    it('should have getPlan method', () => {
      expect(typeof planService.getPlan).toBe('function');
    });

    it('should have getUserPlans method', () => {
      expect(typeof planService.getUserPlans).toBe('function');
    });

    it('should have updatePlan method', () => {
      expect(typeof planService.updatePlan).toBe('function');
    });

    it('should have updatePlanExercise method', () => {
      expect(typeof planService.updatePlanExercise).toBe('function');
    });

    it('should have deletePlan method', () => {
      expect(typeof planService.deletePlan).toBe('function');
    });

    it('should have activatePlan method', () => {
      expect(typeof planService.activatePlan).toBe('function');
    });

    it('should have adjustPlan method', () => {
      expect(typeof planService.adjustPlan).toBe('function');
    });

    it('should have recordExecution method', () => {
      expect(typeof planService.recordExecution).toBe('function');
    });

    it('should have getPlanAnalysis method', () => {
      expect(typeof planService.getPlanAnalysis).toBe('function');
    });
  });
});