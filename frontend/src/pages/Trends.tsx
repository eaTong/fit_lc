import { useEffect, useState } from 'react';
import { useRecordsStore } from '../stores/recordsStore';
import { recordsApi, type WeeklyStats, type ChangeItem } from '../api/records';
import TrendChart from '../components/TrendChart';
import TabSwitcher from '../components/ui/TabSwitcher';
import DateRangePicker from '../components/ui/DateRangePicker';
import AIInsightSummary from '../components/AIInsightSummary';
import type { Workout, Measurement } from '../types';

const tabs = [
  { id: 'measurements', label: '围度趋势' },
  { id: 'workouts', label: '训练统计' },
];

// Default to last 90 days
const getDefaultDates = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 90);
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};

function processMeasurementData(measurements: Measurement[]) {
  const latest = measurements.slice(0, 30);
  return latest.reverse().map((m) => ({
    date: m.date,
    chest: m.items.find((i) => i.bodyPart === 'chest')?.value,
    waist: m.items.find((i) => i.bodyPart === 'waist')?.value,
    hips: m.items.find((i) => i.bodyPart === 'hips')?.value,
    biceps: m.items.find((i) => i.bodyPart === 'biceps')?.value,
  }));
}

function processWorkoutData(workouts: Workout[]) {
  const byWeek: Record<string, number> = {};
  workouts.forEach((w) => {
    const date = new Date(w.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const key = weekStart.toISOString().slice(0, 10);
    byWeek[key] = (byWeek[key] || 0) + 1;
  });

  return Object.entries(byWeek)
    .slice(-8)
    .map(([date, count]) => ({ date, count }));
}

const defaultStats: WeeklyStats = {
  weeklyWorkouts: 0,
  monthlyWorkouts: 0,
  totalVolume: 0,
  workoutDays: 0,
};

export default function Trends() {
  const { workouts, measurements, fetchWorkouts, fetchMeasurements } = useRecordsStore();
  const [activeTab, setActiveTab] = useState('measurements');
  const [dateRange, setDateRange] = useState(getDefaultDates());
  const [stats, setStats] = useState<WeeklyStats>(defaultStats);
  const [changes, setChanges] = useState<ChangeItem[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts(dateRange.start, dateRange.end);
    fetchMeasurements(dateRange.start, dateRange.end);
  }, [fetchWorkouts, fetchMeasurements, dateRange]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const data = await recordsApi.getStats();
        setStats(data.weekly);
        setChanges(data.changes);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setStats(defaultStats);
        setChanges([]);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const measurementChartData = processMeasurementData(measurements);
  const workoutChartData = processWorkoutData(workouts);

  const measurementLines = [
    { dataKey: 'chest', color: '#FF4500', name: '胸围' },
    { dataKey: 'waist', color: '#DC143C', name: '腰围' },
    { dataKey: 'hips', color: '#3B82F6', name: '臀围' },
    { dataKey: 'biceps', color: '#22C55E', name: '臂围' },
  ];

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">趋势分析</h1>

      {/* AI 智能总结 */}
      <div className="mb-6">
        <AIInsightSummary stats={stats} changes={changes} isLoading={statsLoading} />
      </div>

      <DateRangePicker
        startDate={dateRange.start}
        endDate={dateRange.end}
        onStartDateChange={(d) => setDateRange((r) => ({ ...r, start: d }))}
        onEndDateChange={(d) => setDateRange((r) => ({ ...r, end: d }))}
      />

      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'measurements' && (
          <div>
            <h2 className="font-heading text-xl mb-4 text-text-secondary">身体围度变化</h2>
            {measurementChartData.length > 0 ? (
              <TrendChart type="line" data={measurementChartData} lines={measurementLines} />
            ) : (
              <p className="text-text-secondary text-center">暂无围度数据</p>
            )}
          </div>
        )}

        {activeTab === 'workouts' && (
          <div>
            <h2 className="font-heading text-xl mb-4 text-text-secondary">每周训练次数</h2>
            {workoutChartData.length > 0 ? (
              <TrendChart type="bar" data={workoutChartData} />
            ) : (
              <p className="text-text-secondary text-center">暂无训练数据</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}