import { useState } from 'react';
import type { WeeklyStats } from '../api/records';
import KeyChangesHighlight from './KeyChangesHighlight';
import type { ChangeItem } from '../api/records';

interface AIInsightSummaryProps {
  stats: WeeklyStats;
  changes: ChangeItem[];
  isLoading?: boolean;
}

export default function AIInsightSummary({ stats, changes, isLoading }: AIInsightSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-3"></div>
        <div className="h-4 bg-white/10 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>
    );
  }

  const generateSummary = (): string => {
    const { weeklyWorkouts, totalVolume } = stats;

    if (weeklyWorkouts === 0) {
      return '本周还没有训练记录，开始动起来吧！';
    }

    let summary = `本周训练${weeklyWorkouts}次`;
    if (totalVolume > 0) {
      summary += `，累计训练量${totalVolume.toLocaleString()}kg`;
    }
    if (changes.length > 0) {
      const topChange = changes[0];
      const diff = topChange.currentValue - topChange.previousValue;
      if (diff > 0) {
        summary += `，${topChange.name}重量提升${diff.toFixed(1)}kg`;
      }
    }
    summary += '。';

    return summary;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading text-lg text-text-primary flex items-center gap-2">
            <span>📊</span>
            <span>AI 智能总结</span>
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-accent-orange hover:text-accent-red transition-colors"
          >
            {isExpanded ? '收起详情 ▲' : '查看详情 ▼'}
          </button>
        </div>

        <p className="text-text-secondary leading-relaxed">{generateSummary()}</p>
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-text-muted text-xs mb-1">本周训练</p>
              <p className="text-2xl font-bold text-accent-orange">{stats.weeklyWorkouts}次</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-text-muted text-xs mb-1">本月训练</p>
              <p className="text-2xl font-bold text-accent-orange">{stats.monthlyWorkouts}次</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-text-muted text-xs mb-1">累计训练量</p>
              <p className="text-2xl font-bold text-accent-orange">
                {stats.totalVolume > 0 ? `${stats.totalVolume.toLocaleString()}kg` : '-'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-text-muted text-xs mb-1">训练天数</p>
              <p className="text-2xl font-bold text-accent-orange">{stats.workoutDays}天</p>
            </div>
          </div>

          <KeyChangesHighlight changes={changes} />
        </div>
      )}
    </div>
  );
}
