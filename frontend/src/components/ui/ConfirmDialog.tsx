import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative bg-primary-secondary border-2 border-border p-6 max-w-sm w-full mx-4">
        <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
        <p className="text-text-secondary mb-6">{message}</p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            取消
          </Button>
          <Button variant="primary" onClick={onConfirm} className="flex-1">
            确认
          </Button>
        </div>
      </div>
    </div>
  );
}
