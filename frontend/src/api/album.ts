import client from './client';

export interface AlbumPhoto {
  id: number;
  ossUrl: string;
  thumbnailUrl?: string;
  chatMessageId?: number;
  createdAt: string;
}

export type PhotosByMonth = Record<string, AlbumPhoto[]>;

export const albumApi = {
  async getPhotosByMonth(year: number, month: number): Promise<AlbumPhoto[]> {
    const { data } = await client.get<{ data: AlbumPhoto[] }>('/album/photos', {
      params: { year, month },
    });
    return data.data;
  },

  async getAllPhotos(): Promise<PhotosByMonth> {
    const { data } = await client.get<{ data: PhotosByMonth }>('/album/photos');
    return data.data;
  },

  async deletePhoto(id: number): Promise<void> {
    await client.delete(`/album/photos/${id}`);
  },
};