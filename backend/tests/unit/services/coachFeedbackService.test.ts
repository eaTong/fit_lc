import { describe, it, expect, beforeEach } from '@jest/globals';
import { generateWorkoutFeedback } from '../../../src/services/coachFeedbackService';

// Mock prisma before importing the service
const mockPrisma = {
  workout: {
    findUnique: jest.fn(),
    findMany: jest.fn()
  }
};

jest.mock('../../../src/config/prisma', () => mockPrisma);

describe('CoachFeedbackService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateWorkoutFeedback', () => {
    it('should be a function', () => {
      expect(typeof generateWorkoutFeedback).toBe('function');
    });

    it('should return default feedback for invalid userId', async () => {
      const result = await generateWorkoutFeedback(0 as any, 1);

      expect(result).toHaveProperty('pr_detected', false);
      expect(result).toHaveProperty('volume_change', 'same');
      expect(result).toHaveProperty('consistency_streak', 0);
      expect(result).toHaveProperty('personalized_comment');
    });

    it('should return default feedback for non-existent workout', async () => {
      mockPrisma.workout.findUnique.mockResolvedValue(null);

      const result = await generateWorkoutFeedback(1, 999);

      expect(result).toHaveProperty('pr_detected', false);
      expect(result).toHaveProperty('volume_change', 'same');
      expect(result.personalized_comment).toBe('记录成功！');
    });
  });
});