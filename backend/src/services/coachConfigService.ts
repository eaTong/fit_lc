import prisma from '../config/prisma';

export interface CoachConfigData {
  enabled: boolean;
  reminderTime: string | null;
  maxDailyMessages: number;
}

export async function getCoachConfig(userId: number): Promise<CoachConfigData> {
  let config = await prisma.coachConfig.findUnique({
    where: { userId }
  });

  if (!config) {
    config = await prisma.coachConfig.create({
      data: {
        userId,
        enabled: true,
        reminderTime: '09:00',
        maxDailyMessages: 3
      }
    });
  }

  return {
    enabled: config.enabled,
    reminderTime: config.reminderTime,
    maxDailyMessages: config.maxDailyMessages
  };
}

export async function updateCoachConfig(
  userId: number,
  data: Partial<CoachConfigData>
): Promise<CoachConfigData> {
  const config = await prisma.coachConfig.upsert({
    where: { userId },
    create: {
      userId,
      enabled: data.enabled ?? true,
      reminderTime: data.reminderTime ?? '09:00',
      maxDailyMessages: data.maxDailyMessages ?? 3
    },
    update: {
      enabled: data.enabled,
      reminderTime: data.reminderTime,
      maxDailyMessages: data.maxDailyMessages
    }
  });

  return {
    enabled: config.enabled,
    reminderTime: config.reminderTime,
    maxDailyMessages: config.maxDailyMessages
  };
}