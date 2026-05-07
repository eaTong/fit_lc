import prisma from '../config/prisma';

export const measurementRepository = {
  async create(userId: number, date: string) {
    return prisma.bodyMeasurement.create({
      data: {
        userId,
        date: new Date(date)
      }
    });
  },

  async createWithItems(userId: number, date: string, items: { bodyPart: string; value: number }[]) {
    return prisma.bodyMeasurement.create({
      data: {
        userId,
        date: new Date(date),
        items: {
          create: items.map(item => ({
            bodyPart: item.bodyPart,
            value: item.value
          }))
        }
      },
      include: {
        items: true
      }
    });
  },

  async findByDate(userId: number, date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.bodyMeasurement.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay
        },
        deletedAt: null
      },
      include: {
        items: true
      }
    });
  },

  async upsertItem(measurementId: number, bodyPart: string, value: number) {
    const existing = await prisma.measurementItem.findFirst({
      where: { measurementId, bodyPart }
    });

    if (existing) {
      return prisma.measurementItem.update({
        where: { id: existing.id },
        data: { value }
      });
    }

    return prisma.measurementItem.create({
      data: {
        measurementId,
        bodyPart,
        value
      }
    });
  },

  async upsertItems(measurementId: number, items: { bodyPart: string; value: number }[]) {
    return prisma.$transaction(async (tx) => {
      for (const item of items) {
        const existing = await tx.measurementItem.findFirst({
          where: { measurementId, bodyPart: item.bodyPart }
        });

        if (existing) {
          await tx.measurementItem.update({
            where: { id: existing.id },
            data: { value: item.value }
          });
        } else {
          await tx.measurementItem.create({
            data: {
              measurementId,
              bodyPart: item.bodyPart,
              value: item.value
            }
          });
        }
      }
    });
  },

  async addItem(measurementId: number, bodyPart: string, value: number) {
    if (bodyPart === undefined || value === undefined) {
      return null;
    }

    const measurement = await prisma.bodyMeasurement.findFirst({
      where: { id: measurementId, deletedAt: null }
    });
    if (!measurement) {
      throw new Error('围度记录不存在或已删除');
    }

    return prisma.measurementItem.create({
      data: {
        measurementId,
        bodyPart,
        value: value
      }
    });
  },

  async findByUserAndDateRange(userId: number, startDate?: string, endDate?: string) {
    const where: any = {
      userId,
      deletedAt: null
    };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.date.lte = end;
      }
    }

    return prisma.bodyMeasurement.findMany({
      where,
      include: {
        items: {
          select: {
            id: true,
            bodyPart: true,
            value: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });
  },

  async findById(id: number, userId: number) {
    return prisma.bodyMeasurement.findFirst({
      where: { id, userId, deletedAt: null },
      include: {
        items: true
      }
    });
  },

  async softDelete(id: number) {
    return prisma.bodyMeasurement.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  },

  async restore(id: number) {
    return prisma.bodyMeasurement.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
};