import { create } from 'zustand';
import { recordsApi } from '../api/records';
import { transformWorkouts, transformMeasurements } from '../utils/transformRecords';
import type { Workout, Measurement } from '../types';

interface RecordsState {
  workouts: Workout[];
  recentWorkouts: Workout[];
  latestMeasurement: Measurement | null;
  measurements: Measurement[];
  isLoading: boolean;
  error: string | null;
  fetchWorkouts: (start?: string, end?: string) => Promise<void>;
  fetchMeasurements: (start?: string, end?: string) => Promise<void>;
  deleteWorkout: (id: number) => Promise<void>;
  deleteMeasurement: (id: number) => Promise<void>;
}

export const useRecordsStore = create<RecordsState>((set) => ({
  workouts: [],
  recentWorkouts: [],
  latestMeasurement: null,
  measurements: [],
  isLoading: false,
  error: null,

  fetchWorkouts: async (start, end) => {
    set({ isLoading: true, error: null });
    try {
      const { workouts } = await recordsApi.getWorkouts(start, end);
      const transformed = transformWorkouts(workouts);
      set({ workouts: transformed, recentWorkouts: transformed.slice(0, 5), isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchMeasurements: async (start, end) => {
    set({ isLoading: true, error: null });
    try {
      const { measurements } = await recordsApi.getMeasurements(start, end);
      const transformed = transformMeasurements(measurements);
      set({ measurements: transformed, latestMeasurement: transformed[0] || null, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  deleteWorkout: async (id) => {
    try {
      await recordsApi.deleteWorkout(id);
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteMeasurement: async (id) => {
    try {
      await recordsApi.deleteMeasurement(id);
      set((state) => ({
        measurements: state.measurements.filter((m) => m.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));