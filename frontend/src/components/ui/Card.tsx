import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent';
}

export default function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-primary-secondary border-border',
    accent: 'bg-primary-secondary border-accent-orange shadow-[0_0_15px_rgba(255,69,0,0.2)]',
  };

  return (
    <div
      className={`border-2 ${variants[variant]} p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}