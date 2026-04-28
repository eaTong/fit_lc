import client from './client';
import { Muscle, SuggestedMuscle } from '../types';

export interface ExerciseFormData {
  id?: number;
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
  description: string;
  steps: string;
  safetyNotes: string;
  commonMistakes: string;
  adjustmentNotes: string;
  exerciseType: string;
  variantType: string;
  status: string;
  muscles?: { muscleId: number; role: string }[];
}

export const adminApi = {
  async getExercises() {
    const { data } = await client.get('/admin/exercises');
    return data;
  },

  async createExercise(exercise: ExerciseFormData) {
    const { data } = await client.post('/admin/exercises', exercise);
    return data;
  },

  async updateExercise(id: number, exercise: ExerciseFormData) {
    const { data } = await client.put(`/admin/exercises/${id}`, exercise);
    return data;
  },

  async deleteExercise(id: number) {
    await client.delete(`/admin/exercises/${id}`);
  },

  async publishExercise(id: number) {
    const { data } = await client.patch(`/admin/exercises/${id}/publish`);
    return data;
  },

  async getMuscles() {
    const { data } = await client.get('/admin/muscles');
    return data;
  },

  async createMuscle(muscle: Omit<Muscle, 'id'>) {
    const { data } = await client.post('/admin/muscles', muscle);
    return data;
  },

  async updateMuscle(id: number, muscle: Partial<Muscle>) {
    const { data } = await client.put(`/admin/muscles/${id}`, muscle);
    return data;
  },

  async deleteMuscle(id: number) {
    await client.delete(`/admin/muscles/${id}`);
  },

  async generateMuscleDetails(name: string, group: string, parentMuscleName?: string) {
    const { data } = await client.post('/admin/muscles/generate', { name, group, parentMuscleName });
    return data;
  },

  async generateExerciseDetails(name: string, category: string, equipment: string, difficulty: string, targetMuscles?: SuggestedMuscle[]) {
    const { data } = await client.post('/admin/exercises/generate', { name, category, equipment, difficulty, targetMuscles });
    return data;
  },
};