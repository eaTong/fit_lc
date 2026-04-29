import { useEffect, useState } from 'react';

interface FirstTimeCelebrationProps {
  show: boolean;
  onComplete?: () => void;
}

export default function FirstTimeCelebration({ show, onComplete }: FirstTimeCelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <div className="animate-bounce">
          <span className="text-6xl">🎉</span>
        </div>
        <h2 className="font-heading text-2xl font-bold text-accent-orange mt-4 animate-pulse">
          恭喜完成首次训练！
        </h2>
        <p className="text-text-secondary mt-2">坚持记录，你就是最棒的！</p>
      </div>
    </div>
  );
}
