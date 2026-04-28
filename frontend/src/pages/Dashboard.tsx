// frontend/src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecordsStore } from '../stores/recordsStore';
import { recordsApi, type WeeklyStats } from '../api/records';
import StatCard from '../components/dashboard/StatCard';
import RecentWorkoutItem from '../components/dashboard/RecentWorkoutItem';
import KeyMeasurementsPanel from '../components/dashboard/KeyMeasurementsPanel';
import Card from '../components/ui/Card';

const defaultStats: WeeklyStats = {
  weeklyWorkouts: 0,
  monthlyWorkouts: 0,
  totalVolume: 0,
  workoutDays: 0,
};

export default function Dashboard() {
  const { recentWorkouts, latestMeasurement, fetchWorkouts, fetchMeasurements, isLoading } = useRecordsStore();
  const [stats, setStats] = useState<WeeklyStats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);

  useEffect(() => {
    fetchWorkouts();
    fetchMeasurements();

    recordsApi
      .getStats()
      .then((data) => setStats(data.weekly))
      .catch((err) => {
        console.error('Failed to fetch stats:', err);
        setStatsError(true);
      })
      .finally(() => setLoading(false));
  }, [fetchWorkouts, fetchMeasurements]);

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">看板</h1>
        <Link
          to="/chat"
          className="px-4 py-2 bg-accent-orange text-white font-heading font-medium
            border-2 border-accent-orange hover:bg-accent-red hover:border-accent-red
            transition-all duration-150"
        >
          开始训练
        </Link>
      </div>

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

      {/* Stats Error Message */}
      {statsError && <p className="text-accent-red text-sm mb-4">数据加载失败，请刷新页面</p>}

      {/* Two-column lower section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Key Measurements */}
        <KeyMeasurementsPanel measurement={latestMeasurement} />
      </div>
    </div>
  );
}