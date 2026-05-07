import { describe, it, expect } from '@jest/globals';
import { exerciseAIService } from '../../../src/services/exerciseAIService';

// Mock the AI module
jest.mock('../../../src/agents/chatMiniMax', () => ({
  createMiniMaxModel: jest.fn().mockReturnValue({
    invoke: jest.fn().mockResolvedValue({
      content: JSON.stringify({
        steps: '动作步骤',
        safetyNotes: '安全提示',
        commonMistakes: '常见错误',
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

describe('ExerciseAIService', () => {
  describe('method existence', () => {
    it('should have generateExerciseDetails method', () => {
      expect(typeof exerciseAIService.generateExerciseDetails).toBe('function');
    });
  });

  describe('generateExerciseDetails', () => {
    it('should be a function that returns a promise', async () => {
      const exercise = {
        name: '卧推',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate'
      };
      const result = await exerciseAIService.generateExerciseDetails(exercise, null);

      expect(result).toHaveProperty('steps');
      expect(result).toHaveProperty('safetyNotes');
      expect(result).toHaveProperty('commonMistakes');
      expect(result).toHaveProperty('exerciseType');
    });
  });
});