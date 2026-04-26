import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'blue';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-heading font-semibold uppercase tracking-wide transition-all duration-150';

  const variants = {
    primary: 'bg-accent-orange hover:bg-accent-red text-white border-2 border-accent-orange',
    secondary: 'bg-primary-tertiary hover:bg-border text-text-primary border-2 border-border',
    outline: 'bg-transparent hover:bg-primary-tertiary text-accent-orange border-2 border-accent-orange',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-600',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}