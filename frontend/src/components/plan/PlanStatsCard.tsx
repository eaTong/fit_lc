import Card from '../ui/Card';
import type { ExecutionStats } from '../../types';

interface Props {
  stats: ExecutionStats;
  planName?: string;
}

export default function PlanStatsCard({ stats, planName }: Props) {
  return (
    <Card className="p-6">
      {planName && (
        <h3 className="font-medium text-lg mb-4">{planName}</h3>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-primary-secondary rounded">
          <div className="text-3xl font-bold text-accent-primary">
            {Math.round(stats.completionRate)}%
          </div>
          <div className="text-sm text-text-secondary mt-1">完成率</div>
        </div>
        <div className="text-center p-4 bg-primary-secondary rounded">
          <div className="text-3xl font-bold">
            {stats.completed}/{stats.total}
          </div>
          <div className="text-sm text-text-secondary mt-1">已完成/总</div>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm">
        <span className="text-text-secondary">
          跳过: <span className="text-text-muted">{stats.skipped}</span>
        </span>
        <span className="text-text-secondary">
          待完成: <span className="text-text-muted">{stats.pending}</span>
        </span>
      </div>

      {stats.suggestions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-2">建议</h4>
          <ul className="space-y-1">
            {stats.suggestions.map((s, i) => (
              <li key={i} className="text-sm text-text-secondary">
                • {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}