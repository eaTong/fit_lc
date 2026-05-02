import { trendPredictionRepository } from '../repositories/trendPredictionRepository';
import prisma from '../config/prisma';

interface DataPoint {
  date: Date;
  value: number;
}

interface PredictionResult {
  metricType: string;
  modelType: string;
  slope: number;
  intercept: number;
  rSquared?: number;
  dataPoints: number;
  nextPredictedValue?: number;
  nextPredictedDate?: Date;
}

export const trendPredictionService = {
  async updatePrediction(userId: number, metricType: string, dataPoints: DataPoint[]): Promise<PredictionResult | null> {
    if (dataPoints.length < 3) {
      return null;
    }

    const sortedPoints = [...dataPoints].sort((a, b) => a.date.getTime() - b.date.getTime());

    const n = sortedPoints.length;
    const xValues = sortedPoints.map(p => p.date.getTime());
    const yValues = sortedPoints.map(p => p.value);

    const sumX = xValues.reduce((sum, x) => sum + x, 0);
    const sumY = yValues.reduce((sum, y) => sum + y, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0) {
      return null;
    }

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    const avgY = sumY / n;
    const ssTotal = yValues.reduce((sum, y) => sum + (y - avgY) ** 2, 0);
    const ssResidual = yValues.reduce((sum, y, i) => {
      const predicted = slope * xValues[i] + intercept;
      return sum + (y - predicted) ** 2;
    }, 0);
    const rSquared = ssTotal === 0 ? 1 : 1 - ssResidual / ssTotal;

    const avgInterval = (xValues[n - 1] - xValues[0]) / (n - 1);
    const lastDate = xValues[n - 1];
    const nextDate = new Date(lastDate + avgInterval);
    const nextPredictedValue = slope * nextDate.getTime() + intercept;

    await trendPredictionRepository.upsert(userId, metricType, {
      modelType: 'linear',
      slope,
      intercept,
      rSquared,
      dataPoints: n,
      nextPredictedDate: nextDate,
    });

    return {
      metricType,
      modelType: 'linear',
      slope,
      intercept,
      rSquared,
      dataPoints: n,
      nextPredictedValue,
      nextPredictedDate: nextDate,
    };
  },

  async getPrediction(userId: number, metricType: string) {
    const prediction = await trendPredictionRepository.findByMetricType(userId, metricType);
    if (!prediction) return null;

    return {
      metricType: prediction.metricType,
      modelType: prediction.modelType,
      slope: Number(prediction.slope),
      intercept: Number(prediction.intercept),
      rSquared: prediction.rSquared ? Number(prediction.rSquared) : undefined,
      dataPoints: prediction.dataPoints,
      lastUpdated: prediction.lastUpdated,
      nextPredictedDate: prediction.nextPredictedDate,
    };
  },

  async getAllPredictions(userId: number) {
    const predictions = await trendPredictionRepository.findByUserId(userId);
    return predictions.map(p => ({
      metricType: p.metricType,
      modelType: p.modelType,
      slope: Number(p.slope),
      intercept: Number(p.intercept),
      rSquared: p.rSquared ? Number(p.rSquared) : undefined,
      dataPoints: p.dataPoints,
      lastUpdated: p.lastUpdated,
    }));
  },

  async calculateBodyPartTrend(userId: number, bodyPart: string) {
    const measurements = await prisma.measurementItem.findMany({
      where: {
        measurement: { userId, deletedAt: null },
        bodyPart,
      },
      include: {
        measurement: { select: { date: true } },
      },
      orderBy: {
        measurement: { date: 'asc' },
      },
      take: 30,
    });

    if (measurements.length < 3) return null;

    const dataPoints: DataPoint[] = measurements.map(m => ({
      date: m.measurement.date,
      value: Number(m.value),
    }));

    return this.updatePrediction(userId, bodyPart, dataPoints);
  },
};
