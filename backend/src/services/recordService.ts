import { workoutRepository } from '../repositories/workoutRepository';
import { measurementRepository } from '../repositories/measurementRepository';
import { statsRepository } from '../repositories/statsRepository';

export const recordService = {
  // Workout queries
  async getWorkouts(userId: number, startDate?: string, endDate?: string) {
    return workoutRepository.findByUserAndDateRange(userId, startDate, endDate);
  },

  async getWorkout(id: number, userId: number) {
    return workoutRepository.findById(id, userId);
  },

  async deleteWorkout(id: number, userId: number) {
    const workout = await workoutRepository.findById(id, userId);
    if (!workout) {
      throw new Error('训练记录不存在');
    }
    return workoutRepository.softDelete(id);
  },

  async restoreWorkout(id: number, userId: number) {
    const workout = await workoutRepository.findById(id, userId);
    if (!workout) {
      throw new Error('训练记录不存在');
    }
    return workoutRepository.restore(id);
  },

  // Measurement queries
  async getMeasurements(userId: number, startDate?: string, endDate?: string) {
    return measurementRepository.findByUserAndDateRange(userId, startDate, endDate);
  },

  async getMeasurement(id: number, userId: number) {
    return measurementRepository.findById(id, userId);
  },

  async getMeasurementByDate(userId: number, date: string) {
    return measurementRepository.findByDate(userId, date);
  },

  async createMeasurementWithItems(userId: number, date: string, items: { bodyPart: string; value: number }[]) {
    return measurementRepository.createWithItems(userId, date, items);
  },

  async deleteMeasurement(id: number, userId: number) {
    const measurement = await measurementRepository.findById(id, userId);
    if (!measurement) {
      throw new Error('围度记录不存在');
    }
    return measurementRepository.softDelete(id);
  },

  async restoreMeasurement(id: number, userId: number) {
    const measurement = await measurementRepository.findById(id, userId);
    if (!measurement) {
      throw new Error('围度记录不存在');
    }
    return measurementRepository.restore(id);
  },

  async upsertMeasurementItems(measurementId: number, items: { bodyPart: string; value: number }[]) {
    return measurementRepository.upsertItems(measurementId, items);
  },

  // Stats
  async getStats(userId: number) {
    return statsRepository.getStats(userId);
  }
};