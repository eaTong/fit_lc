import prisma from '../lib/prisma';

export const measurementRepository = {
  async create(userId: number, date: string) {
    return prisma.bodyMeasurement.create({
      data: {
        userId,
        date: new Date(date)
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
      where: { id, userId, deletedAt: null }
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