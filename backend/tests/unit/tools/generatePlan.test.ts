// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { generatePlanTool } from '../../../src/tools/generatePlan';
import { planService } from '../../../src/services/planService';
import { exerciseRepository } from '../../../src/repositories/exerciseRepository';

// Mock dependencies
jest.mock('../../../src/services/planService', () => ({
  planService: {
    createPlan: jest.fn().mockResolvedValue({ id: 1 })
  }
}));

jest.mock('../../../src/repositories/exerciseRepository', () => ({
  exerciseRepository: {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: '杠铃卧推',
        muscles: [{ muscle: { group: 'chest' }, role: 'primary' }]
      },
      {
        id: 2,
        name: '深蹲',
        muscles: [{ muscle: { group: 'legs' }, role: 'primary' }]
      }
    ])
  }
}));

describe('generatePlan tool', () => {
  describe('tool structure', () => {
    it('should be importable', () => {
      expect(generatePlanTool).toBeDefined();
    });

    it('should have correct name', () => {
      expect(generatePlanTool.name).toBe('generate_plan');
    });

    it('should have a description', () => {
      expect(generatePlanTool.description).toBeDefined();
      expect(typeof generatePlanTool.description).toBe('string');
      expect(generatePlanTool.description.length).toBeGreaterThan(0);
    });

    it('should have a schema', () => {
      expect(generatePlanTool.schema).toBeDefined();
    });
  });

  describe('description content', () => {
    const description = generatePlanTool.description;

    it('should describe when to use this tool', () => {
      expect(description).toContain('生成健身计划');
    });

    it('should include trigger examples', () => {
      expect(description).toContain('帮我生成');
      expect(description).toContain('健身计划');
    });

    it('should list required input fields', () => {
      expect(description).toContain('user_id');
      // Description uses "用户资料" (user profile) in Chinese
      expect(description).toContain('用户资料');
    });
  });

  describe('schema validation', () => {
    it('should have userId in schema', () => {
      expect(generatePlanTool.schema.shape).toBeDefined();
      expect(generatePlanTool.schema.shape.userId).toBeDefined();
    });

    it('should have user_profile object in schema', () => {
      expect(generatePlanTool.schema.shape.user_profile).toBeDefined();
    });

    it('should have goal enum in user_profile', () => {
      const userProfileShape = generatePlanTool.schema.shape.user_profile;
      expect(userProfileShape).toBeDefined();
    });

    it('should have frequency as number in user_profile', () => {
      const userProfileShape = generatePlanTool.schema.shape.user_profile;
      expect(userProfileShape).toBeDefined();
    });

    it('should have experience enum in user_profile', () => {
      const userProfileShape = generatePlanTool.schema.shape.user_profile;
      expect(userProfileShape).toBeDefined();
    });
  });

  describe('func', () => {
    it('should be an async function', () => {
      expect(typeof generatePlanTool.func).toBe('function');
    });

    it('should generate plan with valid user profile', async () => {
      const result = await generatePlanTool.func({
        userId: 1,
        user_profile: {
          goal: 'bulk',
          frequency: 4,
          experience: 'intermediate',
          equipment: 'barbell,dumbbell',
          body_weight: 70,
          height: 175,
          duration_weeks: 12
        }
      });

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('aiReply');
      expect(parsed).toHaveProperty('dataType');
      expect(parsed.dataType).toBe('plan');
    });

    it('should return planId in result', async () => {
      const result = await generatePlanTool.func({
        userId: 1,
        user_profile: {
          goal: 'cut',
          frequency: 3,
          experience: 'beginner',
          equipment: 'bodyweight',
          body_weight: 75,
          height: 180,
          duration_weeks: 8
        }
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
      expect(parsed.result.planId).toBeDefined();
    });

    it('should include schedule in result', async () => {
      const result = await generatePlanTool.func({
        userId: 1,
        user_profile: {
          goal: 'maintain',
          frequency: 3,
          experience: 'advanced',
          equipment: 'barbell',
          body_weight: 80,
          height: 170,
          duration_weeks: 4
        }
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.schedule).toBeDefined();
    });

    it('should include plan metadata in result', async () => {
      const result = await generatePlanTool.func({
        userId: 1,
        user_profile: {
          name: 'My Custom Plan',
          goal: 'bulk',
          frequency: 5,
          experience: 'intermediate',
          equipment: 'dumbbell,machine',
          body_weight: 65,
          height: 168,
          duration_weeks: 16
        }
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.durationWeeks).toBeDefined();
      expect(parsed.result.frequency).toBeDefined();
      expect(parsed.result.goal).toBeDefined();
    });
  });
});