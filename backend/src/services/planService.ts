// @ts-nocheck
import { planRepository } from '../repositories/planRepository';
import { Decimal } from '@prisma/client/runtime/client';

interface UserProfile {
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
}

interface PlanExercise {
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
}

interface ExecutionData {
  userId?: number;
  user_id?: number;
  plan_exercise_id?: number;
  planExerciseId?: number;
  scheduled_date?: string;
  scheduledDate?: string;
  status?: string;
  completed_reps?: number;
  completedReps?: number;
  completed_weight?: number;
  completedWeight?: number;
  notes?: string;
}

export const planService = {
  async createPlan(userId: number, userProfile: UserProfile, exercises: PlanExercise[]) {
    const plan = await planRepository.createWithExercises(userId, userProfile, exercises);
    return plan.id;
  },

  async getPlan(planId: number, userId: number) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) {
      return null;
    }
    return plan;
  },

  async getUserPlans(userId: number) {
    const plans = await planRepository.findByUserId(userId);
    return plans;
  },

  async updatePlan(planId: number, userId: number, updates: Record<string, any>) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) {
      throw new Error('计划不存在');
    }
    return planRepository.update(planId, userId, updates);
  },

  async updatePlanExercise(exerciseId: number, planId: number, updates: Record<string, any>) {
    return planRepository.updateExercise(exerciseId, planId, updates);
  },

  async deletePlan(planId: number, userId: number) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) {
      throw new Error('计划不存在');
    }
    return planRepository.delete(planId, userId);
  },

  async activatePlan(planId: number, userId: number) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) {
      throw new Error('计划不存在');
    }
    return planRepository.update(planId, userId, { status: 'active' });
  },

  async adjustPlan(planId: number, userId: number, adjustment: Record<string, any>) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) {
      throw new Error('计划不存在');
    }

    const updates: Record<string, any> = {};

    if (adjustment.exercises) {
      for (const [exerciseId, newValues] of Object.entries(adjustment.exercises)) {
        await planRepository.updateExercise(parseInt(exerciseId), planId, newValues as Record<string, any>);
      }
    }

    if (adjustment.frequency) {
      updates.frequency = adjustment.frequency;
    }

    if (adjustment.goal) {
      updates.goal = adjustment.goal;
    }

    if (Object.keys(updates).length > 0) {
      await planRepository.update(planId, userId, updates);
    }

    return true;
  },

  async recordExecution(planId: number, executionData: ExecutionData) {
    const plan = await planRepository.findById(planId, executionData.userId || executionData.user_id || 0);
    if (!plan) {
      throw new Error('计划不存在');
    }

    const execution = {
      planId: planId,
      planExerciseId: executionData.plan_exercise_id || executionData.planExerciseId || 0,
      scheduledDate: executionData.scheduled_date || executionData.scheduledDate || new Date().toISOString().split('T')[0],
      status: executionData.status || 'completed',
      completedReps: executionData.completed_reps || executionData.completedReps,
      completedWeight: executionData.completed_weight || executionData.completedWeight,
      notes: executionData.notes
    };

    const result = await planRepository.recordExecution(execution);
    return result.id;
  },

  async getPlanAnalysis(planId: number, userId: number) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) {
      throw new Error('计划不存在');
    }

    const stats = await planRepository.getExecutionStats(planId);

    const completionRate = stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

    let suggestions: string[] = [];
    if (completionRate < 50) {
      suggestions.push('Consider reducing workout frequency or intensity');
    } else if (completionRate >= 80) {
      suggestions.push('Great progress! You may be ready for increased intensity');
    }

    return {
      planId,
      stats: {
        total: stats.total,
        completed: stats.completed,
        skipped: stats.skipped,
        pending: stats.pending,
        completionRate
      },
      exercises: plan.exercises.map(e => ({
        id: e.id,
        name: e.exerciseName,
        targetMuscles: e.targetMuscles,
        dayOfWeek: e.dayOfWeek,
        sets: e.sets,
        reps: e.reps,
        exerciseId: e.exerciseId
      })),
      suggestions
    };
  }
};