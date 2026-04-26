import { HTMLAttributes, ReactNode } from 'react';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  className = '',
  ...props
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div
        className={`relative bg-primary-secondary border-2 border-border p-6 w-full ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {title && (
          <h2 className="font-heading text-xl font-semibold mb-4">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}