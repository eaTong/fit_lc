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

  /**
   * 按创建时间倒序分页获取照片
   * @param userId 用户ID
   * @param cursor 上次查询的最后一条 createdAt，null 表示首次查询
   * @param limit 每页数量
   */
  async findByUserPaginated(userId: number, cursor: string | null, limit: number = 50) {
    const where = {
      userId,
      deletedAt: null,
      ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
    };

    const photos = await prisma.albumPhoto.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit + 1, // 多取一条判断是否有更多
    });

    const hasMore = photos.length > limit;
    const items = hasMore ? photos.slice(0, limit) : photos;
    const nextCursor = hasMore ? items[items.length - 1].createdAt.toISOString() : null;

    return {
      photos: items,
      nextCursor,
      hasMore,
    };
  },
};