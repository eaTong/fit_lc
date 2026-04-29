import { create } from 'zustand';
import type { Plan } from '../api/plans';

interface PlanState {
  plans: Plan[];
  currentPlan: Plan | null;
  isLoading: boolean;
  setPlans: (plans: Plan[]) => void;
  setCurrentPlan: (plan: Plan | null) => void;
  setLoading: (loading: boolean) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  plans: [],
  currentPlan: null,
  isLoading: false,

  setPlans: (plans) => set({ plans }),
  setCurrentPlan: (currentPlan) => set({ currentPlan }),
  setLoading: (isLoading) => set({ isLoading })
}));