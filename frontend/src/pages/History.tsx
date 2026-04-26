import { useEffect, useState } from 'react';
import { useRecordsStore } from '../stores/recordsStore';
import { useToastStore } from '../stores/toastStore';
import WorkoutCard from '../components/WorkoutCard';
import MeasurementCard from '../components/MeasurementCard';
import TabSwitcher from '../components/ui/TabSwitcher';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import DateRangePicker from '../components/ui/DateRangePicker';
import type { Workout, Measurement } from '../types';

const tabs = [
  { id: 'workouts', label: '训练' },
  { id: 'measurements', label: '围度' },
];

// Default to last 30 days
const getDefaultDates = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};

export default function History() {
  const {
    workouts,
    measurements,
    isLoading,
    fetchWorkouts,
    fetchMeasurements,
    deleteWorkout,
    deleteMeasurement,
  } = useRecordsStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState('workouts');
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; type: string } | null>(null);
  const [dateRange, setDateRange] = useState(getDefaultDates());

  useEffect(() => {
    fetchWorkouts(dateRange.start, dateRange.end);
    fetchMeasurements(dateRange.start, dateRange.end);
  }, [fetchWorkouts, fetchMeasurements, dateRange]);

  const handleDelete = (id: number) => {
    setDeleteTarget({ id, type: activeTab });
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      try {
        if (deleteTarget.type === 'workouts') {
          await deleteWorkout(deleteTarget.id);
          addToast('训练记录已删除', 'success');
        } else {
          await deleteMeasurement(deleteTarget.id);
          addToast('围度记录已删除', 'success');
        }
      } catch {
        addToast('删除失败，请重试', 'error');
      }
      setDeleteTarget(null);
    }
  };

  const currentRecords = activeTab === 'workouts' ? workouts : measurements;

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">历史记录</h1>

      <DateRangePicker
        startDate={dateRange.start}
        endDate={dateRange.end}
        onStartDateChange={(d) => setDateRange((r) => ({ ...r, start: d }))}
        onEndDateChange={(d) => setDateRange((r) => ({ ...r, end: d }))}
      />

      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {isLoading && (
          <p className="text-text-secondary text-center">加载中...</p>
        )}

        {!isLoading && currentRecords.length === 0 && (
          <p className="text-text-secondary text-center">
            暂无{activeTab === 'workouts' ? '训练' : '围度'}记录
          </p>
        )}

        {!isLoading &&
          currentRecords.map((record) =>
            activeTab === 'workouts' ? (
              <WorkoutCard
                key={record.id}
                workout={record as Workout}
                onDelete={handleDelete}
              />
            ) : (
              <MeasurementCard
                key={record.id}
                measurement={record as Measurement}
                onDelete={handleDelete}
              />
            )
          )}
      </div>

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="确认删除"
        message={`确定要删除这条${deleteTarget?.type === 'workouts' ? '训练' : '围度'}记录吗？`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}