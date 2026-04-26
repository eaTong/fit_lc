import { useState, useEffect } from 'react';
import { recordsApi } from '../api/records';

export type TipType = 'suggestion' | 'welcome' | null;

interface AppTipState {
  type: TipType;
  content: string;
  lastShownAt: string | null;
}

const STORAGE_KEY_PREFIX = 'fitlc_tip_';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function shouldShowTip(type: TipType, lastShownAt: string | null): boolean {
  if (!type) return false;

  const today = getTodayDate();
  if (lastShownAt) {
    const [lastDate] = lastShownAt.split('T');
    if (lastDate === today) {
      return false; // Already shown today
    }
  }

  return true;
}

export function useAppTip() {
  const [tipState, setTipState] = useState<AppTipState>({ type: null, content: '', lastShownAt: null });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkTip = async () => {
      const today = getTodayDate();
      const storageKey = `${STORAGE_KEY_PREFIX}${today}`;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        // Already shown today
        return;
      }

      try {
        // Check stats to determine tip type
        const stats = await recordsApi.getStats();
        const { weeklyWorkouts } = stats.weekly;

        // Calculate days since last workout
        // For now, if weeklyWorkouts is 0, it means no workout this week
        // We could track last workout date more precisely with a dedicated endpoint

        let type: TipType = null;
        let content = '';

        // Priority 1: Today's suggestion (if we have a plan or recommendation)
        // For now, just show a generic suggestion if they have no recent workouts
        if (weeklyWorkouts === 0) {
          type = 'welcome';
          content = '欢迎回来，距离上次训练已有一段时间了';
        }

        if (type && shouldShowTip(type, null)) {
          setTipState({ type, content, lastShownAt: new Date().toISOString() });
          setIsVisible(true);
        }
      } catch (err) {
        console.error('Failed to check tip:', err);
      }
    };

    checkTip();
  }, []);

  const dismiss = () => {
    const today = getTodayDate();
    const storageKey = `${STORAGE_KEY_PREFIX}${today}`;
    localStorage.setItem(storageKey, JSON.stringify({
      type: tipState.type,
      dismissedAt: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  return {
    isVisible,
    tipState,
    dismiss,
  };
}
