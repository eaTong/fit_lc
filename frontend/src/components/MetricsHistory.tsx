import type { BodyMetric } from '../api/user';

interface MetricsHistoryProps {
  records: BodyMetric[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function MetricsHistory({ records, total, page, onPageChange }: MetricsHistoryProps) {
  if (records.length === 0) {
    return <p className="text-text-muted text-sm">暂无记录</p>;
  }

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <div className="space-y-2">
        {records.map((r) => (
          <div key={r.id} className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-muted text-sm">{r.date}</span>
            <div className="flex gap-4">
              <span className="text-text-primary">{r.weight} kg</span>
              {r.bodyFat && <span className="text-text-secondary">{r.bodyFat}%</span>}
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {page > 1 && (
            <button onClick={() => onPageChange(page - 1)} className="text-accent-orange text-sm">
              上一页
            </button>
          )}
          <span className="text-text-muted text-sm">{page} / {totalPages}</span>
          {page < totalPages && (
            <button onClick={() => onPageChange(page + 1)} className="text-accent-orange text-sm">
              下一页
            </button>
          )}
        </div>
      )}
    </div>
  );
}