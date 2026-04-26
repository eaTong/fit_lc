import type { ChangeItem } from '../api/records';

interface KeyChangesHighlightProps {
  changes: ChangeItem[];
}

export default function KeyChangesHighlight({ changes }: KeyChangesHighlightProps) {
  if (changes.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-heading text-lg text-text-primary mb-2">🔥 重点变化</h3>
        <p className="text-text-secondary text-sm">本周暂无明显变化</p>
      </div>
    );
  }

  const getChangeValue = (change: ChangeItem): string => {
    const diff = change.currentValue - change.previousValue;
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)}${change.unit}`;
  };

  const getDirection = (change: ChangeItem): 'up' | 'down' | 'same' => {
    const diff = change.currentValue - change.previousValue;
    if (diff > 0) return 'up';
    if (diff < 0) return 'down';
    return 'same';
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="font-heading text-lg text-text-primary mb-3">🔥 重点变化</h3>
      <div className="space-y-2">
        {changes.map((change, index) => {
          const direction = getDirection(change);
          const isPositive = direction === 'up';
          const isNegative = direction === 'down';

          return (
            <div
              key={index}
              className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                isPositive ? 'bg-green-500/10' : isNegative ? 'bg-red-500/10' : 'bg-slate-500/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg ${
                    isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-slate-400'
                  }`}
                >
                  {direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→'}
                </span>
                <span className="text-text-primary font-medium">{change.name}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-text-secondary">
                  {change.previousValue} → {change.currentValue}
                </span>
                <span
                  className={`font-semibold ${
                    isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-slate-400'
                  }`}
                >
                  [{getChangeValue(change)}]
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
