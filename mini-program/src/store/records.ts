import { create } from 'zustand';
import type { Workout, Measurement } from '../api/records';

interface RecordsState {
  workouts: Workout[];
  measurements: Measurement[];
  isLoading: boolean;
  setWorkouts: (workouts: Workout[]) => void;
  setMeasurements: (measurements: Measurement[]) => void;
  setLoading: (loading: boolean) => void;
  addWorkout: (workout: Workout) => void;
  removeWorkout: (id: number) => void;
  addMeasurement: (measurement: Measurement) => void;
  removeMeasurement: (id: number) => void;
}

export const useRecordsStore = create<RecordsState>((set) => ({
  workouts: [],
  measurements: [],
  isLoading: false,

  setWorkouts: (workouts) => set({ workouts }),
  setMeasurements: (measurements) => set({ measurements }),
  setLoading: (isLoading) => set({ isLoading }),

  addWorkout: (workout) =>
    set((state) => ({ workouts: [workout, ...state.workouts] })),

  removeWorkout: (id) =>
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== id)
    })),

  addMeasurement: (measurement) =>
    set((state) => ({ measurements: [measurement, ...state.measurements] })),

  removeMeasurement: (id) =>
    set((state) => ({
      measurements: state.measurements.filter((m) => m.id !== id)
    }))
}));