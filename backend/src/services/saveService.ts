import prisma from '../lib/prisma';
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

    // Use Prisma transaction to ensure atomicity
    const measurement = await prisma.$transaction(async (tx) => {
      const newMeasurement = await tx.bodyMeasurement.create({
        data: {
          userId,
          date: new Date(date)
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