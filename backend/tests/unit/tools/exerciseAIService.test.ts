// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { exerciseAIService } from '../../../src/services/exerciseAIService';

// Mock the AI module
jest.mock('../../../src/agents/chatMiniMax', () => ({
  createMiniMaxModel: jest.fn().mockReturnValue({
    invoke: jest.fn().mockResolvedValue({
      content: JSON.stringify({
        steps: '动作步骤详细说明',
        safetyNotes: '安全提示内容',
        commonMistakes: '常见错误说明',
        adjustmentNotes: '调整说明',
        exerciseType: 'compound',
        conversionGuide: { 'type': 'guide' },
        suggestedMuscles: [
          { name: '肌肉', role: 'agonist' }
        ]
      })
    })
  })
}));

describe('exerciseAIService', () => {
  describe('service structure', () => {
    it('should be importable', () => {
      expect(exerciseAIService).toBeDefined();
    });

    it('should have generateExerciseDetails method', () => {
      expect(typeof exerciseAIService.generateExerciseDetails).toBe('function');
    });
  });

  describe('generateExerciseDetails', () => {
    it('should be an async function', async () => {
      const exercise = {
        name: '卧推',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toBeDefined();
    });

    it('should return object with steps', async () => {
      const exercise = {
        name: '深蹲',
        category: 'legs',
        equipment: 'barbell',
        difficulty: 'intermediate'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toHaveProperty('steps');
    });

    it('should return object with safetyNotes', async () => {
      const exercise = {
        name: '硬拉',
        category: 'back',
        equipment: 'barbell',
        difficulty: 'advanced'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toHaveProperty('safetyNotes');
    });

    it('should return object with commonMistakes', async () => {
      const exercise = {
        name: '引体向上',
        category: 'back',
        equipment: 'bodyweight',
        difficulty: 'intermediate'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toHaveProperty('commonMistakes');
    });

    it('should return object with exerciseType', async () => {
      const exercise = {
        name: '哑铃飞鸟',
        category: 'chest',
        equipment: 'dumbbell',
        difficulty: 'beginner'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toHaveProperty('exerciseType');
    });

    it('should return object with conversionGuide', async () => {
      const exercise = {
        name: '杠铃卧推',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toHaveProperty('conversionGuide');
    });

    it('should return object with suggestedMuscles', async () => {
      const exercise = {
        name: '双杠臂屈伸',
        category: 'chest',
        equipment: 'bodyweight',
        difficulty: 'intermediate'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toHaveProperty('suggestedMuscles');
    });

    it('should accept targetMuscles parameter', async () => {
      const exercise = {
        name: '侧平举',
        category: 'shoulders',
        equipment: 'dumbbell',
        difficulty: 'beginner'
      };
      const targetMuscles = [{ name: '三角肌中束' }];
      const result = await exerciseAIService.generateExerciseDetails(exercise, targetMuscles);
      expect(result).toHaveProperty('steps');
    });

    it('should handle exercise with all properties', async () => {
      const exercise = {
        name: '腿举',
        category: 'legs',
        equipment: 'machine',
        difficulty: 'intermediate'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);
      expect(result).toHaveProperty('steps');
      expect(result).toHaveProperty('safetyNotes');
      expect(result).toHaveProperty('commonMistakes');
      expect(result).toHaveProperty('adjustmentNotes');
      expect(result).toHaveProperty('exerciseType');
      expect(result).toHaveProperty('conversionGuide');
      expect(result).toHaveProperty('suggestedMuscles');
    });
  });
});