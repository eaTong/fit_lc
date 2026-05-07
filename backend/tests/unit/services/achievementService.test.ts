import { describe, it, expect } from '@jest/globals';
import { achievementService } from '../../../src/services/achievementService';

// Mock repositories
jest.mock('../../../src/repositories/badgeRepository');
jest.mock('../../../src/repositories/userBadgeRepository');
jest.mock('../../../src/repositories/milestoneRepository');
jest.mock('../../../src/repositories/userMilestoneRepository');
jest.mock('../../../src/repositories/aggregatedStatsRepository');
jest.mock('../../../src/config/prisma');

describe('AchievementService', () => {
  describe('method existence', () => {
    it('should have checkBadges method', () => {
      expect(typeof achievementService.checkBadges).toBe('function');
    });

    it('should have evaluateBadgeCondition method', () => {
      expect(typeof achievementService.evaluateBadgeCondition).toBe('function');
    });

    it('should have checkMilestones method', () => {
      expect(typeof achievementService.checkMilestones).toBe('function');
    });

    it('should have calculateMilestoneProgress method', () => {
      expect(typeof achievementService.calculateMilestoneProgress).toBe('function');
    });

    it('should have getUserBadges method', () => {
      expect(typeof achievementService.getUserBadges).toBe('function');
    });

    it('should have getUserMilestones method', () => {
      expect(typeof achievementService.getUserMilestones).toBe('function');
    });
  });
});