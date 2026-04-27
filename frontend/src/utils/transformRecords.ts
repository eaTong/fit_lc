import type { Workout, Measurement, WorkoutSet } from '../types';

interface RawWorkoutRow {
  id: number;
  user_id: number;
  date: string;
  created_at: string;
  deleted_at: string | null;
  exercise_id?: number;
  exercise_name?: string;
  sets: number | null;
  reps: number | null;
  weight: string | null;
  duration: number | null;
  distance: number | null;
}

// API 返回的嵌套结构
interface ApiWorkout {
  id: number;
  date: string;
  exercises: {
    id: number;
    exerciseName: string;
    sets: number | null;
    reps: number | null;
    weight: string | null;
    duration: number | null;
    distance: number | null;
  }[];
}

export function transformWorkouts(rows: RawWorkoutRow[] | ApiWorkout[]): Workout[] {
  // 检查是否是嵌套结构（API 直接返回格式）
  if (rows.length > 0 && 'exercises' in rows[0]) {
    const apiWorkouts = rows as ApiWorkout[];
    return apiWorkouts.map(w => ({
      id: w.id,
      date: w.date.split('T')[0],
      exercises: w.exercises.map(e => ({
        id: e.id,
        exerciseName: e.exerciseName,
        duration: e.duration || undefined,
        distance: e.distance ? parseFloat(String(e.distance)) : undefined,
        sets: buildSets(e)
      }))
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // 扁平行格式（旧版兼容）
  const map = new Map<number, Workout>();

  for (const row of rows as RawWorkoutRow[]) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        date: row.date.split('T')[0],
        exercises: []
      });
    }

    if (row.exercise_name) {
      const workout = map.get(row.id)!;
      workout.exercises.push({
        id: row.exercise_id!,
        exerciseName: row.exercise_name,
        duration: row.duration || undefined,
        distance: row.distance ? parseFloat(String(row.distance)) : undefined,
        sets: buildSets(row)
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function buildSets(e: {
  sets: number | null;
  reps: number | null;
  weight: string | null;
}): WorkoutSet[] {
  if (!e.sets || !e.reps) return [];
  const sets: WorkoutSet[] = [];
  for (let i = 0; i < e.sets; i++) {
    sets.push({
      setNumber: i + 1,
      reps: e.reps,
      weight: parseFloat(e.weight || '0')
    });
  }
  return sets;
}

interface RawMeasurementRow {
  id: number;
  user_id: number;
  date: string;
  created_at: string;
  deleted_at: string | null;
  item_id: number;
  body_part: string;
  value: string;
}

// API 返回的嵌套结构
interface ApiMeasurement {
  id: number;
  date: string;
  items: {
    id: number;
    bodyPart: string;
    value: number;
  }[];
}

export function transformMeasurements(rows: RawMeasurementRow[] | ApiMeasurement[]): Measurement[] {
  // 检查是否是嵌套结构（API 直接返回格式）
  if (rows.length > 0 && 'items' in rows[0] && 'bodyPart' in rows[0].items[0]) {
    const apiMeasurements = rows as ApiMeasurement[];
    return apiMeasurements.map(m => ({
      id: m.id,
      date: m.date.split('T')[0],
      items: m.items.map(i => ({
        bodyPart: i.bodyPart as Measurement['items'][0]['bodyPart'],
        value: i.value
      }))
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // 扁平行格式（旧版兼容）
  const map = new Map<number, Measurement>();

  for (const row of rows as RawMeasurementRow[]) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        date: row.date.split('T')[0],
        items: []
      });
    }

    if (row.body_part) {
      map.get(row.id)!.items.push({
        bodyPart: row.body_part as Measurement['items'][0]['bodyPart'],
        value: parseFloat(row.value)
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}