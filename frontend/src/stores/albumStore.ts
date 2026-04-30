import { create } from 'zustand';
import { albumApi, AlbumPhoto, PhotosByMonth } from '../api/album';

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
    set({ loading: true, error: null });
    try {
      await albumApi.deletePhoto(id);
      // Reload all photos after deletion
      const photosByMonth = await albumApi.getAllPhotos();
      set({ photosByMonth, loading: false, viewerPhoto: null });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  openViewer: (photo) => set({ viewerPhoto: photo }),
  closeViewer: () => set({ viewerPhoto: null }),
}));