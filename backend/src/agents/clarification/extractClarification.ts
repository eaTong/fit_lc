import { ClarificationSession } from './types';
import { MissingField } from '../../tools/utils/validation';

interface ExtractResult {
  supplementedInput: Record<string, any>;
  hasNewData: boolean;
}

// Cache for exercise names
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
      const prisma = (await import('../../config/prisma.js')).default;
      const exercises = await prisma.exercise.findMany({
        select: { name: true },
        orderBy: { id: 'asc' }
      });
      cachedExerciseNames = exercises.map((e: { name: string }) => e.name);
      return cachedExerciseNames;
    } catch (err) {
      console.error('[extractClarification] Failed to load exercise names:', err);
      return [];
    }
  })();
  return exerciseCachePromise;
}

/**
 * 从文本中解析围度数据
 */
function tryParseMeasurements(text: string): Array<{ body_part: string; value: number }> {
  const results: Array<{ body_part: string; value: number }> = [];

  // 胸围
  const chestMatch = text.match(/胸围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (chestMatch) results.push({ body_part: 'chest', value: parseFloat(chestMatch[1]) });

  // 腰围
  const waistMatch = text.match(/腰围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (waistMatch) results.push({ body_part: 'waist', value: parseFloat(waistMatch[1]) });

  // 臀围
  const hipsMatch = text.match(/臀围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (hipsMatch) results.push({ body_part: 'hips', value: parseFloat(hipsMatch[1]) });

  // 臂围
  const leftBicepsMatch = text.match(/左臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightBicepsMatch = text.match(/右臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const bicepsMatch = text.match(/(?<!左)(?<!右)臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (leftBicepsMatch) results.push({ body_part: 'biceps_l', value: parseFloat(leftBicepsMatch[1]) });
  if (rightBicepsMatch) results.push({ body_part: 'biceps_r', value: parseFloat(rightBicepsMatch[1]) });
  if (bicepsMatch && !leftBicepsMatch && !rightBicepsMatch) {
    results.push({ body_part: 'biceps_l', value: parseFloat(bicepsMatch[1]) });
    results.push({ body_part: 'biceps_r', value: parseFloat(bicepsMatch[1]) });
  }

  // 大腿围
  const leftThighMatch = text.match(/左大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightThighMatch = text.match(/右大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const thighMatch = text.match(/(?<!左)(?<!右)大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (leftThighMatch) results.push({ body_part: 'thigh_l', value: parseFloat(leftThighMatch[1]) });
  if (rightThighMatch) results.push({ body_part: 'thigh_r', value: parseFloat(rightThighMatch[1]) });
  if (thighMatch && !leftThighMatch && !rightThighMatch) {
    results.push({ body_part: 'thigh_l', value: parseFloat(thighMatch[1]) });
    results.push({ body_part: 'thigh_r', value: parseFloat(thighMatch[1]) });
  }

  // 小腿围
  const leftCalfMatch = text.match(/左小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightCalfMatch = text.match(/右小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const calfMatch = text.match(/(?<!左)(?<!右)小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (leftCalfMatch) results.push({ body_part: 'calf_l', value: parseFloat(leftCalfMatch[1]) });
  if (rightCalfMatch) results.push({ body_part: 'calf_r', value: parseFloat(rightCalfMatch[1]) });
  if (calfMatch && !leftCalfMatch && !rightCalfMatch) {
    results.push({ body_part: 'calf_l', value: parseFloat(calfMatch[1]) });
    results.push({ body_part: 'calf_r', value: parseFloat(calfMatch[1]) });
  }

  // 体重
  const weightMatch = text.match(/(?:体重|体重是)[是为]*\s*(\d+(?:\.\d+)?)\s*(?:kg|公斤)?/i);
  if (weightMatch) results.push({ body_part: 'weight', value: parseFloat(weightMatch[1]) });

  return results;
}

/**
 * 从文本中解析训练数据
 */
async function tryParseWorkout(text: string): Promise<{ date: string; exercises: Array<{ name: string; sets?: number; reps?: number; weight?: number; duration?: number; distance?: number }> } | null> {
  const exerciseNames = await getExerciseNames();
  if (exerciseNames.length === 0) return null;

  const exercises: Array<{ name: string; sets?: number; reps?: number; weight?: number; duration?: number; distance?: number }> = [];
  const sortedNames = [...exerciseNames].sort((a, b) => b.length - a.length);
  const namePattern = sortedNames.join('|');

  // 匹配完整训练：动作名 + 重量 + 组数 + 次数
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

  // 解析有氧
  if (exercises.length === 0) {
    const cardioPatterns = [
      { regex: /跑了?(\d+(?:\.\d+)?)\s*(?:公里|km)/i, name: '跑步', distanceKey: 'distance' },
      { regex: /跑了?(\d+(?:\.\d+)?)\s*分钟/i, name: '跑步', durationKey: 'duration' },
      { regex: /走了?(\d+(?:\.\d+)?)\s*(?:公里|km)/i, name: '步行', distanceKey: 'distance' },
    ];
    for (const pattern of cardioPatterns) {
      const cardioMatch = text.match(pattern.regex);
      if (cardioMatch) {
        const exercise: any = { name: pattern.name };
        if ('distanceKey' in pattern && pattern.distanceKey) exercise.distance = parseFloat(cardioMatch[1]);
        if ('durationKey' in pattern && pattern.durationKey) exercise.duration = parseFloat(cardioMatch[1]);
        exercises.push(exercise);
        break;
      }
    }
  }

  if (exercises.length === 0) return null;
  return { date: new Date().toISOString().split('T')[0], exercises };
}

/**
 * 从用户回复中提取澄清信息，复用到 partialInput
 */
export async function extractClarification补充(
  message: string,
  session: ClarificationSession,
  userId: number
): Promise<ExtractResult> {
  const supplementedInput = { ...session.partialInput };
  let hasNewData = false;

  if (session.toolName === 'save_workout') {
    const workout = await tryParseWorkout(message);
    if (workout?.exercises?.[0]) {
      const exercise = workout.exercises[0];
      if (!supplementedInput.exercises) {
        supplementedInput.exercises = [{}];
      }

      if (exercise.sets && supplementedInput.exercises[0].sets === undefined) {
        supplementedInput.exercises[0].sets = exercise.sets;
        hasNewData = true;
      }
      if (exercise.reps && supplementedInput.exercises[0].reps === undefined) {
        supplementedInput.exercises[0].reps = exercise.reps;
        hasNewData = true;
      }
      if (exercise.weight && supplementedInput.exercises[0].weight === undefined) {
        supplementedInput.exercises[0].weight = exercise.weight;
        hasNewData = true;
      }
      if (exercise.duration && supplementedInput.exercises[0].duration === undefined) {
        supplementedInput.exercises[0].duration = exercise.duration;
        hasNewData = true;
      }
      if (exercise.distance && supplementedInput.exercises[0].distance === undefined) {
        supplementedInput.exercises[0].distance = exercise.distance;
        hasNewData = true;
      }
    }
  }

  if (session.toolName === 'save_measurement') {
    const measurements = tryParseMeasurements(message);
    if (measurements.length > 0) {
      supplementedInput.measurements = [
        ...(supplementedInput.measurements || []),
        ...measurements
      ];
      hasNewData = true;
    }
  }

  return { supplementedInput, hasNewData };
}

/**
 * 检查是否所有缺失字段都已补充
 */
export function isInputComplete(
  input: Record<string, any>,
  missingFields: MissingField[]
): boolean {
  for (const field of missingFields) {
    const fieldPath = field.field;
    if (fieldPath.includes('[')) {
      const [arrayKey, rest] = fieldPath.split(/[\[\]]/);
      const array = input[arrayKey];
      if (!array || !array[0] || array[0][rest] === undefined) {
        return false;
      }
    } else if (input[fieldPath] === undefined || input[fieldPath] === null) {
      return false;
    }
  }
  return true;
}