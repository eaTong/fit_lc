import Button from './Button';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApply?: () => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
}: DateRangePickerProps) {
  return (
    <div className="flex gap-4 items-center mb-4">
      <div className="flex items-center gap-2">
        <label className="text-text-secondary text-sm">开始</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="bg-primary-tertiary border border-border px-3 py-2 text-text-primary focus:border-accent-primary outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-text-secondary text-sm">结束</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="bg-primary-tertiary border border-border px-3 py-2 text-text-primary focus:border-accent-primary outline-none"
        />
      </div>
      {onApply && (
        <Button variant="outline" size="sm" onClick={onApply}>
          应用
        </Button>
      )}
    </div>
  );
}
