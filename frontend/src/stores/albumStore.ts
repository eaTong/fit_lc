import { create } from 'zustand';
import { albumApi, AlbumPhoto } from '../api/album';

interface AlbumState {
  photos: AlbumPhoto[];
  selectedYear: number;
  selectedMonth: number;
  loading: boolean;
  error: string | null;
  viewerPhoto: AlbumPhoto | null;
  setMonth: (year: number, month: number) => void;
  loadPhotos: () => Promise<void>;
  deletePhoto: (id: number) => Promise<void>;
  openViewer: (photo: AlbumPhoto) => void;
  closeViewer: () => void;
}

export const useAlbumStore = create<AlbumState>((set, get) => ({
  photos: [],
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth() + 1,
  loading: false,
  error: null,
  viewerPhoto: null,

  setMonth: (year, month) => {
    if (get().loading) return;
    set({ selectedYear: year, selectedMonth: month });
    get().loadPhotos();
  },

  loadPhotos: async () => {
    set({ loading: true, error: null });
    try {
      const { selectedYear, selectedMonth } = get();
      const photos = await albumApi.getPhotosByMonth(selectedYear, selectedMonth);
      set({ photos, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deletePhoto: async (id) => {
    set({ loading: true, error: null });
    try {
      await albumApi.deletePhoto(id);
      set((state) => ({
        photos: state.photos.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  openViewer: (photo) => set({ viewerPhoto: photo }),
  closeViewer: () => set({ viewerPhoto: null }),
}));