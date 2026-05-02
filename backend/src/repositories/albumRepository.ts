import prisma from '../config/prisma';

export interface CreateAlbumPhotoInput {
  userId: number;
  ossUrl: string;
  thumbnailUrl?: string;
  chatMessageId?: number;
}

export const albumRepository = {
  async create(input: CreateAlbumPhotoInput) {
    return prisma.albumPhoto.create({ data: input });
  },

  async findByUserAndMonth(userId: number, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    return prisma.albumPhoto.findMany({
      where: {
        userId,
        deletedAt: null,
        createdAt: { gte: startDate, lte: endDate },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async softDelete(id: number, userId: number) {
    const result = await prisma.albumPhoto.updateMany({
      where: { id, userId },
      data: { deletedAt: new Date() },
    });
    if (result.count === 0) {
      return null;
    }
    return result;
  },

  async findById(id: number) {
    return prisma.albumPhoto.findUnique({ where: { id } });
  },

  async findByUserAll(userId: number) {
    return prisma.albumPhoto.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  },
};