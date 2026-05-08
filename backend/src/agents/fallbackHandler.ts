/**
 * Fallback 处理器
 * 当 LLM 未返回工具调用时，尝试从文本中解析结构化数据
 */

import { saveService } from '../services/saveService';

export interface FallbackResult {
  success: boolean;
  toolData?: {
    dataType: string;
    result: any;
  };
  reply: string;
  parsedData?: {
    type: 'workout' | 'measurement';
    data: any;
  };
}

// 缓存动作名称列表，用于 fallback 解析
let cachedExerciseNames: string[] = [];
let exerciseCachePromise: Promise<string[]> | null = null;

async function getExerciseNames(): Promise<string[]> {
  if (cachedExerciseNames.length > 0) {
    return cachedExerciseNames;
  }
  if (exerciseCachePromise) {
    return exerciseCachePromise;
  }
  exerciseCachePromise = (async () => {
    try {
      const prisma = (await import('../config/prisma.js')).default;
      const exercises = await prisma.exercise.findMany({
        select: { name: true },
        orderBy: { id: 'asc' }
      });
      cachedExerciseNames = exercises.map(e => e.name);
      console.log(`[FallbackHandler] Loaded ${cachedExerciseNames.length} exercise names`);
      return cachedExerciseNames;
    } catch (err) {
      console.error('[FallbackHandler] Failed to load exercise names:', err);
      return [];
    }
  })();
  return exerciseCachePromise;
}

/**
 * 尝试从文本中解析用户输入
 * 按优先级尝试：围度 -> 训练 -> 无法解析
 */
export async function tryParseUserInput(
  text: string,
  userId: number
): Promise<FallbackResult> {
  // 优先级 1：围度数据
  const measurements = tryParseMeasurements(text);
  if (measurements.length > 0) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const result = await saveService.saveMeasurement(userId, today, measurements);
      return {
        success: true,
        toolData: { dataType: 'measurement', result },
        reply: `已记录围度：${measurements.map(m => `${formatBodyPart(m.body_part)}: ${m.value}`).join('、')}`,
        parsedData: { type: 'measurement', data: measurements }
      };
    } catch (e: any) {
      console.error('[FallbackHandler] Measurement fallback failed:', e.message);
    }
  }

  // 优先级 2：训练数据（使用动作库）
  const workout = await tryParseWorkout(text, userId);
  if (workout) {
    try {
      const result = await saveService.saveWorkout(userId, workout.date, workout.exercises);
      return {
        success: true,
        toolData: { dataType: 'workout', result },
        reply: `已记录训练：${workout.exercises.map(e => e.name).join('、')}`,
        parsedData: { type: 'workout', data: workout }
      };
    } catch (e: any) {
      console.error('[FallbackHandler] Workout fallback failed:', e.message);
    }
  }

  // 优先级 3：无法解析
  return { success: false, reply: '' };
}

/**
 * 尝试从文本中解析围度数据
 */
function tryParseMeasurements(text: string): Array<{ body_part: string; value: number }> {
  const results: Array<{ body_part: string; value: number }> = [];
  const today = new Date().toISOString().split('T')[0];

  // 胸围
  const chestMatch = text.match(/胸围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (chestMatch) {
    results.push({ body_part: 'chest', value: parseFloat(chestMatch[1]) });
  }

  // 腰围
  const waistMatch = text.match(/腰围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (waistMatch) {
    results.push({ body_part: 'waist', value: parseFloat(waistMatch[1]) });
  }

  // 臀围
  const hipsMatch = text.match(/臀围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (hipsMatch) {
    results.push({ body_part: 'hips', value: parseFloat(hipsMatch[1]) });
  }

  // 臂围 - 先匹配左右，再匹配通用
  const leftBicepsMatch = text.match(/左臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightBicepsMatch = text.match(/右臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const bicepsMatch = text.match(/(?<!左)(?<!右)臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);

  if (leftBicepsMatch) {
    results.push({ body_part: 'biceps_l', value: parseFloat(leftBicepsMatch[1]) });
  }
  if (rightBicepsMatch) {
    results.push({ body_part: 'biceps_r', value: parseFloat(rightBicepsMatch[1]) });
  }
  if (bicepsMatch && !leftBicepsMatch && !rightBicepsMatch) {
    results.push({ body_part: 'biceps', value: parseFloat(bicepsMatch[1]) });
  }

  // 大腿围 - 先匹配左右，再匹配通用
  const leftThighMatch = text.match(/左大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightThighMatch = text.match(/右大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const thighMatch = text.match(/(?<!左)(?<!右)大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);

  if (leftThighMatch) {
    results.push({ body_part: 'thigh_l', value: parseFloat(leftThighMatch[1]) });
  }
  if (rightThighMatch) {
    results.push({ body_part: 'thigh_r', value: parseFloat(rightThighMatch[1]) });
  }
  if (thighMatch && !leftThighMatch && !rightThighMatch) {
    results.push({ body_part: 'thighs', value: parseFloat(thighMatch[1]) });
  }

  // 小腿围 - 先匹配左右，再匹配通用
  const leftCalfMatch = text.match(/左小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightCalfMatch = text.match(/右小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const calfMatch = text.match(/(?<!左)(?<!右)小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);

  if (leftCalfMatch) {
    results.push({ body_part: 'calf_l', value: parseFloat(leftCalfMatch[1]) });
  }
  if (rightCalfMatch) {
    results.push({ body_part: 'calf_r', value: parseFloat(rightCalfMatch[1]) });
  }
  if (calfMatch && !leftCalfMatch && !rightCalfMatch) {
    results.push({ body_part: 'calves', value: parseFloat(calfMatch[1]) });
  }

  // 体重
  const weightMatch = text.match(/(?:体重|体重是)[是为]*\s*(\d+(?:\.\d+)?)\s*(?:kg|公斤)?/i);
  if (weightMatch) {
    results.push({ body_part: 'weight', value: parseFloat(weightMatch[1]) });
  }

  // 体脂率
  const bodyFatMatch = text.match(/(?:体脂[是为]*|体脂率)\s*(\d+(?:\.\d+)?)\s*%?/i);
  if (bodyFatMatch) {
    results.push({ body_part: 'bodyFat', value: parseFloat(bodyFatMatch[1]) });
  }

  return results;
}

/**
 * 尝试从文本中解析训练数据
 */
async function tryParseWorkout(
  text: string,
  _userId: number
): Promise<{ date: string; exercises: Array<{ name: string; sets?: number; reps?: number; weight?: number; duration?: number; distance?: number }> } | null> {
  const exerciseNames = await getExerciseNames();
  if (exerciseNames.length === 0) {
    return tryParseWorkoutSimple(text);
  }

  const exercises: Array<{ name: string; sets?: number; reps?: number; weight?: number; duration?: number; distance?: number }> = [];

  // 构建动作名称正则：优先匹配长名称
  const sortedNames = [...exerciseNames].sort((a, b) => b.length - a.length);
  const namePattern = sortedNames.join('|');

  // 匹配训练记录：动作名 + 重量 + 组数 + 次数
  const fullPattern = new RegExp(`(${namePattern})\\s*(\\d+(?:\\.\\d+)?)\\s*(?:公斤|kg)?\\s*(\\d+)\\s*(?:组|个)?\\s*[每x]?\\s*(\\d+)\\s*(?:次|个)?`, 'i');

  // 简单匹配：动作名 + 数字
  const simplePattern = new RegExp(`(${namePattern})\\s*(\\d+)\\s*(?:组|个|次)`, 'i');

  let match = text.match(fullPattern);
  if (match) {
    exercises.push({
      name: match[1],
      weight: parseFloat(match[2]),
      sets: parseInt(match[3]),
      reps: parseInt(match[4])
    });
  } else {
    match = text.match(simplePattern);
    if (match) {
      exercises.push({
        name: match[1],
        reps: parseInt(match[2])
      });
    }
  }

  // 解析只有次数的动作
  if (exercises.length === 0) {
    const countOnlyPattern = /(\d+)\s*个?(俯卧撑|深蹲|引体向上|双杠臂屈伸)/i;
    const countMatch = text.match(countOnlyPattern);
    if (countMatch) {
      exercises.push({
        name: countMatch[2],
        reps: parseInt(countMatch[1])
      });
    }
  }

  // 解析有氧（跑步、游泳等）
  if (exercises.length === 0) {
    const cardioPatterns = [
      { regex: /跑了?(\d+(?:\.\d+)?)\s*(?:公里|km)/i, name: '跑步', distanceKey: 'distance' },
      { regex: /跑了?(\d+(?:\.\d+)?)\s*分钟/i, name: '跑步', durationKey: 'duration' },
      { regex: /走了?(\d+(?:\.\d+)?)\s*(?:公里|km)/i, name: '步行', distanceKey: 'distance' },
      { regex: /游泳了?(\d+(?:\.\d+)?)\s*米/i, name: '游泳', distanceKey: 'distance' },
      { regex: /骑行了?(\d+(?:\.\d+)?)\s*(?:公里|km)/i, name: '骑行', distanceKey: 'distance' },
      { regex: /hiit\s*(\d+)\s*分钟/i, name: 'HIIT', durationKey: 'duration' },
    ];

    for (const pattern of cardioPatterns) {
      const cardioMatch = text.match(pattern.regex);
      if (cardioMatch) {
        const exercise: any = { name: pattern.name };
        if ('distanceKey' in pattern && pattern.distanceKey) {
          exercise.distance = parseFloat(cardioMatch[1]);
        }
        if ('durationKey' in pattern && pattern.durationKey) {
          exercise.duration = parseFloat(cardioMatch[1]);
        }
        exercises.push(exercise);
        break;
      }
    }
  }

  if (exercises.length === 0) return null;

  return {
    date: new Date().toISOString().split('T')[0],
    exercises
  };
}

/**
 * 简单版训练解析（无动作库时使用）
 */
function tryParseWorkoutSimple(text: string): { date: string; exercises: any[] } | null {
  const exercises: any[] = [];

  const patterns = [
    { regex: /(\d+)\s*个?俯卧撑/i, name: '俯卧撑', repsKey: 'reps' },
    { regex: /(\d+)\s*个?深蹲/i, name: '深蹲', repsKey: 'reps' },
    { regex: /(\d+)\s*个?引体向上/i, name: '引体向上', repsKey: 'reps' },
    { regex: /跑了?(\d+(?:\.\d+)?)\s*(?:公里|km)/i, name: '跑步', distanceKey: 'distance' },
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern.regex);
    if (match) {
      const exercise: any = { name: pattern.name };
      if ('repsKey' in pattern && pattern.repsKey) {
        exercise.reps = parseInt(match[1]);
      }
      if ('distanceKey' in pattern && pattern.distanceKey) {
        exercise.distance = parseFloat(match[1]);
      }
      exercises.push(exercise);
      break;
    }
  }

  if (exercises.length === 0) return null;

  return {
    date: new Date().toISOString().split('T')[0],
    exercises
  };
}

/**
 * 格式化身体部位名称（英文 -> 中文）
 */
function formatBodyPart(bodyPart: string): string {
  const mapping: Record<string, string> = {
    chest: '胸围',
    waist: '腰围',
    hips: '臀围',
    biceps: '臂围',
    biceps_l: '左臂围',
    biceps_r: '右臂围',
    thighs: '大腿围',
    thigh_l: '左大腿围',
    thigh_r: '右大腿围',
    calves: '小腿围',
    calf_l: '左小腿围',
    calf_r: '右小腿围',
    weight: '体重',
    bodyFat: '体脂率'
  };
  return mapping[bodyPart] || bodyPart;
}