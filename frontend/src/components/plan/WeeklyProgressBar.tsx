interface DayProgress {
  dayOfWeek: number;
  completed: boolean;
  hasWorkout: boolean;
}

interface Props {
  progress: DayProgress[];
  startDate: Date;
}

const DAY_NAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default function WeeklyProgressBar({ progress, startDate }: Props) {
  const today = new Date();
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

  return (
    <div className="flex justify-between items-center">
      {DAY_NAMES.map((name, index) => {
        const dayNum = index + 1;
        const dayProgress = progress.find(p => p.dayOfWeek === dayNum);
        const isToday = dayNum === dayOfWeek;
        const isPast = dayNum < dayOfWeek;
        const isFuture = dayNum > dayOfWeek;

        let bgClass = 'bg-primary-secondary';
        let borderClass = 'border-border';

        if (dayProgress?.completed) {
          bgClass = 'bg-accent-primary';
        } else if (dayProgress?.hasWorkout) {
          bgClass = 'bg-accent-primary/50';
        }

        if (isToday) {
          borderClass = 'border-accent-primary';
        }

        return (
          <div key={dayNum} className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded border-2 ${bgClass} ${borderClass} flex items-center justify-center`}
            >
              {dayProgress?.completed ? (
                <span className="text-white text-sm">✓</span>
              ) : (
                <span className="text-sm">{dayNum}</span>
              )}
            </div>
            <span className={`text-xs ${isToday ? 'text-accent-primary' : 'text-text-secondary'}`}>
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}