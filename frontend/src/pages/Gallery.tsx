import { MonthPicker } from '@/components/MonthPicker';
import { PhotoGrid } from '@/components/PhotoGrid';
import { useAlbumStore } from '@/stores/albumStore';
import { useEffect } from 'react';
import SubPageLayout from '@/layouts/SubPageLayout';

export default function Gallery() {
  const { loadPhotos, selectedYear, selectedMonth } = useAlbumStore();

  useEffect(() => {
    useAlbumStore.getState().loadPhotos();
  }, []);

  return (
    <SubPageLayout title={`${selectedYear}年${selectedMonth}月`}>
      <div className="flex flex-col h-full">
        <div className="px-4 py-3">
          <MonthPicker />
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <PhotoGrid />
        </div>
      </div>
    </SubPageLayout>
  );
}