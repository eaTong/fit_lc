import { create } from 'zustand';
import { albumApi } from '../api/album';
import type { AlbumPhoto, PhotosByMonth } from '../api/album';

interface AlbumState {
  photosByMonth: PhotosByMonth;
  loading: boolean;
  error: string | null;
  viewerPhoto: AlbumPhoto | null;
  loadPhotos: () => Promise<void>;
  deletePhoto: (id: number) => Promise<void>;
  openViewer: (photo: AlbumPhoto) => void;
  closeViewer: () => void;
}

export const useAlbumStore = create<AlbumState>((set) => ({
  photosByMonth: {},
  loading: false,
  error: null,
  viewerPhoto: null,

  loadPhotos: async () => {
    set({ loading: true, error: null });
    try {
      const photosByMonth = await albumApi.getAllPhotos();
      set({ photosByMonth, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deletePhoto: async (id) => {
    // Optimistically remove from local state
    set((state) => {
      const newPhotosByMonth: PhotosByMonth = {};
      for (const [month, photos] of Object.entries(state.photosByMonth)) {
        const filtered = photos.filter((p) => p.id !== id);
        if (filtered.length > 0) newPhotosByMonth[month] = filtered;
      }
      return { photosByMonth: newPhotosByMonth, loading: false, viewerPhoto: null };
    });
    try {
      await albumApi.deletePhoto(id);
    } catch (err: any) {
      // Reload on failure to restore state
      const photosByMonth = await albumApi.getAllPhotos();
      set({ photosByMonth, error: err.message });
    }
  },

  openViewer: (photo) => set({ viewerPhoto: photo }),
  closeViewer: () => set({ viewerPhoto: null }),
}));