import { PhotoViewer } from '@/components/PhotoViewer';
import { useAlbumStore } from '@/stores/albumStore';
import { useEffect, useRef } from 'react';

export default function Gallery() {
  const { photosByMonth, loading, error, openViewer, deletePhoto } = useAlbumStore();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    useAlbumStore.getState().loadPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full px-4 py-3">
        <div className="text-center text-text-secondary py-8">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full px-4 py-3">
        <div className="text-center text-red-500 py-8">{error}</div>
      </div>
    );
  }

  // Get sorted month keys (newest first)
  const monthKeys = Object.keys(photosByMonth).sort((a, b) => b.localeCompare(a));

  if (monthKeys.length === 0) {
    return (
      <div className="flex flex-col h-full px-4 py-3">
        <div className="text-center text-text-secondary py-8">暂无照片</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 py-3 overflow-y-auto">
      {monthKeys.map((monthKey) => {
        const [year, month] = monthKey.split('-');
        const photos = photosByMonth[monthKey];
        return (
          <div key={monthKey} className="mb-6">
            <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">
              {year}年{Number(month)}月
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square relative cursor-pointer"
                  onClick={() => openViewer(photo)}
                  onContextMenu={async (e) => {
                    e.preventDefault();
                    if (confirm('删除该照片?')) {
                      await deletePhoto(photo.id);
                    }
                  }}
                >
                  <img
                    src={photo.ossUrl}
                    alt="album"
                    className="w-full h-full object-cover rounded border border-border"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <PhotoViewer />
    </div>
  );
}