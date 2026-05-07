import { describe, it, expect } from '@jest/globals';
import { muscleAIService } from '../../../src/services/muscleAIService';

// Mock the AI module
jest.mock('../../../src/agents/chatMiniMax', () => ({
  createMiniMaxModel: jest.fn().mockReturnValue({
    invoke: jest.fn().mockResolvedValue({
      content: JSON.stringify({
        origin: '起点描述',
        insertion: '止点描述',
        function: '主要功能',
        trainingTips: '训练建议'
      })
    })
  })
}));

describe('MuscleAIService', () => {
  describe('method existence', () => {
    it('should have generateMuscleDetails method', () => {
      expect(typeof muscleAIService.generateMuscleDetails).toBe('function');
    });
  });

  describe('generateMuscleDetails', () => {
    it('should be a function that returns a promise', async () => {
      const muscle = { name: '胸肌', group: 'chest' };
      const result = await muscleAIService.generateMuscleDetails(muscle, '胸部');

      expect(result).toHaveProperty('origin');
      expect(result).toHaveProperty('insertion');
      expect(result).toHaveProperty('function');
      expect(result).toHaveProperty('trainingTips');
    });
  });
});