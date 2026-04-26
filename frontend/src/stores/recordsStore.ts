import { create } from 'zustand';
import { recordsApi } from '../api/records';
import { transformWorkouts, transformMeasurements } from '../utils/transformRecords';
import type { Workout, Measurement } from '../types';

interface RecordsState {
  workouts: Workout[];
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
  measurements: [],
  isLoading: false,
  error: null,

  fetchWorkouts: async (start, end) => {
    set({ isLoading: true, error: null });
    try {
      const { workouts } = await recordsApi.getWorkouts(start, end);
      set({ workouts: transformWorkouts(workouts), isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchMeasurements: async (start, end) => {
    set({ isLoading: true, error: null });
    try {
      const { measurements } = await recordsApi.getMeasurements(start, end);
      set({ measurements: transformMeasurements(measurements), isLoading: false });
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