import { useAlbumStore } from '@/stores/albumStore';

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export function MonthPicker() {
  const { selectedYear, selectedMonth, setMonth } = useAlbumStore();
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {years.map((year) => (
        <div key={year} className="flex gap-1">
          {MONTHS.map((label, idx) => {
            const month = idx + 1;
            const active = selectedYear === year && selectedMonth === month;
            return (
              <button
                key={`${year}-${month}`}
                onClick={() => setMonth(year, month)}
                className={`px-2 py-1 text-xs rounded border ${
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-card text-text-secondary border-border'
                }`}
              >
                {month}月
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}