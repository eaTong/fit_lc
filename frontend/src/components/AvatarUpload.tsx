import { useState } from 'react';
import Button from './ui/Button';

interface AvatarUploadProps {
  currentAvatar?: string;
  onUpload: (file: File) => Promise<string>;
}

export default function AvatarUpload({ currentAvatar, onUpload }: AvatarUploadProps) {
  const [preview, setPreview] = useState(currentAvatar);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await onUpload(file);
      setPreview(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 bg-primary-tertiary border-2 border-accent-orange flex items-center justify-center overflow-hidden">
        {preview ? (
          <img src={preview} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="font-heading text-4xl text-accent-orange">?</span>
        )}
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="avatar-upload" />
        <label htmlFor="avatar-upload">
          <span className="cursor-pointer inline-block px-4 py-2 border-2 border-accent-orange text-accent-orange font-heading font-semibold uppercase text-sm hover:bg-primary-tertiary transition-colors">
            {loading ? '上传中...' : '上传头像'}
          </span>
        </label>
      </div>
    </div>
  );
}