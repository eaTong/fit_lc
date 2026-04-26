import type { Workout, Measurement, WorkoutSet } from '../types';

interface RawWorkoutRow {
  id: number;
  user_id: number;
  date: string;
  created_at: string;
  deleted_at: string | null;
  exercise_id: number;
  exercise_name: string;
  sets: number | null;
  reps: number | null;
  weight: string | null;
  duration: number | null;
  distance: number | null;
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

export function transformWorkouts(rows: RawWorkoutRow[]): Workout[] {
  const map = new Map<number, Workout>();

  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        date: row.date.split('T')[0],
        exercises: []
      });
    }

    if (row.exercise_name) {
      const workout = map.get(row.id)!;
      const sets: WorkoutSet[] = [];

      if (row.sets && row.reps) {
        for (let i = 0; i < row.sets; i++) {
          sets.push({
            setNumber: i + 1,
            reps: row.reps,
            weight: parseFloat(row.weight || '0')
          });
        }
      }

      workout.exercises.push({
        id: row.exercise_id,
        exerciseName: row.exercise_name,
        duration: row.duration || undefined,
        distance: row.distance || undefined,
        sets
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function transformMeasurements(rows: RawMeasurementRow[]): Measurement[] {
  const map = new Map<number, Measurement>();

  for (const row of rows) {
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