import prisma from '../config/prisma';
import { workoutRepository } from '../repositories/workoutRepository';
import { measurementRepository } from '../repositories/measurementRepository';
import { Decimal } from 'decimal.js';

export const saveService = {
  async saveWorkout(userId, date, exercises) {
    // Use Prisma transaction to ensure atomicity
    const workout = await prisma.$transaction(async (tx) => {
      const newWorkout = await tx.workout.create({
        data: {
          userId,
          date: new Date(date)
        }
      });

      for (const exercise of exercises) {
        await tx.workoutExercise.create({
          data: {
            workoutId: newWorkout.id,
            exerciseName: exercise.name,
            sets: exercise.sets ?? null,
            reps: exercise.reps ?? null,
            weight: exercise.weight ? new Decimal(exercise.weight.toString()) : null,
            duration: exercise.duration ?? null,
            distance: exercise.distance ? new Decimal(exercise.distance.toString()) : null
          }
        });
      }

      return newWorkout;
    });

    return {
      id: workout.id,
      date,
      exercises,
      message: `已保存：${exercises.map(e => e.name).join('、')}`
    };
  },

  async saveMeasurement(userId, date, measurements) {
    // 防御：确保 userId 不是 undefined
    if (userId === undefined) {
      throw new Error(`保存围度失败：无效的 userId=${userId}`);
    }

    // 解析日期：如果只提供日期（YYYY-MM-DD），添加当前时间；如果提供完整datetime，直接使用
    let dateObj: Date;
    if (date.includes('T')) {
      // 完整datetime格式
      dateObj = new Date(date);
    } else {
      // 只有日期，补充分当前时间
      const [year, month, day] = date.split('-').map(Number);
      const now = new Date();
      dateObj = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
    }

    // Use Prisma transaction to ensure atomicity
    const measurement = await prisma.$transaction(async (tx) => {
      const newMeasurement = await tx.bodyMeasurement.create({
        data: {
          userId,
          date: dateObj
        }
      });

      for (const m of measurements) {
        // 过滤 undefined 值，只保存有效的测量项
        if (m && m.body_part !== undefined && m.value !== undefined) {
          await tx.measurementItem.create({
            data: {
              measurementId: newMeasurement.id,
              bodyPart: m.body_part,
              value: new Decimal(m.value.toString())
            }
          });
        }
      }

      return newMeasurement;
    });

    return {
      id: measurement.id,
      date,
      measurements,
      message: `已保存：${measurements.map(m => `${m.body_part} ${m.value}cm`).join('，')}`
    };
  }
};