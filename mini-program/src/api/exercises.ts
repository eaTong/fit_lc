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
  const queryParams: Record<string, string> = {};
  if (params) {
    if (params.category) queryParams.category = params.category;
    if (params.equipment) queryParams.equipment = params.equipment;
    if (params.difficulty) queryParams.difficulty = params.difficulty;
    if (params.page) queryParams.page = String(params.page);
    if (params.pageSize) queryParams.pageSize = String(params.pageSize);
  }
  return request<{ list: Exercise[]; total: number }>({
    url: '/exercises',
    params: queryParams
  });
}

export async function getExerciseDetail(id: number) {
  return request<Exercise>({
    url: `/exercises/${id}`
  });
}