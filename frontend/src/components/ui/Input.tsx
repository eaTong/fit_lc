import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-text-secondary text-sm mb-1">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full bg-primary-secondary border-2 border-border rounded px-4 py-2
            text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-accent-orange
            transition-colors duration-150 ${className}`}
          {...props}
        />
        {error && <p className="text-accent-red text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;