import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecordsStore } from '../stores/recordsStore';
import { useAchievementStore } from '../stores/achievementStore';
import { recordsApi, type WeeklyStats } from '../api/records';
import type { CumulativeStats } from '../api/achievement';
import StatCard from '../components/dashboard/StatCard';
import RecentWorkoutItem from '../components/dashboard/RecentWorkoutItem';
import KeyMeasurementsPanel from '../components/dashboard/KeyMeasurementsPanel';
import PRCard from '../components/dashboard/PRCard';
import CumulativeStatsCard from '../components/dashboard/CumulativeStatsCard';
import Card from '../components/ui/Card';

const defaultStats: WeeklyStats = {
  weeklyWorkouts: 0,
  monthlyWorkouts: 0,
  totalVolume: 0,
  workoutDays: 0,
};

const defaultCumulative: CumulativeStats = {
  totalWorkouts: 0,
  totalVolume: 0,
  streakDays: 0,
  weeklyWorkouts: 0,
  weeklyVolume: 0,
};

export default function Profile() {
  const { recentWorkouts, latestMeasurement, fetchWorkouts, fetchMeasurements, isLoading } = useRecordsStore();
  const { personalRecords, stats: achievementStats, fetchPersonalRecords, fetchStats } = useAchievementStore();
  const [stats, setStats] = useState<WeeklyStats>(defaultStats);
  const [cumulativeStats, setCumulativeStats] = useState<CumulativeStats>(defaultCumulative);
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);

  useEffect(() => {
    fetchWorkouts();
    fetchMeasurements();
    fetchPersonalRecords();
    fetchStats();

    recordsApi
      .getStats()
      .then((data) => setStats(data.weekly))
      .catch((err) => {
        console.error('Failed to fetch stats:', err);
        setStatsError(true);
      })
      .finally(() => setLoading(false));
  }, [fetchWorkouts, fetchMeasurements, fetchPersonalRecords, fetchStats]);

  useEffect(() => {
    if (Object.keys(achievementStats).length > 0) {
      const totalWorkouts = achievementStats['total_workouts'];
      const totalVolume = achievementStats['total_volume'];
      const streakDays = achievementStats['streak_days'];

      setCumulativeStats({
        totalWorkouts: totalWorkouts?.value || 0,
        totalVolume: totalVolume?.value || 0,
        streakDays: streakDays?.value || 0,
        weeklyWorkouts: stats.weeklyWorkouts,
        weeklyVolume: stats.totalVolume,
      });
    }
  }, [achievementStats, stats]);

  return (
    <div className="px-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">我的</h1>
        <Link
          to="/chat"
          className="px-4 py-2 bg-accent-orange text-white font-heading font-medium
            border-2 border-accent-orange hover:bg-accent-red hover:border-accent-red
            transition-all duration-150"
        >
          开始训练
        </Link>
      </div>

      {/* Stats Error Message */}
      {statsError && <p className="text-accent-red text-sm mb-4">数据加载失败，请刷新页面</p>}

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="本周训练" value={(loading || isLoading) ? '—' : stats.weeklyWorkouts} unit="次" icon="🔥" />
        <StatCard title="本周训练日" value={(loading || isLoading) ? '—' : stats.workoutDays} unit="天" icon="📅" />
        <StatCard
          title="本周训练量"
          value={(loading || isLoading) ? '—' : Math.round(stats.totalVolume / 1000)}
          unit="吨"
          subtitle={!(loading || isLoading) ? `${stats.totalVolume.toLocaleString()} kg` : undefined}
          icon="🏋️"
        />
        <StatCard title="本月训练" value={(loading || isLoading) ? '—' : stats.monthlyWorkouts} unit="次" icon="📆" />
      </div>

      {/* Cumulative Stats Card */}
      <div className="mb-6">
        <CumulativeStatsCard stats={cumulativeStats} isLoading={loading} />
      </div>

      {/* 功能入口网格 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <Link
          to="/history"
          className="flex flex-col items-center gap-2 p-3 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-xl">📋</span>
          <div className="text-center">
            <div className="text-text-primary text-xs">训练历史</div>
          </div>
        </Link>

        <Link
          to="/trends"
          className="flex flex-col items-center gap-2 p-3 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-xl">📈</span>
          <div className="text-center">
            <div className="text-text-primary text-xs">趋势分析</div>
          </div>
        </Link>

        <Link
          to="/measurements"
          className="flex flex-col items-center gap-2 p-3 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-xl">📏</span>
          <div className="text-center">
            <div className="text-text-primary text-xs">围度记录</div>
          </div>
        </Link>

        <Link
          to="/plans"
          className="flex flex-col items-center gap-2 p-3 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-xl">🏋️</span>
          <div className="text-center">
            <div className="text-text-primary text-xs">训练计划</div>
          </div>
        </Link>
      </div>

      {/* Two-column lower section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Recent Workouts */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">最近训练</h2>
            <Link
              to="/history"
              className="text-accent-orange text-sm hover:text-accent-red transition-colors"
            >
              查看全部
            </Link>
          </div>
          {recentWorkouts.length === 0 ? (
            <p className="text-text-secondary text-center py-8">暂无训练记录</p>
          ) : (
            recentWorkouts.slice(0, 3).map((w) => <RecentWorkoutItem key={w.id} workout={w} />)
          )}
        </Card>

        {/* Right column: PR Card + Key Measurements */}
        <div className="space-y-6">
          <PRCard personalRecords={personalRecords} />
          <KeyMeasurementsPanel measurement={latestMeasurement} />
        </div>
      </div>

      {/* 快捷设置入口 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Link
          to="/settings"
          className="flex flex-col items-center gap-2 p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-2xl">⚙️</span>
          <div className="text-center">
            <div className="text-text-primary text-sm">设置</div>
          </div>
        </Link>

        <Link
          to="/security"
          className="flex flex-col items-center gap-2 p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-2xl">🔐</span>
          <div className="text-center">
            <div className="text-text-primary text-sm">安全</div>
          </div>
        </Link>

        <Link
          to="/badges"
          className="flex flex-col items-center gap-2 p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <span className="text-2xl">🏆</span>
          <div className="text-center">
            <div className="text-text-primary text-sm">徽章</div>
          </div>
        </Link>
      </div>

      {/* 打卡和相册入口 */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/calendar"
          className="block p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📅</span>
            <span className="text-text-primary font-semibold">连续打卡</span>
          </div>
          <div className="text-text-secondary text-sm">
            当前连续 {loading ? '—' : cumulativeStats.streakDays} 天
          </div>
        </Link>

        <Link
          to="/gallery"
          className="block p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🖼️</span>
              <span className="text-text-primary font-semibold">我的相册</span>
            </div>
            <span className="text-text-secondary">›</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
