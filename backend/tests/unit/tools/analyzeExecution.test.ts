// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { analyzeExecutionTool } from '../../../src/tools/analyzeExecution';
import { planService } from '../../../src/services/planService';

// Mock dependencies
jest.mock('../../../src/services/planService', () => ({
  planService: {
    getPlanAnalysis: jest.fn().mockResolvedValue({
      stats: {
        total: 12,
        completed: 8,
        skipped: 1,
        pending: 3,
        completionRate: 67
      },
      suggestions: ['Great progress!', 'Consider adding more intensity']
    })
  }
}));

describe('analyzeExecution tool', () => {
  describe('tool structure', () => {
    it('should be importable', () => {
      expect(analyzeExecutionTool).toBeDefined();
    });

    it('should have correct name', () => {
      expect(analyzeExecutionTool.name).toBe('analyze_execution');
    });

    it('should have a description', () => {
      expect(analyzeExecutionTool.description).toBeDefined();
      expect(typeof analyzeExecutionTool.description).toBe('string');
      expect(analyzeExecutionTool.description.length).toBeGreaterThan(0);
    });

    it('should have a schema', () => {
      expect(analyzeExecutionTool.schema).toBeDefined();
    });
  });

  describe('description content', () => {
    const description = analyzeExecutionTool.description;

    it('should describe when to use this tool', () => {
      expect(description).toContain('计划执行');
      expect(description).toContain('进度');
    });

    it('should include trigger examples', () => {
      expect(description).toContain('执行得怎么样');
      expect(description).toContain('训练进度');
    });

    it('should list required input fields', () => {
      expect(description).toContain('user_id');
      expect(description).toContain('plan_id');
    });
  });

  describe('schema validation', () => {
    it('should have userId as number in schema', () => {
      expect(analyzeExecutionTool.schema.shape).toBeDefined();
      expect(analyzeExecutionTool.schema.shape.userId).toBeDefined();
    });

    it('should have planId as number in schema', () => {
      expect(analyzeExecutionTool.schema.shape.planId).toBeDefined();
    });
  });

  describe('func', () => {
    it('should be an async function', () => {
      expect(typeof analyzeExecutionTool.func).toBe('function');
    });

    it('should analyze execution with valid planId', async () => {
      const result = await analyzeExecutionTool.func({
        userId: 1,
        planId: 1
      });

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('aiReply');
      expect(parsed).toHaveProperty('dataType');
      expect(parsed.dataType).toBe('execution_analysis');
    });

    it('should return stats in result', async () => {
      const result = await analyzeExecutionTool.func({
        userId: 1,
        planId: 1
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
      expect(parsed.result.stats).toBeDefined();
      expect(parsed.result.stats.completionRate).toBeDefined();
      expect(parsed.result.stats.completed).toBeDefined();
      expect(parsed.result.stats.skipped).toBeDefined();
      expect(parsed.result.stats.pending).toBeDefined();
    });

    it('should include suggestions in result', async () => {
      const result = await analyzeExecutionTool.func({
        userId: 1,
        planId: 1
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.suggestions).toBeDefined();
      expect(Array.isArray(parsed.result.suggestions)).toBe(true);
    });

    it('should include planId in result', async () => {
      const result = await analyzeExecutionTool.func({
        userId: 1,
        planId: 5
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.planId).toBe(5);
    });
  });
});