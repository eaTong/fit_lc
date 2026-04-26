import client from './client';

// Raw API response types (database row format)
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

export interface StatsResponse {
  weekly: WeeklyStats;
  changes: ChangeItem[];
}

export const recordsApi = {
  async getWorkouts(start?: string, end?: string): Promise<{ workouts: RawWorkoutRow[] }> {
    const params = start || end ? { start, end } : {};
    const { data } = await client.get<{ workouts: RawWorkoutRow[] }>('/records/workouts', { params });
    return data;
  },

  async getMeasurements(start?: string, end?: string): Promise<{ measurements: RawMeasurementRow[] }> {
    const params = start || end ? { start, end } : {};
    const { data } = await client.get<{ measurements: RawMeasurementRow[] }>('/records/measurements', { params });
    return data;
  },

  async deleteWorkout(id: number): Promise<{ success: boolean }> {
    const { data } = await client.delete<{ success: boolean }>(`/records/workout/${id}`);
    return data;
  },

  async deleteMeasurement(id: number): Promise<{ success: boolean }> {
    const { data } = await client.delete<{ success: boolean }>(`/records/measurement/${id}`);
    return data;
  },

  async getStats(): Promise<StatsResponse> {
    const { data } = await client.get<StatsResponse>('/records/stats');
    return data;
  },
};