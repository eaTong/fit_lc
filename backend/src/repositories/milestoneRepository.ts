import prisma from '../lib/prisma';

export const milestoneRepository = {
  async create(data: {
    code: string;
    name: string;
    description: string;
    iconUrl?: string;
    category: string;
    metricType: string;
    threshold: number;
    tier?: number;
    points?: number;
  }) {
    return prisma.milestone.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        iconUrl: data.iconUrl,
        category: data.category,
        metricType: data.metricType,
        threshold: data.threshold,
        tier: data.tier ?? 1,
        points: data.points ?? 0,
      },
    });
  },

  async findById(id: number) {
    return prisma.milestone.findUnique({
      where: { id },
      include: { userMilestones: true },
    });
  },

  async findByCode(code: string) {
    return prisma.milestone.findUnique({
      where: { code },
    });
  },

  async findAll() {
    return prisma.milestone.findMany({
      orderBy: { tier: 'asc' },
    });
  },

  async findByCategory(category: string) {
    return prisma.milestone.findMany({
      where: { category },
      orderBy: { threshold: 'asc' },
    });
  },

  async findByMetricType(metricType: string) {
    return prisma.milestone.findMany({
      where: { metricType },
    });
  },

  async update(id: number, data: Partial<{
    name: string;
    description: string;
    iconUrl: string;
    threshold: number;
    tier: number;
    points: number;
  }>) {
    return prisma.milestone.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.milestone.delete({
      where: { id },
    });
  },
};
