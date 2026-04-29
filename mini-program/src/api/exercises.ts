import { request } from './request';

export interface Exercise {
  id: number;
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
  description?: string;
  steps?: string;
  safetyNotes?: string;
  commonMistakes?: string;
  adjustmentNotes?: string;
  exerciseType?: string;
  conversionGuide?: any;
  tags?: string[];
}

export interface ExerciseListParams {
  category?: string;
  equipment?: string;
  difficulty?: string;
  page?: number;
  pageSize?: number;
}

export async function getExercises(params?: ExerciseListParams) {
  return request<{ list: Exercise[]; total: number }>({
    url: '/exercises',
    params: params as Record<string, string>
  });
}

export async function getExerciseDetail(id: number) {
  return request<Exercise>({
    url: `/exercises/${id}`
  });
}