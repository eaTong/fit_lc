import { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';
import { uploadApi } from '../api/upload';

interface ChatInputProps {
  onSend: (message: string, imageUrls: string[]) => void;
  disabled?: boolean;
  initialValue?: string | null;
}

export default function ChatInput({ onSend, disabled, initialValue }: ChatInputProps) {
  const [input, setInput] = useState(initialValue || '');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
    }
  }, [initialValue]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('只支持 jpg、png、webp 格式的图片');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadApi.uploadImage(file);
      setImageUrls((prev) => [...prev, url]);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('图片上传失败，请重试');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || imageUrls.length > 0) && !disabled && !uploading) {
      onSend(input.trim(), imageUrls);
      setInput('');
      setImageUrls([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
      {/* Image previews */}
      {imageUrls.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {imageUrls.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-16 h-16 object-cover rounded border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 flex-1">
        {/* Image upload button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageSelect}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`flex items-center justify-center w-12 h-12 bg-primary-secondary border-2 border-border rounded cursor-pointer
            hover:border-accent-orange transition-colors
            ${uploading ? 'opacity-50 cursor-wait' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {uploading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <span className="text-xl">📷</span>
          )}
        </label>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled || uploading}
          placeholder="输入健身记录或问题..."
          className="flex-1 bg-primary-secondary border-2 border-border rounded px-4 py-3
            text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-accent-orange
            transition-colors duration-150"
        />
        <Button type="submit" disabled={disabled || !input.trim() && imageUrls.length === 0 || uploading}>
          发送
        </Button>
      </div>
    </form>
  );
}
