import { create } from 'zustand';

interface TriggerEvent {
  id: number;
  userId: number;
  triggerType: string;
  triggerKey: string;
  payload: any;
  triggeredAt: string;
}

interface TriggerState {
  history: TriggerEvent[];
  isLoading: boolean;
  error: string | null;

  fetchHistory: (limit?: number) => Promise<void>;
  recordTrigger: (triggerType: string, triggerKey: string, payload?: any) => Promise<boolean>;
  shouldTrigger: (triggerType: string, triggerKey: string) => Promise<boolean>;
  deleteTrigger: (id: number) => Promise<void>;
}

export const useTriggerStore = create<TriggerState>((set) => ({
  history: [],
  isLoading: false,
  error: null,

  fetchHistory: async (limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/triggers/history?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      set({ history: data.history || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  recordTrigger: async (triggerType, triggerKey, payload) => {
    try {
      const response = await fetch('/api/triggers/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ triggerType, triggerKey, payload }),
      });
      const data = await response.json();
      return data.triggered;
    } catch (err: any) {
      console.error('Record trigger error:', err);
      return false;
    }
  },

  shouldTrigger: async (triggerType, triggerKey) => {
    try {
      const response = await fetch(
        `/api/triggers/should-trigger?triggerType=${encodeURIComponent(triggerType)}&triggerKey=${encodeURIComponent(triggerKey)}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      return data.shouldTrigger;
    } catch (err: any) {
      console.error('Should trigger error:', err);
      return false;
    }
  },

  deleteTrigger: async (id) => {
    try {
      await fetch(`/api/triggers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set((state) => ({
        history: state.history.filter((t) => t.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
