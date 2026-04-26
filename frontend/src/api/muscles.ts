import client from './client';

export interface Muscle {
  id: number;
  name: string;
  group: string;
  parentId: number | null;
  sortOrder: number;
  origin?: string;
  insertion?: string;
  function?: string;
  trainingTips?: string;
}

export interface MuscleGroup {
  id: number;
  name: string;
  group: string;
  parentId: null;
  sortOrder: number;
  origin?: string;
  insertion?: string;
  function?: string;
  trainingTips?: string;
  children: Muscle[];
}

export const musclesApi = {
  async getAll(): Promise<{ muscles: Muscle[] }> {
    const { data } = await client.get('/muscles');
    return data;
  },

  async getHierarchy(): Promise<{ hierarchy: MuscleGroup[] }> {
    const { data } = await client.get('/muscles/hierarchy');
    return data;
  },

  async getById(id: number): Promise<{ muscle: Muscle }> {
    const { data } = await client.get(`/muscles/${id}`);
    return data;
  },

  async create(data: { name: string; group: string; parentId?: number; sortOrder?: number; origin?: string; insertion?: string; function?: string; trainingTips?: string }): Promise<{ muscle: Muscle }> {
    const res = await client.post('/muscles', data);
    return res.data;
  },

  async update(id: number, data: { name?: string; origin?: string; insertion?: string; function?: string; trainingTips?: string; sortOrder?: number }): Promise<{ muscle: Muscle }> {
    const res = await client.put(`/muscles/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<{ success: boolean }> {
    const res = await client.delete(`/muscles/${id}`);
    return res.data;
  },
};