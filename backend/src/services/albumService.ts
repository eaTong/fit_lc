import prisma from '../lib/prisma';
import { albumRepository } from '../repositories/albumRepository';

export const albumService = {
  async syncPhotosFromMessage(userId: number, imageUrls: string[], chatMessageId: number) {
    const photos = imageUrls.map((url) => ({
      userId,
      ossUrl: url,
      chatMessageId,
    }));
    await prisma.$transaction(async (tx) => {
      for (const photo of photos) {
        await tx.albumPhoto.create({ data: photo });
      }
    });
  },

  async getPhotosByMonth(userId: number, year: number, month: number) {
    return albumRepository.findByUserAndMonth(userId, year, month);
  },

  async deletePhoto(photoId: number, userId: number) {
    const photo = await albumRepository.findById(photoId);
    if (!photo) {
      throw new Error('Photo not found');
    }
    if (photo.userId !== userId) {
      throw new Error('Photo belongs to another user');
    }
    await albumRepository.softDelete(photoId, userId);
    return { success: true };
  },
};