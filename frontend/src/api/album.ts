import client from './client';

export interface AlbumPhoto {
  id: number;
  ossUrl: string;
  thumbnailUrl?: string;
  chatMessageId?: number;
  createdAt: string;
}

export type PhotosByMonth = Record<string, AlbumPhoto[]>;

export interface PaginatedPhotosResult {
  photos: AlbumPhoto[];
  nextCursor: string | null;
  hasMore: boolean;
}

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

  async getPhotosPaginated(cursor: string | null, limit: number = 50): Promise<PaginatedPhotosResult> {
    const { data } = await client.get<{ data: PaginatedPhotosResult }>('/album/photos/paginated', {
      params: { cursor, limit },
    });
    return data.data;
  },

  async uploadPhoto(file: File): Promise<AlbumPhoto> {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await client.post<{ success: boolean; data: AlbumPhoto }>('/album/photos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  async deletePhoto(id: number): Promise<void> {
    await client.delete(`/album/photos/${id}`);
  },
};