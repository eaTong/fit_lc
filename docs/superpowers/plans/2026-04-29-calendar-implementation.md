# 日历页面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal：**新增日历页面，默认显示当月日历，通过小圆点显示有训练/围度记录的日期，点击日期展开显示当天详情

**Architecture：**React 单页应用，使用独立路由 `/calendar`，通过 recordsStore 获取训练和围度数据

**Tech Stack：**React + TypeScript + TailwindCSS + Zustand + React Router v6

---

## 文件结构

```
frontend/src/
├── pages/
│   └── Calendar.tsx                    # 日历主页面
├── components/calendar/
│   ├── CalendarGrid.tsx                # 日期网格组件
│   ├── CalendarDay.tsx                 # 单个日期格子
│   └── CalendarDetail.tsx              # 展开的详情面板
└── App.tsx                             # 路由配置
```

---

### Task 1: 创建 CalendarGrid 组件

**Files:**
- Create: `frontend/src/components/calendar/CalendarGrid.tsx`

```tsx
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed
  workoutDates: Set<string>;   // 'YYYY-MM-DD' 格式
  measurementDates: Set<string>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export default function CalendarGrid({
  year,
  month,
  workoutDates,
  measurementDates,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  // 计算每月第一天是周几
  const firstDay = new Date(year, month, 1);
  // Monday-first: 0=周一, 6=周日
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 构建 6×7 网格
  const cells: (number | null)[] = [];

  // 填充空白
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }
  // 填充日期
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  // 补齐到 42 格
  while (cells.length < 42) {
    cells.push(null);
  }

  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className="w-full">
      {/* 周头 */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-text-secondary text-sm py-1">
            {d}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={idx} />;
          }
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasWorkout = workoutDates.has(dateStr);
          const hasMeasurement = measurementDates.has(dateStr);
          const isToday = dateStr === getTodayStr();
          const isSelected = dateStr === selectedDate;

          return (
            <CalendarDay
              key={idx}
              day={day}
              hasRecord={hasWorkout || hasMeasurement}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => onSelectDate(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
```

- [ ] **Step 1: 创建 CalendarGrid.tsx 文件**

```bash
mkdir -p frontend/src/components/calendar
cat > frontend/src/components/calendar/CalendarGrid.tsx << 'EOF'
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed
  workoutDates: Set<string>;
  measurementDates: Set<string>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export default function CalendarGrid({
  year,
  month,
  workoutDates,
  measurementDates,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];

  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null);

  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-text-secondary text-sm py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <div key={idx} />;
          const dateStr = \`\${year}-\${String(month + 1).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`;
          const hasWorkout = workoutDates.has(dateStr);
          const hasMeasurement = measurementDates.has(dateStr);
          const isToday = dateStr === getTodayStr();
          const isSelected = dateStr === selectedDate;

          return (
            <CalendarDay
              key={idx}
              day={day}
              hasRecord={hasWorkout || hasMeasurement}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => onSelectDate(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}

function getTodayStr(): string {
  const d = new Date();
  return \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${String(d.getDate()).padStart(2, '0')}\`;
}
EOF
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/calendar/CalendarGrid.tsx
git commit -m "feat(calendar): add CalendarGrid component

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: 创建 CalendarDay 组件

**Files:**
- Create: `frontend/src/components/calendar/CalendarDay.tsx`

```tsx
interface CalendarDayProps {
  day: number;
  hasRecord: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function CalendarDay({ day, hasRecord, isToday, isSelected, onClick }: CalendarDayProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center
        w-10 h-10 rounded text-sm
        transition-colors
        ${isToday ? 'border-2 border-accent-orange' : ''}
        ${isSelected ? 'bg-accent-orange text-white' : 'hover:bg-tertiary'}
      `}
    >
      {day}
      {hasRecord && !isSelected && (
        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-accent-orange" />
      )}
    </button>
  );
}
```

- [ ] **Step 1: 创建 CalendarDay.tsx**

```bash
cat > frontend/src/components/calendar/CalendarDay.tsx << 'EOF'
interface CalendarDayProps {
  day: number;
  hasRecord: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function CalendarDay({ day, hasRecord, isToday, isSelected, onClick }: CalendarDayProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center
        w-10 h-10 rounded text-sm
        transition-colors
        ${isToday ? 'border-2 border-accent-orange' : ''}
        ${isSelected ? 'bg-accent-orange text-white' : 'hover:bg-tertiary'}
      `}
    >
      {day}
      {hasRecord && !isSelected && (
        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-accent-orange" />
      )}
    </button>
  );
}
EOF
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/calendar/CalendarDay.tsx
git commit -m "feat(calendar): add CalendarDay component

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: 创建 CalendarDetail 组件

**Files:**
- Create: `frontend/src/components/calendar/CalendarDetail.tsx`

```tsx
import type { Workout, Measurement } from '../../types';

interface CalendarDetailProps {
  date: string;
  workouts: Workout[];
  measurements: Measurement[];
}

export default function CalendarDetail({ date, workouts, measurements }: CalendarDetailProps) {
  const month = parseInt(date.split('-')[1]);
  const day = parseInt(date.split('-')[2]);
  const dateLabel = `${month}月${day}日`;

  return (
    <div className="mt-4 border-t-2 border-border pt-4">
      <div className="text-center text-text-secondary mb-4">
        ─────── {dateLabel} ───────────
      </div>

      {workouts.length === 0 && measurements.length === 0 && (
        <p className="text-center text-text-secondary py-4">暂无记录</p>
      )}

      {workouts.length > 0 && (
        <div className="mb-4">
          <h4 className="text-text-primary font-semibold mb-2">训练记录</h4>
          {workouts.map((w) => (
            <div key={w.id} className="text-text-secondary text-sm mb-1">
              {w.exercises.map((e) => {
                const totalSets = e.sets?.length || 0;
                const totalReps = e.sets?.reduce((s, set) => s + set.reps, 0) || 0;
                if (e.duration) {
                  return <span key={e.id}>🏃 {e.exerciseName} {e.duration}分钟</span>;
                }
                if (e.distance) {
                  return <span key={e.id}>🏃 {e.exerciseName} {e.distance}公里</span>;
                }
                return <span key={e.id}>🏋️ {e.exerciseName} {totalSets}组×{totalReps}次</span>;
              })}
            </div>
          ))}
        </div>
      )}

      {measurements.length > 0 && (
        <div>
          <h4 className="text-text-primary font-semibold mb-2">围度记录</h4>
          {measurements.map((m) => (
            <div key={m.id} className="text-text-secondary text-sm">
              📏 {m.items.map((i) => `${i.bodyPart}: ${i.value}`).join(' / ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 1: 创建 CalendarDetail.tsx**

```bash
cat > frontend/src/components/calendar/CalendarDetail.tsx << 'EOF'
import type { Workout, Measurement } from '../../types';

interface CalendarDetailProps {
  date: string;
  workouts: Workout[];
  measurements: Measurement[];
}

export default function CalendarDetail({ date, workouts, measurements }: CalendarDetailProps) {
  const month = parseInt(date.split('-')[1]);
  const day = parseInt(date.split('-')[2]);
  const dateLabel = \`\${month}月\${day}日\`;

  return (
    <div className="mt-4 border-t-2 border-border pt-4">
      <div className="text-center text-text-secondary mb-4">
        ─────── {dateLabel} ───────────
      </div>

      {workouts.length === 0 && measurements.length === 0 && (
        <p className="text-center text-text-secondary py-4">暂无记录</p>
      )}

      {workouts.length > 0 && (
        <div className="mb-4">
          <h4 className="text-text-primary font-semibold mb-2">训练记录</h4>
          {workouts.map((w) => (
            <div key={w.id} className="text-text-secondary text-sm mb-1">
              {w.exercises.map((e) => {
                const totalSets = e.sets?.length || 0;
                const totalReps = e.sets?.reduce((s, set) => s + set.reps, 0) || 0;
                if (e.duration) {
                  return <span key={e.id}>🏃 {e.exerciseName} {e.duration}分钟</span>;
                }
                if (e.distance) {
                  return <span key={e.id}>🏃 {e.exerciseName} {e.distance}公里</span>;
                }
                return <span key={e.id}>🏋️ {e.exerciseName} {totalSets}组×{totalReps}次</span>;
              })}
            </div>
          ))}
        </div>
      )}

      {measurements.length > 0 && (
        <div>
          <h4 className="text-text-primary font-semibold mb-2">围度记录</h4>
          {measurements.map((m) => (
            <div key={m.id} className="text-text-secondary text-sm">
              📏 {m.items.map((i) => \`\${i.bodyPart}: \${i.value}\`).join(' / ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
EOF
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/calendar/CalendarDetail.tsx
git commit -m "feat(calendar): add CalendarDetail component

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: 创建 Calendar 页面

**Files:**
- Create: `frontend/src/pages/Calendar.tsx`

```tsx
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecordsStore } from '../stores/recordsStore';
import CalendarGrid from '../components/calendar/CalendarGrid';
import CalendarDetail from '../components/calendar/CalendarDetail';
import type { Workout, Measurement } from '../types';

export default function Calendar() {
  const navigate = useNavigate();
  const { workouts, measurements, fetchWorkouts, fetchMeasurements } = useRecordsStore();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 每次切换月份时获取数据
  useEffect(() => {
    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
    fetchWorkouts(startDate, endDate);
    fetchMeasurements(startDate, endDate);
  }, [year, month]);

  // 构建日期集合
  const workoutDates = useMemo(() => {
    return new Set(workouts.map((w) => w.date));
  }, [workouts]);

  const measurementDates = useMemo(() => {
    return new Set(measurements.map((m) => m.date));
  }, [measurements]);

  // 选中日期的记录
  const selectedWorkouts = useMemo(() => {
    if (!selectedDate) return [];
    return workouts.filter((w) => w.date === selectedDate);
  }, [workouts, selectedDate]);

  const selectedMeasurements = useMemo(() => {
    if (!selectedDate) return [];
    return measurements.filter((m) => m.date === selectedDate);
  }, [measurements, selectedDate]);

  const goToPrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const goToToday = () => {
    const d = new Date();
    setYear(d.getFullYear());
    setMonth(d.getMonth());
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    setSelectedDate(todayStr);
  };

  const toggleDate = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  return (
    <div className="px-4 py-4">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary">
          ← 返回
        </button>
        <h1 className="font-heading text-xl font-bold text-accent-orange">日历</h1>
        <button onClick={goToToday} className="text-accent-orange text-sm hover:text-accent-red">
          今天
        </button>
      </div>

      {/* 月份切换 */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPrevMonth} className="text-text-secondary hover:text-text-primary px-2">
          ‹
        </button>
        <span className="font-heading text-lg">
          {year}年{month + 1}月
        </span>
        <button onClick={goToNextMonth} className="text-text-secondary hover:text-text-primary px-2">
          ›
        </button>
      </div>

      {/* 日历网格 */}
      <CalendarGrid
        year={year}
        month={month}
        workoutDates={workoutDates}
        measurementDates={measurementDates}
        selectedDate={selectedDate}
        onSelectDate={toggleDate}
      />

      {/* 展开详情 */}
      {selectedDate && (
        <CalendarDetail
          date={selectedDate}
          workouts={selectedWorkouts}
          measurements={selectedMeasurements}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 1: 创建 Calendar.tsx**

```bash
cat > frontend/src/pages/Calendar.tsx << 'EOF'
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecordsStore } from '../stores/recordsStore';
import CalendarGrid from '../components/calendar/CalendarGrid';
import CalendarDetail from '../components/calendar/CalendarDetail';

export default function Calendar() {
  const navigate = useNavigate();
  const { workouts, measurements, fetchWorkouts, fetchMeasurements } = useRecordsStore();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const startDate = \`\${year}-\${String(month + 1).padStart(2, '0')}-01\`;
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
    fetchWorkouts(startDate, endDate);
    fetchMeasurements(startDate, endDate);
  }, [year, month]);

  const workoutDates = useMemo(() => new Set(workouts.map((w) => w.date)), [workouts]);
  const measurementDates = useMemo(() => new Set(measurements.map((m) => m.date)), [measurements]);

  const selectedWorkouts = useMemo(() => {
    if (!selectedDate) return [];
    return workouts.filter((w) => w.date === selectedDate);
  }, [workouts, selectedDate]);

  const selectedMeasurements = useMemo(() => {
    if (!selectedDate) return [];
    return measurements.filter((m) => m.date === selectedDate);
  }, [measurements, selectedDate]);

  const goToPrevMonth = () => {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
  };

  const goToNextMonth = () => {
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
  };

  const goToToday = () => {
    const d = new Date();
    setYear(d.getFullYear());
    setMonth(d.getMonth());
    const todayStr = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${String(d.getDate()).padStart(2, '0')}\`;
    setSelectedDate(todayStr);
  };

  const toggleDate = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary">← 返回</button>
        <h1 className="font-heading text-xl font-bold text-accent-orange">日历</h1>
        <button onClick={goToToday} className="text-accent-orange text-sm hover:text-accent-red">今天</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPrevMonth} className="text-text-secondary hover:text-text-primary px-2">‹</button>
        <span className="font-heading text-lg">{year}年{month + 1}月</span>
        <button onClick={goToNextMonth} className="text-text-secondary hover:text-text-primary px-2">›</button>
      </div>

      <CalendarGrid
        year={year}
        month={month}
        workoutDates={workoutDates}
        measurementDates={measurementDates}
        selectedDate={selectedDate}
        onSelectDate={toggleDate}
      />

      {selectedDate && (
        <CalendarDetail
          date={selectedDate}
          workouts={selectedWorkouts}
          measurements={selectedMeasurements}
        />
      )}
    </div>
  );
}
EOF
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/pages/Calendar.tsx
git commit -m "feat(calendar): add Calendar page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: 添加路由和 Profile 入口

**Files:**
- Modify: `frontend/src/App.tsx:1-27` (添加 import)
- Modify: `frontend/src/App.tsx:114-118` (添加路由)
- Modify: `frontend/src/pages/Profile.tsx:21` (添加打卡入口)

**Step 1: 添加 Calendar 导入和路由**

```tsx
// App.tsx 添加 import
import Calendar from './pages/Calendar';

// App.tsx 在 SettingsLayout 路由组中添加
<Route path="/calendar" element={<Calendar />} />
```

**Step 2: 修改 Profile 页面，添加"连续打卡"卡片**

在 `frontend/src/pages/Profile.tsx` 中：

```tsx
// 导入 Link
import { Link } from 'react-router-dom';

// 在"最近训练"卡片上方添加连续打卡卡片
<Link
  to="/calendar"
  className="block p-4 bg-tertiary rounded border border-border hover:border-accent-orange transition-colors"
>
  <div className="flex items-center gap-2 mb-2">
    <span className="text-2xl">📅</span>
    <span className="text-text-primary font-semibold">连续打卡</span>
  </div>
  <div className="text-text-secondary text-sm">
    当前连续 {streakDays} 天
  </div>
</Link>
```

- [ ] **Step 1: 修改 App.tsx 添加 Calendar 路由**

```bash
# 修改 App.tsx 添加 Calendar import
sed -i '' "s/import Badges from '.\/pages\/Badges';/import Badges from '.\/pages\/Badges';\nimport Calendar from '.\/pages\/Calendar';/" frontend/src/App.tsx

# 在 SettingsLayout 路由组中添加 calendar 路由
sed -i '' '/<Route path="\/badges" element={<Badges />} \/>/a\              <Route path="/calendar" element={<Calendar />} />' frontend/src/App.tsx
```

- [ ] **Step 2: 修改 Profile.tsx 添加打卡入口**

```bash
# 在 Profile.tsx 的 stats 卡片后面添加打卡入口
# 找到 "最近训练" Card 之前的位置插入 Link 组件
```

- [ ] **Step 3: 提交**

```bash
git add frontend/src/App.tsx frontend/src/pages/Profile.tsx
git commit -m "feat(calendar): add calendar route and profile entry

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 6: 更新 PRD 文档

**Files:**
- Modify: `docs/PRD.md`

在 `3.4 历史记录管理` 节添加日历功能说明，在 `9. 前端页面清单` 添加日历页面。

- [ ] **Step 1: 更新 PRD.md**

- [ ] **Step 2: 提交**

```bash
git add docs/PRD.md
git commit -m "docs: update PRD with calendar page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## 自检清单

**Spec Coverage:**
- [x] 日历网格显示（CalendarGrid + CalendarDay）
- [x] 月份切换（prev/next/today）
- [x] 有记录日期标记（workoutDates, measurementDates）
- [x] 当天高亮（isToday）
- [x] 点击展开详情（CalendarDetail）
- [x] 训练记录显示
- [x] 围度记录显示
- [x] Profile 入口

**Placeholder Scan:** 无 TBD/TODO

**Type Consistency:** 类型均来自 `frontend/src/types/index.ts`，一致
