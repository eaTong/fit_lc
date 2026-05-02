import { aggregatedStatsRepository } from '../repositories/aggregatedStatsRepository';
import prisma from '../config/prisma';

export const statsService = {
  async updateAggregatedStats(userId: number) {
    const weekStart = this.getWeekStart();
    const monthStart = this.getMonthStart();

    await prisma.$transaction(async (tx) => {
      const weeklyWorkouts = await tx.workout.count({
        where: { userId, deletedAt: null, date: { gte: weekStart } },
      });
      await aggregatedStatsRepository.upsert(userId, 'weekly_workouts', 'weekly', weeklyWorkouts);

      const monthlyWorkouts = await tx.workout.count({
        where: { userId, deletedAt: null, date: { gte: monthStart } },
      });
      await aggregatedStatsRepository.upsert(userId, 'monthly_workouts', 'monthly', monthlyWorkouts);

      const totalWorkouts = await tx.workout.count({
        where: { userId, deletedAt: null },
      });
      await aggregatedStatsRepository.upsert(userId, 'total_workouts', 'all', totalWorkouts);

      const volume = await this.calculateTotalVolume(userId);
      await aggregatedStatsRepository.upsert(userId, 'total_volume', 'all', volume);

      const streakDays = await this.calculateStreakDays(userId);
      await aggregatedStatsRepository.upsert(userId, 'streak_days', 'all', streakDays);

      const weeklyVolume = await this.calculateWeeklyVolume(userId);
      await aggregatedStatsRepository.upsert(userId, 'weekly_volume', 'weekly', weeklyVolume);
    });
  },

  async calculateTotalVolume(userId: number): Promise<number> {
    const result = await prisma.$queryRaw<{ total: bigint }[]>`
      SELECT COALESCE(SUM(we.weight * we.sets * we.reps), 0) as total
      FROM workout_exercises we
      INNER JOIN workouts w ON we.workout_id = w.id
      WHERE w.user_id = ${userId}
        AND w.deleted_at IS NULL
        AND we.weight IS NOT NULL
        AND we.sets IS NOT NULL
        AND we.reps IS NOT NULL
    `;
    return Number(result[0]?.total || 0);
  },

  async calculateWeeklyVolume(userId: number): Promise<number> {
    const weekStart = this.getWeekStart();
    const result = await prisma.$queryRaw<{ total: bigint }[]>`
      SELECT COALESCE(SUM(we.weight * we.sets * we.reps), 0) as total
      FROM workout_exercises we
      INNER JOIN workouts w ON we.workout_id = w.id
      WHERE w.user_id = ${userId}
        AND w.deleted_at IS NULL
        AND w.date >= ${weekStart}
        AND we.weight IS NOT NULL
        AND we.sets IS NOT NULL
        AND we.reps IS NOT NULL
    `;
    return Number(result[0]?.total || 0);
  },

  async calculateStreakDays(userId: number): Promise<number> {
    const workouts = await prisma.workout.findMany({
      where: { userId, deletedAt: null },
      select: { date: true },
      orderBy: { date: 'desc' },
      take: 365,
    });

    if (workouts.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const workoutDates = new Set(
      workouts.map(w => {
        const d = new Date(w.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    );

    const todayTime = currentDate.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (!workoutDates.has(todayTime)) {
      currentDate.setTime(currentDate.getTime() - oneDayMs);
    }

    while (workoutDates.has(currentDate.getTime())) {
      streak++;
      currentDate.setTime(currentDate.getTime() - oneDayMs);
    }

    return streak;
  },

  async getStats(userId: number) {
    const stats = await aggregatedStatsRepository.findByUserId(userId);
    return stats.reduce((acc, stat) => {
      acc[stat.statType] = {
        value: Number(stat.value),
        period: stat.period,
        updatedAt: stat.updatedAt,
      };
      return acc;
    }, {} as Record<string, { value: number; period: string; updatedAt: Date }>);
  },

  getWeekStart(): Date {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const weekStart = new Date(now.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
  },

  getMonthStart(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  },
};
