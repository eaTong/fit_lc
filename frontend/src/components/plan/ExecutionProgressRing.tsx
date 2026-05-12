interface Props {
  completed: number;
  total: number;
  size?: number;
}

export default function ExecutionProgressRing({ completed, total, size = 120 }: Props) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#333"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FF4500"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{completed}/{total}</span>
        <span className="text-sm text-text-secondary">完成</span>
      </div>
    </div>
  );
}