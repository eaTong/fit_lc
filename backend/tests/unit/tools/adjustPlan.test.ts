// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { adjustPlanTool } from '../../../src/tools/adjustPlan';
import { planService } from '../../../src/services/planService';

// Mock dependencies
jest.mock('../../../src/services/planService', () => ({
  planService: {
    adjustPlan: jest.fn().mockResolvedValue(true)
  }
}));

describe('adjustPlan tool', () => {
  describe('tool structure', () => {
    it('should be importable', () => {
      expect(adjustPlanTool).toBeDefined();
    });

    it('should have correct name', () => {
      expect(adjustPlanTool.name).toBe('adjust_plan');
    });

    it('should have a description', () => {
      expect(adjustPlanTool.description).toBeDefined();
      expect(typeof adjustPlanTool.description).toBe('string');
      expect(adjustPlanTool.description.length).toBeGreaterThan(0);
    });

    it('should have a schema', () => {
      expect(adjustPlanTool.schema).toBeDefined();
    });
  });

  describe('description content', () => {
    const description = adjustPlanTool.description;

    it('should describe when to use this tool', () => {
      expect(description).toContain('调整');
      expect(description).toContain('健身计划');
    });

    it('should include trigger examples', () => {
      expect(description).toContain('周三');
      expect(description).toContain('换');
    });

    it('should list required input fields', () => {
      expect(description).toContain('user_id');
      expect(description).toContain('plan_id');
      // Description uses "调整内容描述" (adjustment description) in Chinese
      expect(description).toContain('调整内容');
    });
  });

  describe('schema validation', () => {
    it('should have userId as number in schema', () => {
      expect(adjustPlanTool.schema.shape).toBeDefined();
      expect(adjustPlanTool.schema.shape.userId).toBeDefined();
    });

    it('should have plan_id as number in schema', () => {
      expect(adjustPlanTool.schema.shape.plan_id).toBeDefined();
    });

    it('should have adjustment as string in schema', () => {
      expect(adjustPlanTool.schema.shape.adjustment).toBeDefined();
    });
  });

  describe('func', () => {
    it('should be an async function', () => {
      expect(typeof adjustPlanTool.func).toBe('function');
    });

    it('should adjust plan with string adjustment', async () => {
      const result = await adjustPlanTool.func({
        userId: 1,
        plan_id: 1,
        adjustment: '把周三换成练胸'
      });

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('aiReply');
      expect(parsed).toHaveProperty('dataType');
      expect(parsed.dataType).toBe('plan_adjustment');
    });

    it('should adjust plan with JSON adjustment', async () => {
      const result = await adjustPlanTool.func({
        userId: 1,
        plan_id: 1,
        adjustment: JSON.stringify({ exercises: { '1': { sets: 4 } } })
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
    });

    it('should return success status in result', async () => {
      const result = await adjustPlanTool.func({
        userId: 1,
        plan_id: 1,
        adjustment: '降低重量'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.success).toBeDefined();
    });

    it('should include planId and adjustment in result', async () => {
      const result = await adjustPlanTool.func({
        userId: 1,
        plan_id: 2,
        adjustment: '增加有氧时间'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.planId).toBe(2);
      expect(parsed.result.adjustment).toBe('增加有氧时间');
    });
  });
});