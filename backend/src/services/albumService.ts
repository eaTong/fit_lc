import prisma from '../config/prisma';
import { albumRepository } from '../repositories/albumRepository';

export const albumService = {
  async syncPhotosFromMessage(userId: number, imageUrls: string[], chatMessageId: number) {
    const photos = imageUrls.map((url) => ({
      userId,
      ossUrl: url,
      chatMessageId,
    }));
    await prisma.albumPhoto.createMany({ data: photos });
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
    const result = await albumRepository.softDelete(photoId, userId);
    if (!result) {
      throw new Error('Photo not found');
    }
    return { success: true };
  },

  async getAllPhotos(userId: number) {
    return albumRepository.findByUserAll(userId);
  },
};