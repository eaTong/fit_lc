import { useAlbumStore } from '@/stores/albumStore';
import { useEffect } from 'react';

export function PhotoViewer() {
  const { viewerPhoto, closeViewer } = useAlbumStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeViewer]);

  if (!viewerPhoto) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={closeViewer}
    >
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={closeViewer}
      >
        ✕
      </button>
      <img
        src={viewerPhoto.ossUrl}
        alt="full"
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}