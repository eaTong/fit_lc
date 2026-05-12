interface DayExecution {
  date: string;
  completed: boolean;
  skipped?: boolean;
}

interface Props {
  executions: DayExecution[];
  month: Date;
}

export default function ExecutionCalendar({ executions, month }: Props) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

  const daysInMonth = lastDay.getDate();
  const executionMap = new Map(
    executions.map(e => [e.date, e])
  );

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = 1; i < startDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  while (currentWeek.length > 0 && currentWeek.length < 7) {
    currentWeek.push(null);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <div className="bg-primary rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button className="text-text-secondary hover:text-text-primary">&lt;</button>
        <span className="font-medium">{year}年{monthNames[monthIndex]}</span>
        <button className="text-text-secondary hover:text-text-primary">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['一', '二', '三', '四', '五', '六', '日'].map(d => (
          <div key={d} className="text-xs text-text-secondary">{d}</div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
          {week.map((day, dayIndex) => {
            if (day === null) {
              return <div key={dayIndex} className="h-8" />;
            }

            const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const execution = executionMap.get(dateStr);

            let bgClass = 'bg-primary-secondary';
            if (execution?.completed) {
              bgClass = 'bg-accent-primary';
            } else if (execution?.skipped) {
              bgClass = 'bg-text-muted/30';
            }

            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            return (
              <div
                key={dayIndex}
                className={`h-8 rounded flex items-center justify-center text-sm ${bgClass} ${isToday ? 'border border-accent-primary' : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}