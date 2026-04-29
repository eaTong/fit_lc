import prisma from '../lib/prisma';

export const badgeRepository = {
  async create(data: {
    code: string;
    name: string;
    description: string;
    iconUrl?: string;
    category: string;
    conditionType: string;
    conditionValue: any;
    tier?: string;
    points?: number;
  }) {
    return prisma.badge.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        iconUrl: data.iconUrl,
        category: data.category,
        conditionType: data.conditionType,
        conditionValue: data.conditionValue,
        tier: data.tier ?? 'bronze',
        points: data.points ?? 0,
      },
    });
  },

  async findById(id: number) {
    return prisma.badge.findUnique({
      where: { id },
      include: { userBadges: true },
    });
  },

  async findByCode(code: string) {
    return prisma.badge.findUnique({
      where: { code },
    });
  },

  async findAll() {
    return prisma.badge.findMany({
      orderBy: { tier: 'asc' },
    });
  },

  async findByCategory(category: string) {
    return prisma.badge.findMany({
      where: { category },
      orderBy: { tier: 'asc' },
    });
  },

  async findByConditionType(conditionType: string) {
    return prisma.badge.findMany({
      where: { conditionType },
    });
  },

  async update(id: number, data: Partial<{
    name: string;
    description: string;
    iconUrl: string;
    tier: string;
    points: number;
  }>) {
    return prisma.badge.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.badge.delete({
      where: { id },
    });
  },
};
