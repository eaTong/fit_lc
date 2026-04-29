import { triggerEventRepository } from '../repositories/triggerEventRepository';

export const triggerService = {
  async shouldTrigger(userId: number, triggerType: string, triggerKey: string): Promise<boolean> {
    const hasTriggered = await triggerEventRepository.hasTriggeredToday(userId, triggerType, triggerKey);
    return !hasTriggered;
  },

  async recordAndMaybeTrigger(
    userId: number,
    triggerType: string,
    triggerKey: string,
    payload?: any
  ): Promise<{ triggered: boolean; event?: any }> {
    const event = await triggerEventRepository.record(userId, triggerType, triggerKey, payload);

    if (event) {
      return { triggered: true, event };
    }
    return { triggered: false };
  },

  async getEligibleTriggers(userId: number, triggerType?: string) {
    if (triggerType) {
      return triggerEventRepository.findByTriggerType(userId, triggerType);
    }
    return triggerEventRepository.findByUserId(userId);
  },

  async getTriggerHistory(userId: number, limit: number = 100) {
    return triggerEventRepository.findByUserId(userId, limit);
  },

  async deleteTrigger(id: number) {
    return triggerEventRepository.delete(id);
  },

  async cleanupOldTriggers(daysToKeep: number = 30) {
    return triggerEventRepository.deleteOld(daysToKeep);
  },
};
