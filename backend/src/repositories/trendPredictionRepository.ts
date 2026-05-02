import prisma from '../config/prisma';
import { Decimal } from '@prisma/client/runtime/client';

export const trendPredictionRepository = {
  async upsert(userId: number, metricType: string, data: {
    modelType: string;
    slope: number;
    intercept: number;
    rSquared?: number;
    dataPoints: number;
    nextPredictedDate?: Date;
  }) {
    return prisma.trendPrediction.upsert({
      where: {
        userId_metricType: { userId, metricType }
      },
      create: {
        userId,
        metricType,
        modelType: data.modelType,
        slope: new Decimal(data.slope.toString()),
        intercept: new Decimal(data.intercept.toString()),
        rSquared: data.rSquared !== undefined ? new Decimal(data.rSquared.toString()) : null,
        dataPoints: data.dataPoints,
        lastUpdated: new Date(),
        nextPredictedDate: data.nextPredictedDate ?? null,
      },
      update: {
        modelType: data.modelType,
        slope: new Decimal(data.slope.toString()),
        intercept: new Decimal(data.intercept.toString()),
        rSquared: data.rSquared !== undefined ? new Decimal(data.rSquared.toString()) : null,
        dataPoints: data.dataPoints,
        lastUpdated: new Date(),
        nextPredictedDate: data.nextPredictedDate ?? null,
      },
    });
  },

  async findByUserId(userId: number) {
    return prisma.trendPrediction.findMany({
      where: { userId },
      orderBy: { metricType: 'asc' },
    });
  },

  async findByMetricType(userId: number, metricType: string) {
    return prisma.trendPrediction.findUnique({
      where: {
        userId_metricType: { userId, metricType }
      },
    });
  },

  async findById(id: number) {
    return prisma.trendPrediction.findUnique({
      where: { id },
    });
  },

  async delete(id: number) {
    return prisma.trendPrediction.delete({
      where: { id },
    });
  },

  async deleteByUserId(userId: number) {
    return prisma.trendPrediction.deleteMany({
      where: { userId },
    });
  },
};
