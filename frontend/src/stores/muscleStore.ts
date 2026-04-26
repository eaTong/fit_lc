import { create } from 'zustand';
import { musclesApi, Muscle, MuscleGroup } from '../api/muscles';

interface MuscleState {
  muscles: Muscle[];
  hierarchy: MuscleGroup[];
  isLoading: boolean;
  error: string | null;
  fetchMuscles: () => Promise<void>;
  fetchHierarchy: () => Promise<void>;
  createMuscle: (data: { name: string; group: string; parentId?: number; sortOrder?: number; origin?: string; insertion?: string; function?: string; trainingTips?: string }) => Promise<Muscle>;
  updateMuscle: (id: number, data: { name?: string; origin?: string; insertion?: string; function?: string; trainingTips?: string; sortOrder?: number }) => Promise<void>;
  deleteMuscle: (id: number) => Promise<void>;
}

export const useMuscleStore = create<MuscleState>((set, get) => ({
  muscles: [],
  hierarchy: [],
  isLoading: false,
  error: null,

  fetchMuscles: async () => {
    set({ isLoading: true, error: null });
    try {
      const { muscles } = await musclesApi.getAll();
      set({ muscles, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchHierarchy: async () => {
    set({ isLoading: true, error: null });
    try {
      const { hierarchy } = await musclesApi.getHierarchy();
      set({ hierarchy, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  createMuscle: async (data) => {
    const { muscle } = await musclesApi.create(data);
    await get().fetchMuscles();
    await get().fetchHierarchy();
    return muscle;
  },

  updateMuscle: async (id, data) => {
    await musclesApi.update(id, data);
    await get().fetchMuscles();
    await get().fetchHierarchy();
  },

  deleteMuscle: async (id) => {
    await musclesApi.delete(id);
    await get().fetchMuscles();
    await get().fetchHierarchy();
  },
}));