import { useState, useEffect } from 'react';
import Button from './ui/Button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  initialValue?: string | null;
}

export default function ChatInput({ onSend, disabled, initialValue }: ChatInputProps) {
  const [input, setInput] = useState(initialValue || '');

  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 flex-1">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="输入健身记录或问题..."
        className="flex-1 bg-primary-secondary border-2 border-border rounded px-4 py-3
          text-text-primary placeholder:text-text-muted
          focus:outline-none focus:border-accent-orange
          transition-colors duration-150"
      />
      <Button type="submit" disabled={disabled || !input.trim()}>
        发送
      </Button>
    </form>
  );
}