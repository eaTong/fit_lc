// @ts-nocheck
import prisma from '../lib/prisma';

interface WorkoutFeedback {
  pr_detected: boolean;
  volume_change: 'up' | 'same' | 'down';
  consistency_streak: number;
  personalized_comment: string;
}

export async function generateWorkoutFeedback(
  userId: number,
  workoutId: number
): Promise<WorkoutFeedback> {
  try {
    if (!userId || typeof userId !== 'number') {
      return {
        pr_detected: false,
        volume_change: 'same',
        consistency_streak: 0,
        personalized_comment: '记录成功！'
      };
    }

    const workout = await prisma.workout.findUnique({
    where: { id: workoutId },
    include: { exercises: true }
  });

  if (!workout) {
    return {
      pr_detected: false,
      volume_change: 'same',
      consistency_streak: 0,
      personalized_comment: '记录成功！'
    };
  }

  // 计算连续记录天数
  const streak = await calculateStreak(userId);

  // 检测是否破 PR
  const prResult = await checkPR(userId, workout.exercises);

  // 计算训练量变化
  const volumeChange = await calculateVolumeChange(userId, workout);

  // 生成个性化评价
  const comment = generateComment(prResult, volumeChange, streak, workout);

  return {
    pr_detected: prResult.detected,
    volume_change: volumeChange.direction,
    consistency_streak: streak,
    personalized_comment: comment
  };
  } catch (error) {
    console.error('generateWorkoutFeedback error:', error);
    return {
      pr_detected: false,
      volume_change: 'same',
      consistency_streak: 0,
      personalized_comment: '记录成功！'
    };
  }
}

async function calculateStreak(userId: number): Promise<number> {
  const workouts = await prisma.workout.findMany({
    where: { userId, deletedAt: null },
    orderBy: { date: 'desc' },
    take: 30
  });

  let streak = 0;
  // Use UTC midnight for current date
  const now = new Date();
  let currentDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

  for (const w of workouts) {
    const workoutDate = new Date(w.date);
    const workoutDateUTC = new Date(Date.UTC(workoutDate.getFullYear(), workoutDate.getMonth(), workoutDate.getDate()));

    const diffDays = Math.floor((currentDate.getTime() - workoutDateUTC.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      streak++;
      currentDate = workoutDateUTC;
    } else {
      break;
    }
  }

  return streak;
}

async function checkPR(userId: number, exercises: any[]): Promise<{ detected: boolean; exercise?: string; oldWeight?: number; newWeight?: number }> {
  // Collect exercise names with weights
  const exercisesWithWeight = exercises.filter(ex => ex.weight);
  if (exercisesWithWeight.length === 0) {
    return { detected: false };
  }

  const exerciseNames = exercisesWithWeight.map(ex => ex.exerciseName);

  // Single batch query to get max weight per exercise
  const historicalMaxes = await prisma.workoutExercise.groupBy({
    by: ['exerciseName'],
    where: {
      workout: { userId, deletedAt: null },
      exerciseName: { in: exerciseNames },
      weight: { not: null }
    },
    _max: { weight: true }
  });

  const maxWeightMap = new Map(historicalMaxes.map(m => [m.exerciseName, m._max.weight]));

  for (const ex of exercisesWithWeight) {
    const historicalMax = maxWeightMap.get(ex.exerciseName);
    if (historicalMax && Number(ex.weight) > Number(historicalMax)) {
      return {
        detected: true,
        exercise: ex.exerciseName,
        oldWeight: Number(historicalMax),
        newWeight: Number(ex.weight)
      };
    }
  }

  return { detected: false };
}

async function calculateVolumeChange(userId: number, workout: any): Promise<{ direction: 'up' | 'same' | 'down'; percentage?: number }> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const lastWeekWorkouts = await prisma.workout.findMany({
    where: {
      userId,
      deletedAt: null,
      date: { gte: oneWeekAgo, lt: new Date() }
    },
    include: { exercises: true }
  });

  if (lastWeekWorkouts.length === 0) {
    return { direction: 'same' };
  }

  const currentSets = workout.exercises.reduce((sum, ex) => sum + (ex.sets || 0), 0);
  const lastWeekSets = lastWeekWorkouts.reduce((sum, w) =>
    sum + w.exercises.reduce((s, e) => s + (e.sets || 0), 0), 0);
  const avgLastWeekSets = lastWeekSets / lastWeekWorkouts.length;

  if (currentSets > avgLastWeekSets * 1.1) {
    const percentage = Math.round((currentSets / avgLastWeekSets - 1) * 100);
    return { direction: 'up', percentage };
  } else if (currentSets < avgLastWeekSets * 0.9) {
    const percentage = Math.round((1 - currentSets / avgLastWeekSets) * 100);
    return { direction: 'down', percentage };
  }

  return { direction: 'same' };
}

function generateComment(prResult: any, volumeChange: any, streak: number, workout: any): string {
  const parts: string[] = [];

  if (prResult.detected) {
    parts.push(`🔥 ${prResult.exercise} ${prResult.oldWeight}kg → ${prResult.newWeight}kg！这是你的新个人纪录！`);
  }

  if (streak > 0) {
    parts.push(`📈 连续第${streak}天记录，习惯正在养成！`);
  }

  if (volumeChange.direction === 'up') {
    parts.push(`💪 今天训练量比上周多了${volumeChange.percentage}%，状态不错！`);
  }

  if (parts.length === 0) {
    parts.push('✅ 训练记录完成！');
  }

  return parts.join('\n');
}