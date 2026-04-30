import { albumRepository } from '../repositories/albumRepository';

export const albumService = {
  async syncPhotosFromMessage(userId: number, imageUrls: string[], chatMessageId: number) {
    const photos = imageUrls.map((url) => ({
      userId,
      ossUrl: url,
      chatMessageId,
    }));
    await Promise.all(photos.map((p) => albumRepository.create(p)));
  },

  async getPhotosByMonth(userId: number, year: number, month: number) {
    return albumRepository.findByUserAndMonth(userId, year, month);
  },

  async deletePhoto(photoId: number, userId: number) {
    const photo = await albumRepository.findById(photoId);
    if (!photo || photo.userId !== userId) {
      throw new Error('Photo not found');
    }
    await albumRepository.softDelete(photoId, userId);
    return { success: true };
  },
};