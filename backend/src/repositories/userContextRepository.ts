import prisma from '../config/prisma';

export const userContextRepository = {
  async create(userId: number) {
    return prisma.userContext.create({
      data: { userId }
    });
  },

  async getByUserId(userId: number) {
    return prisma.userContext.findUnique({
      where: { userId }
    });
  },

  async updateSnapshot(userId: number, profile: any, activePlan: any) {
    return prisma.userContext.update({
      where: { userId },
      data: {
        profileSnapshot: profile,
        activePlanName: activePlan?.name || null,
        activePlanStatus: activePlan?.status || null,
        lastWorkoutDate: profile.lastWorkoutDate ? new Date(profile.lastWorkoutDate) : null,
        lastMeasurementDate: profile.lastMeasurementDate ? new Date(profile.lastMeasurementDate) : null,
        totalWorkouts: profile.totalWorkouts || 0,
        totalMeasurements: profile.totalMeasurements || 0
      }
    });
  },

  async updateContextText(userId: number, contextText: string) {
    return prisma.userContext.update({
      where: { userId },
      data: { contextText }
    });
  }
};