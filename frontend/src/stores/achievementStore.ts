import { create } from 'zustand';
import { achievementApi, PersonalRecord, Badge, Milestone, Stats } from '../api/achievement';

interface AchievementState {
  personalRecords: PersonalRecord[];
  badges: Badge[];
  milestones: Milestone[];
  stats: Stats;
  newAchievements: { badges: Badge[]; milestones: Milestone[] };
  isLoading: boolean;
  error: string | null;

  fetchPersonalRecords: () => Promise<void>;
  fetchBadges: () => Promise<void>;
  fetchMilestones: () => Promise<void>;
  fetchStats: () => Promise<void>;
  checkAchievements: (type: string, data?: any) => Promise<void>;
  clearNewAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>((set) => ({
  personalRecords: [],
  badges: [],
  milestones: [],
  stats: {},
  newAchievements: { badges: [], milestones: [] },
  isLoading: false,
  error: null,

  fetchPersonalRecords: async () => {
    set({ isLoading: true, error: null });
    try {
      const { personalRecords } = await achievementApi.getPersonalRecords();
      set({ personalRecords, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchBadges: async () => {
    set({ isLoading: true, error: null });
    try {
      const { badges } = await achievementApi.getBadges();
      set({ badges, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchMilestones: async () => {
    set({ isLoading: true, error: null });
    try {
      const { milestones } = await achievementApi.getMilestones();
      set({ milestones, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const { stats } = await achievementApi.getStats();
      set({ stats, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  checkAchievements: async (type, data) => {
    try {
      const result = await achievementApi.check(type, data);
      if (result.badges.length > 0 || result.milestones.length > 0) {
        set((state) => ({
          newAchievements: {
            badges: [...state.newAchievements.badges, ...result.badges],
            milestones: [...state.newAchievements.milestones, ...result.milestones],
          },
        }));
      }
    } catch (err: any) {
      console.error('Check achievements error:', err);
    }
  },

  clearNewAchievements: () => {
    set({ newAchievements: { badges: [], milestones: [] } });
  },
}));
