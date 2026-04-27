import client from './client';

// API 返回的嵌套结构
interface WorkoutExercise {
  id: number;
  exerciseName: string;
  sets: number | null;
  reps: number | null;
  weight: string | null;
  duration: number | null;
  distance: number | null;
}

interface RawWorkout {
  id: number;
  date: string;
  exercises: WorkoutExercise[];
}

interface RawMeasurement {
  id: number;
  date: string;
  items: {
    id: number;
    body_part: string;
    value: string;
  }[];
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
  async getWorkouts(start?: string, end?: string): Promise<{ workouts: RawWorkout[] }> {
    const params = start || end ? { start, end } : {};
    const { data } = await client.get<{ workouts: RawWorkout[] }>('/records/workouts', { params });
    return data;
  },

  async getMeasurements(start?: string, end?: string): Promise<{ measurements: RawMeasurement[] }> {
    const params = start || end ? { start, end } : {};
    const { data } = await client.get<{ measurements: RawMeasurement[] }>('/records/measurements', { params });
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