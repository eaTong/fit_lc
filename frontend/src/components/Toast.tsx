import { useToastStore } from '../stores/toastStore';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 border-2 min-w-[200px] max-w-[300px]
            animate-slide-in
            ${
              toast.type === 'success'
                ? 'bg-primary-secondary border-accent-primary text-text-primary'
                : toast.type === 'error'
                ? 'bg-primary-secondary border-red-600 text-red-500'
                : 'bg-primary-secondary border-border text-text-primary'
            }
          `}
          onClick={() => removeToast(toast.id)}
        >
          {toast.status && (
            <span className="inline-block px-2 py-0.5 mr-2 text-xs font-bold bg-red-600 text-white rounded">
              {toast.status}
            </span>
          )}
          {toast.message}
        </div>
      ))}
    </div>
  );
}
