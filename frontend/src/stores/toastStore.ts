import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  status?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, status?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (message, type, status) => {
    // 相同消息和类型的 toast 已存在则跳过
    const exists = useToastStore.getState().toasts.some(
      (t) => t.message === message && t.type === type
    );
    if (exists) return;

    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, status }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
