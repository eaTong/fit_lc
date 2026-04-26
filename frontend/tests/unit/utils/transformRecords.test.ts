import { describe, it, expect } from 'vitest';
import { transformWorkouts, transformMeasurements } from '../../../src/utils/transformRecords';
import type { RawWorkoutRow, RawMeasurementRow } from '../../../src/utils/transformRecords';

describe('transformWorkouts', () => {
  it('should transform raw workout rows to grouped workouts', () => {
    const rawRows: RawWorkoutRow[] = [
      {
        id: 1,
        user_id: 1,
        date: '2026-04-26T10:00:00Z',
        created_at: '2026-04-26T10:00:00Z',
        deleted_at: null,
        exercise_id: 1,
        exercise_name: '深蹲',
        sets: 3,
        reps: 8,
        weight: '100',
        duration: null,
        distance: null,
      },
    ];

    const result = transformWorkouts(rawRows);

    expect(result).toHaveLength(1);
    expect(result[0].date).toBe('2026-04-26');
    expect(result[0].exercises).toHaveLength(1);
    expect(result[0].exercises[0].exerciseName).toBe('深蹲');
  });

  it('should group multiple exercises into same workout', () => {
    const rawRows: RawWorkoutRow[] = [
      {
        id: 1,
        user_id: 1,
        date: '2026-04-26T10:00:00Z',
        created_at: '2026-04-26T10:00:00Z',
        deleted_at: null,
        exercise_id: 1,
        exercise_name: '深蹲',
        sets: 3,
        reps: 8,
        weight: '100',
        duration: null,
        distance: null,
      },
      {
        id: 1,
        user_id: 1,
        date: '2026-04-26T10:00:00Z',
        created_at: '2026-04-26T10:00:00Z',
        deleted_at: null,
        exercise_id: 2,
        exercise_name: '跑步',
        sets: null,
        reps: null,
        weight: null,
        duration: 30,
        distance: 5,
      },
    ];

    const result = transformWorkouts(rawRows);

    expect(result).toHaveLength(1);
    expect(result[0].exercises).toHaveLength(2);
  });

  it('should sort workouts by date descending', () => {
    const rawRows: RawWorkoutRow[] = [
      {
        id: 1,
        user_id: 1,
        date: '2026-04-20T10:00:00Z',
        created_at: '2026-04-20T10:00:00Z',
        deleted_at: null,
        exercise_id: 1,
        exercise_name: '深蹲',
        sets: 3,
        reps: 8,
        weight: '100',
        duration: null,
        distance: null,
      },
      {
        id: 2,
        user_id: 1,
        date: '2026-04-26T10:00:00Z',
        created_at: '2026-04-26T10:00:00Z',
        deleted_at: null,
        exercise_id: 2,
        exercise_name: '跑步',
        sets: null,
        reps: null,
        weight: null,
        duration: 30,
        distance: 5,
      },
    ];

    const result = transformWorkouts(rawRows);

    expect(result[0].date).toBe('2026-04-26');
    expect(result[1].date).toBe('2026-04-20');
  });
});

describe('transformMeasurements', () => {
  it('should transform raw measurement rows to grouped measurements', () => {
    const rawRows: RawMeasurementRow[] = [
      {
        id: 1,
        user_id: 1,
        date: '2026-04-26T10:00:00Z',
        created_at: '2026-04-26T10:00:00Z',
        deleted_at: null,
        item_id: 1,
        body_part: 'chest',
        value: '94',
      },
      {
        id: 1,
        user_id: 1,
        date: '2026-04-26T10:00:00Z',
        created_at: '2026-04-26T10:00:00Z',
        deleted_at: null,
        item_id: 2,
        body_part: 'waist',
        value: '78',
      },
    ];

    const result = transformMeasurements(rawRows);

    expect(result).toHaveLength(1);
    expect(result[0].date).toBe('2026-04-26');
    expect(result[0].items).toHaveLength(2);
    expect(result[0].items[0].bodyPart).toBe('chest');
    expect(result[0].items[0].value).toBe(94);
  });

  it('should sort measurements by date descending', () => {
    const rawRows: RawMeasurementRow[] = [
      {
        id: 1,
        user_id: 1,
        date: '2026-04-20T10:00:00Z',
        created_at: '2026-04-20T10:00:00Z',
        deleted_at: null,
        item_id: 1,
        body_part: 'chest',
        value: '94',
      },
      {
        id: 2,
        user_id: 1,
        date: '2026-04-26T10:00:00Z',
        created_at: '2026-04-26T10:00:00Z',
        deleted_at: null,
        item_id: 2,
        body_part: 'chest',
        value: '95',
      },
    ];

    const result = transformMeasurements(rawRows);

    expect(result[0].date).toBe('2026-04-26');
    expect(result[1].date).toBe('2026-04-20');
  });
});