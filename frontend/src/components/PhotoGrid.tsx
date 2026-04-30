import { useAlbumStore } from '@/stores/albumStore';
import { PhotoViewer } from './PhotoViewer';

export function PhotoGrid() {
  const { photos, loading, openViewer, deletePhoto } = useAlbumStore();

  if (loading) {
    return <div className="text-center text-text-secondary py-8">加载中...</div>;
  }

  if (photos.length === 0) {
    return <div className="text-center text-text-secondary py-8">本月暂无照片</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square relative cursor-pointer"
            onClick={() => openViewer(photo)}
            onContextMenu={(e) => {
              e.preventDefault();
              if (confirm('删除该照片?')) {
                deletePhoto(photo.id);
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
      <PhotoViewer />
    </>
  );
}