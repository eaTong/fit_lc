import { workoutRepository } from '../repositories/workoutRepository';
import { measurementRepository } from '../repositories/measurementRepository';

export const saveService = {
  async saveWorkout(userId: number, date: string, exercises: { name: string; sets?: number; reps?: number; weight?: number; duration?: number; distance?: number }[]) {
    const workout = await workoutRepository.createWithExercises(userId, date, exercises);

    return {
      id: workout.id,
      date,
      exercises,
      message: `已保存：${exercises.map(e => e.name).join('、')}`
    };
  },

  async saveMeasurement(userId: number, date: string, measurements: { body_part: string; value: number }[]) {
    if (userId === undefined) {
      throw new Error(`保存围度失败：无效的 userId=${userId}`);
    }

    // 解析日期
    let dateObj: Date;
    if (date.includes('T')) {
      dateObj = new Date(date);
    } else {
      const [year, month, day] = date.split('-').map(Number);
      const now = new Date();
      dateObj = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
    }

    // 转换格式：body_part -> bodyPart
    const items = measurements
      .filter(m => m && m.body_part !== undefined && m.value !== undefined)
      .map(m => ({
        bodyPart: m.body_part,
        value: m.value
      }));

    // Repository handles atomic creation with nested items
    const measurement = await measurementRepository.createWithItems(userId, dateObj.toISOString(), items);

    return {
      id: measurement.id,
      date,
      measurements,
      message: `已保存：${measurements.map(m => `${m.body_part} ${m.value}cm`).join('，')}`
    };
  }
};