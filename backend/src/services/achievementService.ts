import { badgeRepository } from '../repositories/badgeRepository';
import { userBadgeRepository } from '../repositories/userBadgeRepository';
import { milestoneRepository } from '../repositories/milestoneRepository';
import { userMilestoneRepository } from '../repositories/userMilestoneRepository';
import { aggregatedStatsRepository } from '../repositories/aggregatedStatsRepository';
import prisma from '../lib/prisma';

interface BadgeConditionContext {
  type: 'workout' | 'measurement' | 'streak';
  data?: any;
}

interface BadgeInfo {
  id: number;
  code: string;
  name: string;
  description: string;
  iconUrl: string | null;
  tier: string;
  points: number;
}

interface MilestoneProgress {
  id: number;
  code: string;
  name: string;
  description: string;
  iconUrl: string | null;
  tier: number;
  threshold: string;
  progress: string;
  achievedAt: Date | null;
}

export const achievementService = {
  async checkBadges(userId: number, context: BadgeConditionContext): Promise<BadgeInfo[]> {
    const newlyEarned: BadgeInfo[] = [];
    const allBadges = await badgeRepository.findAll();

    for (const badge of allBadges) {
      const alreadyEarned = await userBadgeRepository.hasEarned(userId, badge.id);
      if (alreadyEarned) continue;

      const conditionMet = await this.evaluateBadgeCondition(userId, badge, context);
      if (conditionMet) {
        const earned = await userBadgeRepository.awardIfNotEarned(userId, badge.id);
        if (earned) {
          newlyEarned.push({
            id: badge.id,
            code: badge.code,
            name: badge.name,
            description: badge.description,
            iconUrl: badge.iconUrl,
            tier: badge.tier,
            points: badge.points,
          });
        }
      }
    }

    return newlyEarned;
  },

  async evaluateBadgeCondition(userId: number, badge: any, context: BadgeConditionContext): Promise<boolean> {
    const conditionType = badge.conditionType;
    const conditionValue = badge.conditionValue;

    switch (conditionType) {
      case 'count': {
        const statType = conditionValue.statType || 'total_workouts';
        const required = conditionValue.count || 1;
        const stats = await aggregatedStatsRepository.findByStatType(userId, statType);
        if (!stats) return false;
        return Number(stats.value) >= required;
      }

      case 'streak': {
        const requiredDays = conditionValue.days || 7;
        const stats = await aggregatedStatsRepository.findByStatType(userId, 'streak_days');
        if (!stats) return false;
        return Number(stats.value) >= requiredDays;
      }

      case 'pr': {
        if (context.type !== 'workout' || !context.data?.exerciseName) return false;
        const exerciseName = context.data.exerciseName;
        const records = await prisma.personalRecord.findMany({
          where: { userId, exerciseName },
        });
        return records.length > 0;
      }

      case 'first': {
        if (context.type === 'workout') {
          const count = await prisma.workout.count({
            where: { userId, deletedAt: null },
          });
          return count === 1;
        }
        if (context.type === 'measurement') {
          const count = await prisma.bodyMeasurement.count({
            where: { userId, deletedAt: null },
          });
          return count === 1;
        }
        return false;
      }

      default:
        return false;
    }
  },

  async checkMilestones(userId: number): Promise<MilestoneProgress[]> {
    const updatedMilestones: MilestoneProgress[] = [];
    const allMilestones = await milestoneRepository.findAll();

    for (const milestone of allMilestones) {
      const progress = await this.calculateMilestoneProgress(userId, milestone);
      const userMilestone = await userMilestoneRepository.upsertWithProgress(userId, milestone.id, progress);

      const threshold = Number(milestone.threshold);
      if (progress >= threshold && !userMilestone.achievedAt) {
        await userMilestoneRepository.markAchieved(userMilestone.id);
        updatedMilestones.push({
          id: milestone.id,
          code: milestone.code,
          name: milestone.name,
          description: milestone.description,
          iconUrl: milestone.iconUrl,
          tier: milestone.tier,
          threshold: milestone.threshold.toString(),
          progress: progress.toString(),
          achievedAt: new Date(),
        });
      }
    }

    return updatedMilestones;
  },

  async calculateMilestoneProgress(userId: number, milestone: any): Promise<number> {
    const metricType = milestone.metricType;

    switch (metricType) {
      case 'total_workouts': {
        const stats = await aggregatedStatsRepository.findByStatType(userId, 'total_workouts');
        return stats ? Number(stats.value) : 0;
      }

      case 'total_volume': {
        const stats = await aggregatedStatsRepository.findByStatType(userId, 'total_volume');
        return stats ? Number(stats.value) : 0;
      }

      case 'streak_days': {
        const stats = await aggregatedStatsRepository.findByStatType(userId, 'streak_days');
        return stats ? Number(stats.value) : 0;
      }

      case 'pr_count': {
        const prCount = await prisma.personalRecord.count({
          where: { userId },
        });
        return prCount;
      }

      default:
        return 0;
    }
  },

  async getUserBadges(userId: number) {
    const userBadges = await userBadgeRepository.findByUserId(userId);
    return userBadges.map(ub => ({
      id: ub.badge.id,
      code: ub.badge.code,
      name: ub.badge.name,
      description: ub.badge.description,
      iconUrl: ub.badge.iconUrl,
      tier: ub.badge.tier,
      points: ub.badge.points,
      achievedAt: ub.achievedAt,
    }));
  },

  async getUserMilestones(userId: number) {
    const userMilestones = await userMilestoneRepository.findByUserId(userId);
    return userMilestones.map(um => ({
      id: um.milestone.id,
      code: um.milestone.code,
      name: um.milestone.name,
      description: um.milestone.description,
      iconUrl: um.milestone.iconUrl,
      tier: um.milestone.tier,
      threshold: um.milestone.threshold.toString(),
      progress: um.progress.toString(),
      achievedAt: um.achievedAt,
    }));
  },
};
