import client from './client';

export interface ConversionGuide {
  '变体'?: string;
  '替代动作'?: string;
  '降级选项'?: string;
}

export interface Exercise {
  id: number;
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
  description: string | null;
  adjustmentNotes: string | null;
  videoUrl: string | null;
  conversionGuide: ConversionGuide | null;
  isVariant: boolean;
  parentId: number | null;
  tags: string[] | null;
  status: string;
  steps: string | null;
  safetyNotes: string | null;
  commonMistakes: string | null;
  exerciseType: string | null;
  variantType: string | null;
  muscles?: ExerciseMuscle[];
  parent?: { id: number; name: string };
  variants?: ExerciseVariant[];
}

export interface ExerciseVariant {
  id: number;
  variantId: number;
  variantType: string | null;
  differenceNotes: string | null;
  variant: { id: number; name: string };
}

export interface ExerciseMuscle {
  id: number;
  exerciseId: number;
  muscleId: number;
  role: string;
  muscle: { id: number; name: string; group: string; parentId: number | null };
}

export const exercisesApi = {
  async getAll(filters?: {
    category?: string;
    equipment?: string;
    difficulty?: string;
    status?: string;
  }): Promise<{ exercises: Exercise[] }> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.equipment) params.append('equipment', filters.equipment);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.status) params.append('status', filters.status);
    const { data } = await client.get(`/exercises?${params.toString()}`);
    return data;
  },

  async getById(id: number): Promise<{ exercise: Exercise }> {
    const { data } = await client.get(`/exercises/${id}`);
    return data;
  },

  async create(exercise: {
    name: string;
    category: string;
    equipment: string;
    difficulty: string;
    description?: string;
    adjustmentNotes?: string;
    videoUrl?: string;
    isVariant?: boolean;
    parentId?: number;
    tags?: string[];
    status?: string;
    muscles?: { muscleId: number; role: string }[];
  }): Promise<{ exercise: Exercise }> {
    const res = await client.post('/exercises', exercise);
    return res.data;
  },

  async update(id: number, exercise: {
    name?: string;
    category?: string;
    equipment?: string;
    difficulty?: string;
    description?: string;
    adjustmentNotes?: string;
    videoUrl?: string;
    tags?: string[];
    status?: string;
    muscles?: { muscleId: number; role: string }[];
  }): Promise<{ exercise: Exercise }> {
    const res = await client.put(`/exercises/${id}`, exercise);
    return res.data;
  },

  async delete(id: number): Promise<{ success: boolean }> {
    const res = await client.delete(`/exercises/${id}`);
    return res.data;
  },
};