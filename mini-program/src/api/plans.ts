import { request } from './request';

export interface PlanExercise {
  id: number;
  exerciseId: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  dayOfWeek: number;
}

export interface Plan {
  id: number;
  name: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  startDate?: string;
  exercises: PlanExercise[];
  createdAt: string;
}

export async function getPlans() {
  return request<Plan[]>({
    url: '/plans'
  });
}

export async function getPlanDetail(id: number) {
  return request<Plan>({
    url: `/plans/${id}`
  });
}

export async function activatePlan(id: number) {
  return request({
    url: `/plans/${id}/activate`,
    method: 'POST'
  });
}

export async function executePlan(planId: number, data: { completedExerciseIds: number[] }) {
  return request({
    url: `/plans/${planId}/executions`,
    method: 'POST',
    data
  });
}