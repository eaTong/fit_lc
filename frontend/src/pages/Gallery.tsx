import { PhotoViewer } from '@/components/PhotoViewer';
import { useAlbumStore } from '@/stores/albumStore';
import { useEffect, useRef, useCallback } from 'react';

export default function Gallery() {
  const {
    photosByMonth,
    loading,
    loadingMore,
    error,
    hasMore,
    uploading,
    openViewer,
    deletePhoto,
    loadPhotos,
    loadMore,
    uploadPhoto,
  } = useAlbumStore();

  const loaded = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Initial load
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    loadPhotos();
  }, [loadPhotos]);

  // Set up intersection observer for infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loadingMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loadingMore, loading, loadMore]
  );

  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      });
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

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
      {/* Upload section */}
      <div className="mb-4 flex items-center gap-3">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          id="photo-upload"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              await uploadPhoto(file);
              e.target.value = '';
            }
          }}
        />
        <label
          htmlFor="photo-upload"
          className="px-4 py-2 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600 transition-colors"
        >
          {uploading ? '上传中...' : '上传照片'}
        </label>
        {uploading && <div className="text-text-secondary text-sm">上传中...</div>}
      </div>

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

      {/* Loading trigger / loading indicator */}
      <div ref={loadMoreRef} className="py-4 text-center">
        {loadingMore && <div className="text-text-secondary">加载更多...</div>}
        {!hasMore && monthKeys.length > 0 && (
          <div className="text-text-muted text-sm">没有更多照片了</div>
        )}
      </div>

      <PhotoViewer />
    </div>
  );
}