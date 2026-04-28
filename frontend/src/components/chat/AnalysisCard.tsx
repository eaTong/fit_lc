import Card from '../ui/Card';

interface AnalysisCardProps {
  completionRate: number;
  completed: number;
  skipped: number;
  pending: number;
  suggestions: string[];
}

export default function AnalysisCard({ completionRate, completed, skipped, suggestions }: AnalysisCardProps) {
  return (
    <Card variant="accent" className="mt-2">
      <p className="text-text-secondary text-sm mb-2">计划执行分析</p>
      <div className="flex gap-4 mb-2">
        <div className="text-center">
          <span className="text-2xl font-heading text-accent-orange">{completionRate}%</span>
          <p className="text-text-muted text-xs">完成率</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-heading text-green-500">{completed}</span>
          <p className="text-text-muted text-xs">已完成</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-heading text-yellow-500">{skipped}</span>
          <p className="text-text-muted text-xs">跳过</p>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-text-secondary text-xs mb-1">建议</p>
          {suggestions.map((s, i) => (
            <p key={i} className="text-text-primary text-sm">• {s}</p>
          ))}
        </div>
      )}
    </Card>
  );
}