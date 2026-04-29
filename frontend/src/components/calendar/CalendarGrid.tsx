import CalendarDay from './CalendarDay';

export interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed (0=January, 11=December)
  workoutDates: Set<string>;   // Set of 'YYYY-MM-DD' strings
  measurementDates: Set<string>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const WEEK_HEADERS = ['一', '二', '三', '四', '五', '六', '日'];

function getTodayStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateStr(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function CalendarGrid({
  year,
  month,
  workoutDates,
  measurementDates,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const todayStr = getTodayStr();

  // Calculate first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // getDay() returns 0 (Sunday) to 6 (Saturday)
  // We want Monday-first, so Monday=0, Sunday=6
  // Adjust: Monday is 1 in JS getDay(), Sunday is 0
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6; // Sunday case

  // Build cells: first row may have nulls for days before the 1st
  const cells: (number | null)[] = [];

  // Pad with nulls for days before the 1st
  for (let i = 0; i < startDayOfWeek; i++) {
    cells.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  // Ensure we have 42 cells (6 rows × 7 columns)
  while (cells.length < 42) {
    cells.push(null);
  }

  // Split into rows of 7
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div className="w-full">
      {/* Week headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEK_HEADERS.map((header) => (
          <div
            key={header}
            className="text-center text-sm text-text-secondary font-medium py-2"
          >
            {header}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {rows.map((row, rowIndex) =>
          row.map((day, colIndex) => {
            if (day === null) {
              return <div key={`empty-${rowIndex}-${colIndex}`} className="aspect-square" />;
            }

            const dateStr = formatDateStr(year, month, day);
            const hasRecord = workoutDates.has(dateStr) || measurementDates.has(dateStr);
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;

            return (
              <CalendarDay
                key={dateStr}
                day={day}
                dateStr={dateStr}
                hasRecord={hasRecord}
                isToday={isToday}
                isSelected={isSelected}
                onClick={() => onSelectDate(dateStr)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}