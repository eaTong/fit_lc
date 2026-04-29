import { useEffect, useState } from 'react';
import { useRecordsStore } from '../../stores/recordsStore';
import { useToastStore } from '../../stores/toastStore';
import WorkoutCard from '../WorkoutCard';
import DateRangePicker from '../ui/DateRangePicker';
import ConfirmDialog from '../ui/ConfirmDialog';
import type { Workout } from '../../types';

const getDefaultDates = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};

export default function HistoryTab() {
  const {
    workouts,
    isLoading,
    fetchWorkouts,
    deleteWorkout,
  } = useRecordsStore();
  const { addToast } = useToastStore();

  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState(getDefaultDates());

  useEffect(() => {
    fetchWorkouts(dateRange.start, dateRange.end);
  }, [fetchWorkouts, dateRange]);

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget !== null) {
      try {
        await deleteWorkout(deleteTarget);
        addToast('训练记录已删除', 'success');
      } catch {
        addToast('删除失败，请重试', 'error');
      }
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <DateRangePicker
        startDate={dateRange.start}
        endDate={dateRange.end}
        onStartDateChange={(d) => setDateRange((r) => ({ ...r, start: d }))}
        onEndDateChange={(d) => setDateRange((r) => ({ ...r, end: d }))}
      />

      <div className="mt-6">
        {isLoading && (
          <p className="text-text-secondary text-center">加载中...</p>
        )}

        {!isLoading && workouts.length === 0 && (
          <p className="text-text-secondary text-center">
            暂无训练记录
          </p>
        )}

        {!isLoading &&
          workouts.map((record) => (
            <WorkoutCard
              key={record.id}
              workout={record as Workout}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="确认删除"
        message="确定要删除这条训练记录吗？"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}