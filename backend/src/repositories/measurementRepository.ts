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
      throw new Error('Measurement not found or has been deleted');
    }

    return prisma.measurementItem.create({
      data: {
        measurementId,
        bodyPart,
        value: value
      }
    });
  },

  async findByUserAndDateRange(userId: number, startDate: string, endDate: string) {
    return prisma.bodyMeasurement.findMany({
      where: {
        userId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        },
        deletedAt: null
      },
      include: {
        items: true
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