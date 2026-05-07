// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { queryWorkoutTool } from '../../../src/tools/queryWorkout';
import { queryService } from '../../../src/services/queryService';

// Mock dependencies
jest.mock('../../../src/services/queryService', () => ({
  queryService: {
    queryWorkouts: jest.fn().mockResolvedValue({
      workouts: [
        {
          id: 1,
          date: '2026-05-01',
          exercises: [{ name: '深蹲', sets: 3, reps: 10, weight: 60 }]
        },
        {
          id: 2,
          date: '2026-05-03',
          exercises: [{ name: '卧推', sets: 4, reps: 8, weight: 80 }]
        }
      ]
    })
  }
}));

describe('queryWorkout tool', () => {
  describe('tool structure', () => {
    it('should be importable', () => {
      expect(queryWorkoutTool).toBeDefined();
    });

    it('should have correct name', () => {
      expect(queryWorkoutTool.name).toBe('query_workout');
    });

    it('should have a description', () => {
      expect(queryWorkoutTool.description).toBeDefined();
      expect(typeof queryWorkoutTool.description).toBe('string');
      expect(queryWorkoutTool.description.length).toBeGreaterThan(0);
    });

    it('should have a schema', () => {
      expect(queryWorkoutTool.schema).toBeDefined();
    });
  });

  describe('description content', () => {
    const description = queryWorkoutTool.description;

    it('should describe when to use this tool', () => {
      expect(description).toContain('询问');
      expect(description).toContain('训练记录');
    });

    it('should include trigger examples', () => {
      expect(description).toContain('这周');
      expect(description).toContain('上个月');
      expect(description).toContain('训练频率');
    });

    it('should list required input fields', () => {
      expect(description).toContain('user_id');
      expect(description).toContain('start_date');
      expect(description).toContain('end_date');
    });

    it('should mention optional exercise_type filter', () => {
      expect(description).toContain('exercise_type');
    });
  });

  describe('schema validation', () => {
    it('should have userId as number in schema', () => {
      expect(queryWorkoutTool.schema.shape).toBeDefined();
      expect(queryWorkoutTool.schema.shape.userId).toBeDefined();
    });

    it('should have start_date as string in schema', () => {
      expect(queryWorkoutTool.schema.shape.start_date).toBeDefined();
    });

    it('should have end_date as string in schema', () => {
      expect(queryWorkoutTool.schema.shape.end_date).toBeDefined();
    });

    it('should have optional exercise_type field', () => {
      expect(queryWorkoutTool.schema.shape.exercise_type).toBeDefined();
    });
  });

  describe('func', () => {
    it('should be an async function', () => {
      expect(typeof queryWorkoutTool.func).toBe('function');
    });

    it('should query workouts with date range', async () => {
      const result = await queryWorkoutTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31'
      });

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('aiReply');
      expect(parsed).toHaveProperty('dataType');
      expect(parsed.dataType).toBe('workout_query');
    });

    it('should return workouts array in result', async () => {
      const result = await queryWorkoutTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
      expect(parsed.result.workouts).toBeDefined();
    });

    it('should include summary with totalWorkouts and totalVolume', async () => {
      const result = await queryWorkoutTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.summary).toBeDefined();
      expect(parsed.result.summary.totalWorkouts).toBeDefined();
      expect(parsed.result.summary.totalVolume).toBeDefined();
    });

    it('should filter by exercise_type when provided', async () => {
      const result = await queryWorkoutTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31',
        exercise_type: '深蹲'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
    });
  });
});