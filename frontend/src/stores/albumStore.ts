import { create } from 'zustand';
import { albumApi } from '../api/album';
import type { AlbumPhoto, PaginatedPhotosResult } from '../api/album';

interface AlbumState {
  // 分页数据：按月份分组的照片
  photosByMonth: Record<string, AlbumPhoto[]>;
  // 分页状态
  cursor: string | null;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  uploading: boolean;
  error: string | null;
  viewerPhoto: AlbumPhoto | null;

  // 加载初始数据（50条）
  loadPhotos: () => Promise<void>;
  // 加载更多
  loadMore: () => Promise<void>;
  // 上传照片
  uploadPhoto: (file: File) => Promise<void>;
  // 删除照片
  deletePhoto: (id: number) => Promise<void>;
  openViewer: (photo: AlbumPhoto) => void;
  closeViewer: () => void;
}

/**
 * 将照片数组按月份分组
 */
function groupByMonth(photos: AlbumPhoto[]): Record<string, AlbumPhoto[]> {
  const grouped: Record<string, AlbumPhoto[]> = {};
  for (const photo of photos) {
    const date = new Date(photo.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(photo);
  }
  return grouped;
}

/**
 * 将新数据合并到现有月份分组中
 */
function mergePhotosByMonth(
  existing: Record<string, AlbumPhoto[]>,
  newPhotos: AlbumPhoto[]
): Record<string, AlbumPhoto[]> {
  const merged = { ...existing };
  for (const photo of newPhotos) {
    const date = new Date(photo.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!merged[key]) merged[key] = [];
    // 避免重复添加
    if (!merged[key].find((p) => p.id === photo.id)) {
      merged[key].push(photo);
    }
  }
  return merged;
}

export const useAlbumStore = create<AlbumState>((set, get) => ({
  photosByMonth: {},
  cursor: null,
  hasMore: true,
  loading: false,
  loadingMore: false,
  uploading: false,
  error: null,
  viewerPhoto: null,

  loadPhotos: async () => {
    set({ loading: true, error: null });
    try {
      const result: PaginatedPhotosResult = await albumApi.getPhotosPaginated(null, 50);
      const photosByMonth = groupByMonth(result.photos);

      set({
        photosByMonth,
        cursor: result.nextCursor,
        hasMore: result.hasMore,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  loadMore: async () => {
    const { cursor, hasMore, loadingMore, photosByMonth } = get();
    if (!hasMore || loadingMore) return;

    set({ loadingMore: true });
    try {
      const result = await albumApi.getPhotosPaginated(cursor, 50);
      const newPhotosByMonth = mergePhotosByMonth(photosByMonth, result.photos);

      set({
        photosByMonth: newPhotosByMonth,
        cursor: result.nextCursor,
        hasMore: result.hasMore,
        loadingMore: false,
      });
    } catch (err: any) {
      set({ error: err.message, loadingMore: false });
    }
  },

  uploadPhoto: async (file: File) => {
    set({ uploading: true, error: null });
    try {
      const photo = await albumApi.uploadPhoto(file);
      const date = new Date(photo.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      set((state) => ({
        photosByMonth: {
          ...state.photosByMonth,
          [key]: [photo, ...(state.photosByMonth[key] || [])],
        },
        uploading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, uploading: false });
    }
  },

  deletePhoto: async (id) => {
    // Optimistically remove from local state
    set((state) => {
      const newPhotosByMonth: Record<string, AlbumPhoto[]> = {};
      for (const [month, photos] of Object.entries(state.photosByMonth)) {
        const filtered = photos.filter((p) => p.id !== id);
        if (filtered.length > 0) newPhotosByMonth[month] = filtered;
      }
      return {
        photosByMonth: newPhotosByMonth,
        viewerPhoto: null,
      };
    });
    try {
      await albumApi.deletePhoto(id);
    } catch (err: any) {
      // Reload on failure to restore state
      set({ error: err.message });
    }
  },

  openViewer: (photo) => set({ viewerPhoto: photo }),
  closeViewer: () => set({ viewerPhoto: null }),
}));