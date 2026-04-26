import { create } from 'zustand';
import { exercisesApi, Exercise } from '../api/exercises';

interface ExerciseState {
  exercises: Exercise[];
  currentExercise: Exercise | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string;
    equipment: string;
    difficulty: string;
    status: string;
  };
  fetchExercises: () => Promise<void>;
  fetchExercise: (id: number) => Promise<void>;
  createExercise: (data: Parameters<typeof exercisesApi.create>[0]) => Promise<Exercise>;
  updateExercise: (id: number, data: Parameters<typeof exercisesApi.update>[1]) => Promise<void>;
  deleteExercise: (id: number) => Promise<void>;
  setFilters: (filters: Partial<ExerciseState['filters']>) => void;
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  exercises: [],
  currentExercise: null,
  isLoading: false,
  error: null,
  filters: {
    category: '',
    equipment: '',
    difficulty: '',
    status: '',
  },

  fetchExercises: async () => {
    set({ isLoading: true, error: null });
    try {
      const { exercises } = await exercisesApi.getAll(get().filters);
      set({ exercises, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchExercise: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { exercise } = await exercisesApi.getById(id);
      set({ currentExercise: exercise, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  createExercise: async (data) => {
    const { exercise } = await exercisesApi.create(data);
    await get().fetchExercises();
    return exercise;
  },

  updateExercise: async (id, data) => {
    await exercisesApi.update(id, data);
    await get().fetchExercises();
    if (get().currentExercise?.id === id) {
      await get().fetchExercise(id);
    }
  },

  deleteExercise: async (id) => {
    await exercisesApi.delete(id);
    set({ exercises: get().exercises.filter((e) => e.id !== id) });
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
    get().fetchExercises();
  },
}));