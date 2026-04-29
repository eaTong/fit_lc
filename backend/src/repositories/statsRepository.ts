import prisma from '../lib/prisma';

export interface WeeklyStats {
  weeklyWorkouts: number;
  monthlyWorkouts: number;
  totalVolume: number;
  workoutDays: number;
}

export interface ChangeItem {
  name: string;
  previousValue: number;
  currentValue: number;
  unit: string;
  type: 'weight' | 'reps' | 'duration' | 'distance' | 'measurement';
}

export interface StatsResult {
  weekly: WeeklyStats;
  changes: ChangeItem[];
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getLastWeekStart(): Date {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  return getWeekStart(lastWeek);
}

function getLastMonthStart(): Date {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  return getMonthStart(lastMonth);
}

export const statsRepository = {
  async getWeeklyStats(userId: number): Promise<WeeklyStats> {
    const now = new Date();
    const weekStart = getWeekStart(now);
    const monthStart = getMonthStart(now);

    // Get this week's workouts
    const weeklyWorkouts = await prisma.workout.count({
      where: {
        userId,
        deletedAt: null,
        date: { gte: weekStart },
      },
    });

    // Get this month's workouts
    const monthlyWorkouts = await prisma.workout.count({
      where: {
        userId,
        deletedAt: null,
        date: { gte: monthStart },
      },
    });

    // Calculate total volume (weight * reps * sets) for this week
    const weeklyExercises = await prisma.workoutExercise.findMany({
      where: {
        workout: {
          userId,
          deletedAt: null,
          date: { gte: weekStart },
        },
      },
      select: {
        weight: true,
        reps: true,
        sets: true,
      },
    });

    let totalVolume = 0;
    for (const ex of weeklyExercises) {
      if (ex.weight && ex.reps && ex.sets) {
        totalVolume += Number(ex.weight) * ex.reps * ex.sets;
      }
    }

    // Count unique workout days this week
    const workoutDaysResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(DISTINCT DATE(date)) as count FROM workouts
      WHERE user_id = ${userId}
      AND deleted_at IS NULL
      AND date >= ${weekStart}
    `;
    const workoutDays = Number(workoutDaysResult[0]?.count || 0);

    return {
      weeklyWorkouts,
      monthlyWorkouts,
      totalVolume,
      workoutDays,
    };
  },

  async getChanges(userId: number): Promise<ChangeItem[]> {
    const changes: ChangeItem[] = [];
    const now = new Date();

    const thisWeekStart = getWeekStart(now);
    const lastWeekStart = getLastWeekStart();

    // Get last week's and this week's exercise data for comparison
    const thisWeekExercises = await prisma.workoutExercise.findMany({
      where: {
        workout: {
          userId,
          deletedAt: null,
          date: { gte: thisWeekStart },
        },
      },
      select: {
        exerciseName: true,
        weight: true,
        reps: true,
        sets: true,
      },
    });

    const lastWeekExercises = await prisma.workoutExercise.findMany({
      where: {
        workout: {
          userId,
          deletedAt: null,
          date: { gte: lastWeekStart, lt: thisWeekStart },
        },
      },
      select: {
        exerciseName: true,
        weight: true,
        reps: true,
        sets: true,
      },
    });

    // Aggregate by exercise name - calculate total volume per exercise
    // Volume = weight * reps * sets for each set, summed up
    const aggregateByExercise = (exercises: typeof thisWeekExercises) => {
      const map = new Map<string, { volume: number; maxWeight: number }>();
      for (const ex of exercises) {
        const weight = Number(ex.weight) || 0;
        const reps = ex.reps || 0;
        const sets = ex.sets || 0;
        const volume = weight * reps * sets;

        const existing = map.get(ex.exerciseName);
        if (!existing) {
          map.set(ex.exerciseName, { volume, maxWeight: weight });
        } else {
          existing.volume += volume;
          if (weight > existing.maxWeight) {
            existing.maxWeight = weight;
          }
        }
      }
      return map;
    };

    const thisWeekMap = aggregateByExercise(thisWeekExercises);
    const lastWeekMap = aggregateByExercise(lastWeekExercises);

    // Find exercises with significant volume changes
    for (const [name, data] of thisWeekMap) {
      const lastData = lastWeekMap.get(name);
      if (lastData && data.volume > 0 && lastData.volume > 0) {
        // Compare max weight for significant progress detection
        const weightChange = data.maxWeight - lastData.maxWeight;
        const threshold = Math.max(0.5, lastData.maxWeight * 0.05); // 5% or 0.5kg
        if (Math.abs(weightChange) >= threshold) {
          changes.push({
            name,
            previousValue: lastData.maxWeight,
            currentValue: data.maxWeight,
            unit: 'kg',
            type: 'weight',
          });
        }
      }
    }

    // Sort by absolute change descending
    changes.sort((a, b) => Math.abs(b.currentValue - b.previousValue) - Math.abs(a.currentValue - a.previousValue));

    // Return top 5 changes
    return changes.slice(0, 5);
  },

  async getStats(userId: number): Promise<StatsResult> {
    const [weekly, changes] = await Promise.all([
      this.getWeeklyStats(userId),
      this.getChanges(userId),
    ]);

    return { weekly, changes };
  },

  async getVolumeByMuscleGroup(userId: number, startDate?: Date, endDate?: Date): Promise<{
    name: string;
    group: string;
    volume: number;
    percentage: number;
  }[]> {
    const dateFilter: any = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    const workouts = await prisma.workout.findMany({
      where: {
        userId,
        deletedAt: null,
        ...(Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {}),
      },
      include: {
        exercises: true,
      },
    });

    if (workouts.length === 0) {
      return [];
    }

    const exerciseNames = [...new Set(
      workouts.flatMap(w => w.exercises.map(e => e.exerciseName))
    )];

    const exercises = await prisma.exercise.findMany({
      where: {
        name: { in: exerciseNames },
        status: 'published',
      },
    });

    const exerciseCategoryMap = new Map<string, string>();
    for (const ex of exercises) {
      exerciseCategoryMap.set(ex.name, ex.category);
    }

    const groupVolumeMap = new Map<string, number>();
    let totalVolume = 0;

    for (const workout of workouts) {
      for (const exercise of workout.exercises) {
        if (exercise.weight && exercise.sets && exercise.reps) {
          const volume = Number(exercise.weight) * exercise.sets * exercise.reps;
          totalVolume += volume;

          const category = exerciseCategoryMap.get(exercise.exerciseName) || 'other';
          const current = groupVolumeMap.get(category) || 0;
          groupVolumeMap.set(category, current + volume);
        }
      }
    }

    const groupNames: Record<string, string> = {
      chest: '胸部',
      back: '背部',
      legs: '腿部',
      shoulders: '肩部',
      arms: '手臂',
      core: '核心',
      other: '其他',
    };

    const result = [];
    for (const [group, volume] of groupVolumeMap) {
      result.push({
        name: groupNames[group] || group,
        group,
        volume,
        percentage: totalVolume > 0 ? Math.round((volume / totalVolume) * 100) : 0,
      });
    }

    result.sort((a, b) => b.volume - a.volume);
    return result;
  },
};
