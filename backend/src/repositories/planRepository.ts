import prisma from '../config/prisma';
import { Decimal } from '@prisma/client/runtime/client';

export const planRepository = {
  async createWithExercises(userId: number, userProfile: {
    name?: string;
    goal: string;
    frequency: number;
    experience: string;
    equipment: string;
    conditions?: string;
    body_weight?: number;
    body_fat?: number;
    height?: number;
    duration_weeks: number;
  }, exercises: {
    dayOfWeek: number;
    exerciseId?: number | null;
    exerciseName: string;
    targetMuscles?: string | null;
    sets?: number;
    reps?: string;
    weight?: number;
    duration?: number;
    restSeconds?: number;
    orderIndex?: number;
  }[]) {
    return prisma.$transaction(async (tx) => {
      const plan = await tx.workoutPlan.create({
        data: {
          userId,
          name: userProfile.name,
          goal: userProfile.goal,
          frequency: userProfile.frequency,
          experience: userProfile.experience,
          equipment: userProfile.equipment,
          conditions: userProfile.conditions ?? null,
          bodyWeight: userProfile.body_weight ? new Decimal(userProfile.body_weight.toString()) : null,
          bodyFat: userProfile.body_fat ? new Decimal(userProfile.body_fat.toString()) : null,
          height: userProfile.height ? new Decimal(userProfile.height.toString()) : null,
          durationWeeks: userProfile.duration_weeks,
          status: 'draft'
        }
      });

      if (exercises && exercises.length > 0) {
        for (const exercise of exercises) {
          await tx.planExercise.create({
            data: {
              planId: plan.id,
              dayOfWeek: exercise.dayOfWeek,
              exerciseId: exercise.exerciseId ?? null,
              exerciseName: exercise.exerciseName,
              targetMuscles: exercise.targetMuscles ?? null,
              sets: exercise.sets ?? 3,
              reps: exercise.reps ?? '8-12',
              weight: exercise.weight ? new Decimal(exercise.weight.toString()) : null,
              duration: exercise.duration ?? null,
              restSeconds: exercise.restSeconds ?? 60,
              orderIndex: exercise.orderIndex ?? 0
            }
          });
        }
      }

      return plan;
    });
  },

  async create(userId: number, data: {
    name: string;
    goal: string;
    frequency: number;
    experience: string;
    equipment: string;
    conditions?: string;
    bodyWeight?: number;
    bodyFat?: number;
    height?: number;
    durationWeeks: number;
  }) {
    return prisma.workoutPlan.create({
      data: {
        userId,
        name: data.name,
        goal: data.goal,
        frequency: data.frequency,
        experience: data.experience,
        equipment: data.equipment,
        conditions: data.conditions ?? null,
        bodyWeight: data.bodyWeight ? new Decimal(data.bodyWeight.toString()) : null,
        bodyFat: data.bodyFat ? new Decimal(data.bodyFat.toString()) : null,
        height: data.height ? new Decimal(data.height.toString()) : null,
        durationWeeks: data.durationWeeks,
        status: 'draft'
      }
    });
  },

  async findByUserId(userId: number) {
    return prisma.workoutPlan.findMany({
      where: { userId },
      include: { exercises: true },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findActive(userId: number) {
    return prisma.workoutPlan.findFirst({
      where: { userId, status: 'active' }
    });
  },

  async findById(id: number) {
    return prisma.workoutPlan.findUnique({
      where: { id },
      include: {
        exercises: {
          orderBy: { orderIndex: 'asc' },
          include: { exercise: true }
        }
      }
    });
  },

  async update(id: number, userId: number, data: Partial<{
    name: string;
    goal: string;
    frequency: number;
    experience: string;
    equipment: string;
    conditions: string;
    bodyWeight: number;
    bodyFat: number;
    height: number;
    durationWeeks: number;
    status: string;
  }>) {
    const updateData: any = { ...data };
    if (data.bodyWeight !== undefined) {
      updateData.bodyWeight = new Decimal(data.bodyWeight.toString());
    }
    if (data.bodyFat !== undefined) {
      updateData.bodyFat = new Decimal(data.bodyFat.toString());
    }
    if (data.height !== undefined) {
      updateData.height = new Decimal(data.height.toString());
    }
    return prisma.workoutPlan.update({
      where: { id, userId },
      data: updateData
    });
  },

  async delete(id: number, userId: number) {
    return prisma.workoutPlan.deleteMany({
      where: { id, userId }
    });
  },

  async addExercise(planId: number, exercise: {
    dayOfWeek: number;
    exerciseId?: number | null;
    exerciseName: string;
    targetMuscles?: string | null;
    sets?: number;
    reps?: string;
    weight?: number;
    duration?: number;
    restSeconds?: number;
    orderIndex?: number;
  }) {
    return prisma.planExercise.create({
      data: {
        planId,
        dayOfWeek: exercise.dayOfWeek,
        exerciseId: exercise.exerciseId ?? null,
        exerciseName: exercise.exerciseName,
        targetMuscles: exercise.targetMuscles ?? null,
        sets: exercise.sets ?? 3,
        reps: exercise.reps ?? '8-12',
        weight: exercise.weight ? new Decimal(exercise.weight.toString()) : null,
        duration: exercise.duration ?? null,
        restSeconds: exercise.restSeconds ?? 60,
        orderIndex: exercise.orderIndex ?? 0
      }
    });
  },

  async recordExecution(data: {
    planId: number;
    planExerciseId: number;
    scheduledDate: string;
    completedReps?: number;
    completedWeight?: number;
    status: string;
    notes?: string;
  }) {
    return prisma.planExecution.create({
      data: {
        planId: data.planId,
        planExerciseId: data.planExerciseId,
        scheduledDate: new Date(data.scheduledDate),
        completedAt: data.status === 'completed' ? new Date() : null,
        completedReps: data.completedReps ?? null,
        completedWeight: data.completedWeight ? new Decimal(data.completedWeight.toString()) : null,
        status: data.status,
        notes: data.notes ?? null
      }
    });
  },

  async getExecutions(planId: number) {
    return prisma.planExecution.findMany({
      where: { planId },
      orderBy: { scheduledDate: 'desc' }
    });
  },

  async findExercisesByPlanId(planId: number) {
    return prisma.planExercise.findMany({
      where: { planId },
      orderBy: { orderIndex: 'asc' },
      include: { exercise: true }
    });
  },

  async updateExercise(exerciseId: number, planId: number, data: Partial<{
    exerciseId: number;
    exerciseName: string;
    targetMuscles: string;
    sets: number;
    reps: string;
    weight: number;
    duration: number;
    restSeconds: number;
    orderIndex: number;
  }>) {
    return prisma.planExercise.update({
      where: { id: exerciseId },
      data: {
        ...data,
        weight: data.weight !== undefined ? new Decimal(data.weight.toString()) : undefined
      }
    });
  },

  async deleteExercise(exerciseId: number, planId: number) {
    return prisma.planExercise.deleteMany({
      where: { id: exerciseId, planId }
    });
  },

  async getExecutionStats(planId: number) {
    const [total, completed, skipped, pending] = await Promise.all([
      prisma.planExecution.count({ where: { planId } }),
      prisma.planExecution.count({ where: { planId, status: 'completed' } }),
      prisma.planExecution.count({ where: { planId, status: 'skipped' } }),
      prisma.planExecution.count({ where: { planId, status: 'pending' } })
    ]);
    return { total, completed, skipped, pending };
  }
};