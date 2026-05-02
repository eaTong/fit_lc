import prisma from '../config/prisma';

export const muscleRepository = {
  async findAll() {
    return prisma.muscle.findMany({
      orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }]
    });
  },

  async findByGroup(group: string) {
    return prisma.muscle.findMany({
      where: { group },
      orderBy: { sortOrder: 'asc' }
    });
  },

  async findById(id: number) {
    return prisma.muscle.findUnique({
      where: { id },
      include: { children: true }
    });
  },

  async getHierarchy() {
    const muscles = await prisma.muscle.findMany({
      orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }]
    });

    const groups = muscles.filter(m => m.parentId === null);
    const children = muscles.filter(m => m.parentId !== null);

    return groups.map(group => ({
      ...group,
      children: children.filter(c => c.parentId === group.id)
    }));
  },

  async create(data: { name: string; group: string; parentId?: number; sortOrder?: number; origin?: string; insertion?: string; function?: string; trainingTips?: string }) {
    return prisma.muscle.create({
      data: {
        name: data.name,
        group: data.group,
        parentId: data.parentId ?? null,
        sortOrder: data.sortOrder ?? 0,
        origin: data.origin,
        insertion: data.insertion,
        function: data.function,
        trainingTips: data.trainingTips,
      }
    });
  },

  async update(id: number, data: { name?: string; sortOrder?: number; origin?: string; insertion?: string; function?: string; trainingTips?: string }) {
    return prisma.muscle.update({
      where: { id },
      data: {
        name: data.name,
        sortOrder: data.sortOrder,
        origin: data.origin,
        insertion: data.insertion,
        function: data.function,
        trainingTips: data.trainingTips,
      }
    });
  },

  async delete(id: number) {
    return prisma.muscle.delete({
      where: { id }
    });
  }
};