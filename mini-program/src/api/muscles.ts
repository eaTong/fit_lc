import { request } from './request';

export interface Muscle {
  id: number;
  name: string;
  group: string;
  parentId: number | null;
  origin?: string;
  insertion?: string;
  function?: string;
  trainingTips?: string;
  children?: Muscle[];
}

export async function getMuscles() {
  return request<Muscle[]>({
    url: '/muscles'
  });
}

export async function getMuscleDetail(id: number) {
  return request<Muscle>({
    url: `/muscles/${id}`
  });
}