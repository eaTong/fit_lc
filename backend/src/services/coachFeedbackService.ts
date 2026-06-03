import prisma from '../config/prisma';
import { Workout, WorkoutExercise } from '@prisma/client';

interface WorkoutFeedback {
  pr_detected: boolean;
  volume_change: 'up' | 'same' | 'down';
  consistency_streak: number;
  personalized_comment: string;
  /** F-019: 丰富回复数据，用于 AI 二次生成个性化评价 */
  rich_context?: RichFeedbackContext;
}

/** F-019 丰富反馈上下文 */
export interface RichFeedbackContext {
  streak: number;
  totalWorkoutsThisMonth: number;
  exerciseComparisons: ExerciseComparison[];
  overallVolumeChange: VolumeChangeResult;
  weeklyFrequencyChange?: { thisWeek: number; lastWeek: number };
  bestMoment?: string; // 本次训练最亮眼的数据点
}

interface ExerciseComparison {
  name: string;
  /** 本次：组数 */
  currentSets?: number;
  /** 本次：次数 */
  currentReps?: number;
  /** 本次：重量 */
  currentWeight?: number;
  /** 上周同动作平均组数 */
  lastWeekAvgSets?: number;
  /** 上周同动作平均重量 */
  lastWeekAvgWeight?: number;
  /** 历史最大重量 */
  historyMaxWeight?: number;
  isNewPR: boolean;
  setsDelta?: number;   // 正数=增加，负数=减少
  weightDelta?: number; // 正数=增加，负数=减少
}

interface WorkoutWithExercises extends Workout {
  exercises: WorkoutExercise[];
}

interface PRCheckResult {
  detected: boolean;
  exercise?: string;
  oldWeight?: number;
  newWeight?: number;
}

interface VolumeChangeResult {
  direction: 'up' | 'same' | 'down';
  percentage?: number;
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

  // 并行获取所有需要的数据（F-019 优化：一次性并行查询）
  const [streak, prResult, volumeChange, richContext] = await Promise.all([
    calculateStreak(userId),
    checkPR(userId, workout.exercises),
    calculateVolumeChange(userId, workout),
    buildRichFeedbackContext(userId, workout)
  ]);

  // 把 streak 注入到 richContext 里（避免重复查询）
  if (richContext) {
    richContext.streak = streak;
    richContext.overallVolumeChange = volumeChange;
  }

  // 生成个性化评价
  const comment = generateComment(prResult, volumeChange, streak, workout);

  return {
    pr_detected: prResult.detected,
    volume_change: volumeChange.direction,
    consistency_streak: streak,
    personalized_comment: comment,
    rich_context: richContext
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

/**
 * F-019: 构建丰富反馈上下文
 * 包含每个动作与上周的逐项对比
 */
async function buildRichFeedbackContext(
  userId: number,
  workout: WorkoutWithExercises
): Promise<RichFeedbackContext> {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const exerciseNames = workout.exercises.map(e => e.exerciseName);

  // 并行查询：上周同动作记录 + 月度训练次数 + 本周/上周频率
  const [lastWeekExercises, totalThisMonth, thisWeekCount, lastWeekCount, historyMaxes] =
    await Promise.all([
      // 上周同动作的所有记录（7~14天前）
      prisma.workoutExercise.findMany({
        where: {
          workout: {
            userId,
            deletedAt: null,
            date: { gte: twoWeeksAgo, lt: oneWeekAgo }
          },
          exerciseName: { in: exerciseNames }
        },
        include: { workout: { select: { date: true } } }
      }),
      // 本月训练总次数
      prisma.workout.count({
        where: { userId, deletedAt: null, date: { gte: monthStart } }
      }),
      // 本周训练次数（今天所在的周，用独立的 Date 对象避免副作用）
      prisma.workout.count({
        where: {
          userId,
          deletedAt: null,
          date: {
            gte: (() => {
              const d = new Date();
              const dayOfWeek = d.getDay() || 7; // 周日=7
              d.setDate(d.getDate() - dayOfWeek + 1); // 本周一
              d.setHours(0, 0, 0, 0);
              return d;
            })()
          }
        }
      }),
      // 上周训练次数
      prisma.workout.count({
        where: {
          userId,
          deletedAt: null,
          date: { gte: twoWeeksAgo, lt: oneWeekAgo }
        }
      }),
      // 各动作历史最大重量
      prisma.workoutExercise.groupBy({
        by: ['exerciseName'],
        where: {
          workout: { userId, deletedAt: null },
          exerciseName: { in: exerciseNames },
          weight: { not: null }
        },
        _max: { weight: true, sets: true }
      })
    ]);

  // 建立上周数据查找表：exerciseName -> 平均值
  const lastWeekMap = new Map<string, { totalSets: number; totalWeight: number; count: number; maxWeight: number }>();
  for (const ex of lastWeekExercises) {
    const entry = lastWeekMap.get(ex.exerciseName) || { totalSets: 0, totalWeight: 0, count: 0, maxWeight: 0 };
    entry.count++;
    entry.totalSets += ex.sets || 0;
    entry.totalWeight += ex.weight ? Number(ex.weight) : 0;
    entry.maxWeight = Math.max(entry.maxWeight, ex.weight ? Number(ex.weight) : 0);
    lastWeekMap.set(ex.exerciseName, entry);
  }

  // 历史最大值查找表（groupBy 返回的聚合字段直接在 h._max 上）
  const historyMaxMap = new Map(historyMaxes.map(h => [h.exerciseName, {
    weight: h._max.weight,
    sets: h._max.sets
  }]));

  // 构建逐动作对比
  const exerciseComparisons: ExerciseComparison[] = workout.exercises.map(ex => {
    const lastWeek = lastWeekMap.get(ex.exerciseName);
    const historyMax = historyMaxMap.get(ex.exerciseName);

    const lastWeekAvgSets = lastWeek ? lastWeek.totalSets / lastWeek.count : undefined;
    const lastWeekAvgWeight = lastWeek && lastWeek.totalWeight > 0
      ? lastWeek.totalWeight / lastWeek.count
      : undefined;
    const historyMaxWeight = historyMax?.weight
      ? Number(historyMax.weight)
      : undefined;

    const currentWeight = ex.weight ? Number(ex.weight) : undefined;
    const setsDelta = ex.sets && lastWeekAvgSets
      ? Math.round((ex.sets - lastWeekAvgSets) * 10) / 10
      : undefined;
    const weightDelta = currentWeight && lastWeekAvgWeight
      ? Math.round((currentWeight - lastWeekAvgWeight) * 10) / 10
      : undefined;

    // 判断是否 PR（当前重量 > 历史最大重量）
    const isNewPR = !!(currentWeight && historyMaxWeight && currentWeight > historyMaxWeight);

    return {
      name: ex.exerciseName,
      currentSets: ex.sets || undefined,
      currentReps: ex.reps || undefined,
      currentWeight,
      lastWeekAvgSets: lastWeekAvgSets ? Math.round(lastWeekAvgSets * 10) / 10 : undefined,
      lastWeekAvgWeight: lastWeekAvgWeight ? Math.round(lastWeekAvgWeight * 10) / 10 : undefined,
      historyMaxWeight,
      isNewPR,
      setsDelta,
      weightDelta
    };
  });

  // 找出本次最亮眼的数据点（用于 bestMoment）
  const bestMoment = pickBestMoment(exerciseComparisons);

  return {
    streak: 0, // 由外层 generateWorkoutFeedback 注入真实值
    totalWorkoutsThisMonth: totalThisMonth,
    exerciseComparisons,
    overallVolumeChange: {
      direction: 'same' as const // 由外层注入真实值
    },
    weeklyFrequencyChange: { thisWeek: thisWeekCount, lastWeek: lastWeekCount },
    bestMoment
  };
}

/**
 * 从动作对比中选出最值得强调的一个亮点
 */
function pickBestMoment(comparisons: ExerciseComparison[]): string | undefined {
  // 优先级：新PR > 重量增加 > 组数增加
  const newPR = comparisons.find(c => c.isNewPR);
  if (newPR && newPR.currentWeight && newPR.historyMaxWeight) {
    return `${newPR.name}重量突破历史记录：${newPR.historyMaxWeight}kg → ${newPR.currentWeight}kg 🏆`;
  }

  const weightUp = comparisons
    .filter(c => c.weightDelta && c.weightDelta > 0)
    .sort((a, b) => (b.weightDelta || 0) - (a.weightDelta || 0))[0];
  if (weightUp && weightUp.weightDelta) {
    return `${weightUp.name}重量比上周增加了 ${weightUp.weightDelta}kg 💪`;
  }

  const setsUp = comparisons
    .filter(c => c.setsDelta && c.setsDelta > 0)
    .sort((a, b) => (b.setsDelta || 0) - (a.setsDelta || 0))[0];
  if (setsUp && setsUp.setsDelta) {
    return `${setsUp.name}组数比上周多了 ${setsUp.setsDelta} 组 📈`;
  }

  return undefined;
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

async function checkPR(userId: number, exercises: WorkoutExercise[]): Promise<PRCheckResult> {
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

async function calculateVolumeChange(userId: number, workout: WorkoutWithExercises): Promise<VolumeChangeResult> {
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

function generateComment(prResult: PRCheckResult, volumeChange: VolumeChangeResult, streak: number, workout: WorkoutWithExercises): string {
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
