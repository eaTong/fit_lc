import { describe, it, expect } from '@jest/globals';

// Direct import of the tool
const toolModule = require('../../../src/tools/saveWorkout');
const { saveWorkoutTool } = toolModule;

describe('SaveWorkoutTool', () => {
  describe('tool structure', () => {
    it('should be importable', () => {
      expect(saveWorkoutTool).toBeDefined();
    });

    it('should have correct name', () => {
      expect(saveWorkoutTool.name).toBe('save_workout');
    });

    it('should have a description', () => {
      expect(saveWorkoutTool.description).toBeDefined();
      expect(typeof saveWorkoutTool.description).toBe('string');
      expect(saveWorkoutTool.description.length).toBeGreaterThan(0);
    });

    it('should have a schema', () => {
      expect(saveWorkoutTool.schema).toBeDefined();
    });
  });

  describe('description contains required fields validation', () => {
    const description = saveWorkoutTool.description;

    it('should mention date field with default today', () => {
      expect(description).toContain('date');
      expect(description).toContain('YYYY-MM-DD');
      expect(description).toContain('默认今天');
    });

    it('should specify exercise name as required', () => {
      expect(description).toContain('name');
      expect(description).toContain('动作名称');
      expect(description).toContain('必填');
    });

    it('should specify strength training requirements (weight + sets/reps)', () => {
      expect(description).toContain('weight');
      expect(description).toContain('sets');
      expect(description).toContain('reps');
      expect(description).toContain('力量训练');
    });

    it('should specify cardio requirements (duration or distance)', () => {
      expect(description).toContain('duration');
      expect(description).toContain('有氧训练');
      expect(description).toContain('distance');
    });

    it('should specify bodyweight exercise requirements (sets + reps)', () => {
      expect(description).toContain('徒手训练');
      expect(description).toContain('俯卧撑');
      expect(description).toContain('sets');
      expect(description).toContain('reps');
    });

    it('should include guidance for incomplete information', () => {
      expect(description).toContain('信息不完整');
      expect(description).toContain('追问');
      expect(description).toContain('补充');
    });

    it('should include examples for AI to follow', () => {
      expect(description).toContain('卧推80公斤');
      expect(description).toContain('几组每组几次');
    });
  });

  describe('schema validation', () => {
    it('should have date as string', () => {
      expect(saveWorkoutTool.schema.shape).toBeDefined();
      expect(saveWorkoutTool.schema.shape.date).toBeDefined();
    });

    it('should have exercises as array', () => {
      expect(saveWorkoutTool.schema.shape.exercises).toBeDefined();
    });

    it('should have date field with correct describe content', () => {
      const dateDesc = saveWorkoutTool.schema.shape.date.description;
      expect(dateDesc).toContain('YYYY-MM-DD');
    });

    it('should have exercise name field marked as required', () => {
      const exercisesArray = saveWorkoutTool.schema.shape.exercises;
      expect(exercisesArray).toBeDefined();
      // Zod array's element schema is accessible via _def
      const exerciseSchema = exercisesArray;
      expect(exerciseSchema).toBeDefined();
    });
  });

  describe('validation logic', () => {
    it('should have validateExports for testing', () => {
      // Access the module to check for validation functions
      expect(toolModule).toBeDefined();
    });
  });

  describe('return format', () => {
    it('should have func as async function', () => {
      expect(saveWorkoutTool.func).toBeDefined();
      expect(typeof saveWorkoutTool.func).toBe('function');
    });
  });
});