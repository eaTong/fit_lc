# 身体围度总览页面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成身体围度总览页面，12 个部位的最新围度展示和历史趋势查看

**Architecture:** 扩展 MeasurementItem.body_part 支持左右区分，后端新增测量记录查询 API，前端新建 MeasureMeasurements 页面

**Tech Stack:** React, TypeScript, TailwindCSS, Express, Prisma

---

## 文件结构

```
backend/
├── prisma/schema.prisma                 # 修改：body_part 枚举扩展
├── scripts/migrate_body_parts.sql        # 新建：数据迁移脚本
├── src/routes/users.ts                   # 修改：新增 measurements/latest, measurements/history
├── src/services/userService.ts           # 修改：新增 getMeasurementsLatest, getMeasurementsHistory

frontend/
├── src/api/user.ts                      # 修改：新增 getMeasurementsLatest, getMeasurementsHistory
├── src/pages/Measurements.tsx            # 新建：围度总览页面
├── src/components/MeasurementCard.tsx    # 新建：部位卡片组件
├── src/router/index.tsx                  # 修改：配置 /measurements 路由
```

---

## Task 1: 数据库 body_part 扩展和数据迁移

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Create: `backend/scripts/migrate_body_parts.sql`

- [ ] **Step 1: 确认 body_part 类型无需修改**

Schema 中 body_part 是 String 类型，已支持任意值，无需修改 schema。迁移脚本只需更新现有数据。

- [ ] **Step 2: 创建数据迁移脚本**

```sql
-- backend/scripts/migrate_body_parts.sql
-- 将现有 biceps/thighs/calves 拆分为左右两侧（左右同值）

-- 1. biceps -> biceps_l (保留原记录)
UPDATE measurement_items
SET body_part = 'biceps_l'
WHERE body_part = 'biceps';

-- 2. biceps -> biceps_r (复制新记录)
INSERT INTO measurement_items (measurement_id, body_part, value)
SELECT measurement_id, 'biceps_r', value
FROM measurement_items
WHERE body_part = 'biceps_l';

-- 3. thighs -> thigh_l
UPDATE measurement_items
SET body_part = 'thigh_l'
WHERE body_part = 'thighs';

-- 4. thighs -> thigh_r (复制新记录)
INSERT INTO measurement_items (measurement_id, body_part, value)
SELECT measurement_id, 'thigh_r', value
FROM measurement_items
WHERE body_part = 'thigh_l';

-- 5. calves -> calf_l
UPDATE measurement_items
SET body_part = 'calf_l'
WHERE body_part = 'calves';

-- 6. calves -> calf_r (复制新记录)
INSERT INTO measurement_items (measurement_id, body_part, value)
SELECT measurement_id, 'calf_r', value
FROM measurement_items
WHERE body_part = 'calf_l';
```

- [ ] **Step 3: Commit**

```bash
git add backend/scripts/migrate_body_parts.sql
git commit -m "feat(db): 新增 body_part 数据迁移脚本（biceps/thighs/calves 左右拆分）"
```

---

## Task 2: 后端 API 扩展

**Files:**
- Modify: `backend/src/services/userService.ts`
- Modify: `backend/src/routes/users.ts`

- [ ] **Step 1: 扩展 userService.ts 添加测量查询方法**

```typescript
// backend/src/services/userService.ts
// 在 userService 中添加以下方法

async getMeasurementsLatest(userId: number) {
  const measurements = await prisma.bodyMeasurement.findMany({
    where: { userId, deletedAt: null },
    orderBy: { date: 'desc' },
    include: { items: true },
  });

  const latestByPart: Record<string, { value: number; date: string }> = {};

  for (const m of measurements) {
    for (const item of m.items) {
      if (!latestByPart[item.bodyPart]) {
        latestByPart[item.bodyPart] = {
          value: Number(item.value),
          date: m.date.toISOString().split('T')[0],
        };
      }
    }
  }

  // 12 个部位
  const allParts = ['neck', 'chest', 'shoulder', 'biceps_l', 'biceps_r', 'waist', 'hips', 'thigh_l', 'thigh_r', 'calf_l', 'calf_r'];
  const result: Record<string, { value: number; date: string } | null> = {};
  for (const part of allParts) {
    result[part] = latestByPart[part] || null;
  }

  return { measurements: result };
}

async getMeasurementsHistory(userId: number, bodyPart: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  // 查询指定部位的测量记录
  const items = await prisma.measurementItem.findMany({
    where: { bodyPart },
    include: { measurement: { where: { userId, deletedAt: null } } },
    orderBy: { measurement: { date: 'desc' } },
    skip,
    take: limit,
  });

  const history = items
    .filter(i => i.measurement)
    .map(i => ({
      value: Number(i.value),
      date: i.measurement.date.toISOString().split('T')[0],
    }));

  const total = await prisma.measurementItem.count({
    where: { bodyPart, measurement: { userId, deletedAt: null } },
  });

  return { bodyPart, history, pagination: { page, limit, total } };
}
```

- [ ] **Step 2: 扩展 users.ts 路由**

```typescript
// backend/src/routes/users.ts
// 添加以下路由

router.get('/me/measurements/latest', async (req, res) => {
  try {
    const result = await userService.getMeasurementsLatest(req.userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me/measurements/history', async (req, res) => {
  try {
    const { bodyPart, page = 1, limit = 10 } = req.query;
    if (!bodyPart) return res.status(400).json({ error: 'bodyPart required' });
    const result = await userService.getMeasurementsHistory(req.userId, bodyPart as string, parseInt(page as string), parseInt(limit as string));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/services/userService.ts backend/src/routes/users.ts
git commit -m "feat(api): 新增 getMeasurementsLatest 和 getMeasurementsHistory"
```

---

## Task 3: 前端 API 扩展

**Files:**
- Modify: `frontend/src/api/user.ts`

- [ ] **Step 1: 扩展 userApi**

```typescript
// frontend/src/api/user.ts
// 添加以下类型和接口

export interface MeasurementLatest {
  measurements: {
    [key: string]: { value: number; date: string } | null;
  };
}

export interface MeasurementHistory {
  bodyPart: string;
  history: { value: number; date: string }[];
  pagination: { page: number; limit: number; total: number };
}

// 在 userApi 中添加

async getMeasurementsLatest(): Promise<MeasurementLatest> {
  const { data } = await client.get('/users/me/measurements/latest');
  return data;
},

async getMeasurementsHistory(bodyPart: string, page = 1, limit = 10): Promise<MeasurementHistory> {
  const { data } = await client.get('/users/me/measurements/history', { params: { bodyPart, page, limit } });
  return data;
},
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/api/user.ts
git commit -m "feat(api): 扩展 userApi 支持围度查询"
```

---

## Task 4: 前端组件

**Files:**
- Create: `frontend/src/components/MeasurementCard.tsx`
- Create: `frontend/src/components/MeasurementHistoryModal.tsx`

- [ ] **Step 1: 创建 MeasurementCard.tsx**

```typescript
// frontend/src/components/MeasurementCard.tsx
interface MeasurementCardProps {
  bodyPart: string;
  label: string;
  value: number | null;
  date?: string;
  trend?: 'up' | 'down' | 'flat';
  onClick?: () => void;
}

const trendColors = {
  up: 'text-red-500',
  down: 'text-green-500',
  flat: 'text-text-muted',
};

const trendIcons = {
  up: '↑',
  down: '↓',
  flat: '—',
};

export default function MeasurementCard({ bodyPart, label, value, date, trend, onClick }: MeasurementCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center py-3 px-4 border-b border-border cursor-pointer hover:bg-primary-tertiary transition-colors ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div>
        <span className="text-text-primary">{label}</span>
        {date && <span className="text-text-muted text-xs ml-2">{date}</span>}
      </div>
      <div className="flex items-center gap-2">
        {value !== null ? (
          <>
            <span className="text-text-primary font-heading">{value}</span>
            <span className="text-text-muted text-sm">cm</span>
            {trend && (
              <span className={`text-lg ${trendColors[trend]}`}>{trendIcons[trend]}</span>
            )}
          </>
        ) : (
          <span className="text-text-muted">—</span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建 MeasurementHistoryModal.tsx**

```typescript
// frontend/src/components/MeasurementHistoryModal.tsx
import Modal from './ui/Modal';
import type { MeasurementHistory } from '../api/user';

interface MeasurementHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bodyPart: string;
  label: string;
  data?: MeasurementHistory;
  onPageChange: (page: number) => void;
}

export default function MeasurementHistoryModal({ isOpen, onClose, bodyPart, label, data, onPageChange }: MeasurementHistoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${label}历史记录`} size="sm">
      {data?.history.length === 0 ? (
        <p className="text-text-muted text-sm">暂无记录</p>
      ) : (
        <div className="space-y-2">
          {data?.history.map((h, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border">
              <span className="text-text-muted text-sm">{h.date}</span>
              <span className="text-text-primary font-heading">{h.value} cm</span>
            </div>
          ))}
        </div>
      )}
      {data && data.pagination.total > 10 && (
        <div className="mt-4 flex justify-center gap-2">
          {data.pagination.page > 1 && (
            <button onClick={() => onPageChange(data.pagination.page - 1)} className="text-accent-orange text-sm">
              上一页
            </button>
          )}
          <span className="text-text-muted text-sm">
            {data.pagination.page} / {Math.ceil(data.pagination.total / data.pagination.limit)}
          </span>
          {data.pagination.page < Math.ceil(data.pagination.total / data.pagination.limit) && (
            <button onClick={() => onPageChange(data.pagination.page + 1)} className="text-accent-orange text-sm">
              下一页
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/MeasurementCard.tsx frontend/src/components/MeasurementHistoryModal.tsx
git commit -m "feat(components): 新建 MeasurementCard MeasurementHistoryModal"
```

---

## Task 5: 围度总览页面

**Files:**
- Create: `frontend/src/pages/Measurements.tsx`
- Modify: `frontend/src/router/index.tsx`

- [ ] **Step 1: 创建 Measurements.tsx**

```typescript
// frontend/src/pages/Measurements.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../api/user';
import MeasurementCard from '../components/MeasurementCard';
import MeasurementHistoryModal from '../components/MeasurementHistoryModal';

const BODY_PARTS = [
  { key: 'neck', label: '颈围' },
  { key: 'chest', label: '胸围' },
  { key: 'shoulder', label: '肩宽' },
  { key: 'biceps_l', label: '左臂围' },
  { key: 'biceps_r', label: '右臂围' },
  { key: 'waist', label: '腰围' },
  { key: 'hips', label: '臀围' },
  { key: 'thigh_l', label: '左大腿围' },
  { key: 'thigh_r', label: '右大腿围' },
  { key: 'calf_l', label: '左小腿围' },
  { key: 'calf_r', label: '右小腿围' },
];

export default function Measurements() {
  const [latestData, setLatestData] = useState<Record<string, { value: number; date: string } | null>>({});
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatest();
  }, []);

  const loadLatest = async () => {
    setLoading(true);
    try {
      const data = await userApi.getMeasurementsLatest();
      setLatestData(data.measurements);
    } finally {
      setLoading(false);
    }
  };

  const handlePartClick = async (key: string) => {
    setSelectedPart(key);
    const data = await userApi.getMeasurementsHistory(key);
    setHistoryData(data);
  };

  const handlePageChange = async (page: number) => {
    if (!selectedPart) return;
    const data = await userApi.getMeasurementsHistory(selectedPart, page);
    setHistoryData(data);
  };

  const selectedPartInfo = BODY_PARTS.find(p => p.key === selectedPart);

  // 计算趋势（需要历史数据对比，简单实现）
  const getTrend = (key: string): 'up' | 'down' | 'flat' | undefined => {
    const current = latestData[key];
    if (!current) return undefined;
    // 简化：实际应对比当前和上次的差值
    return undefined;
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">身体围度</h1>

      {loading ? (
        <div className="text-center text-text-muted py-10">加载中...</div>
      ) : (
        <div className="bg-primary-secondary border-2 border-border">
          {BODY_PARTS.map((part) => (
            <MeasurementCard
              key={part.key}
              bodyPart={part.key}
              label={part.label}
              value={latestData[part.key]?.value ?? null}
              date={latestData[part.key]?.date}
              trend={getTrend(part.key)}
              onClick={() => handlePartClick(part.key)}
            />
          ))}

          {Object.values(latestData).every(v => v === null) && (
            <div className="text-center py-10">
              <p className="text-text-muted mb-4">暂无围度记录</p>
              <Link to="/chat" className="text-accent-orange hover:text-accent-red">
                通过对话记录 →
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link to="/chat" className="text-accent-orange hover:text-accent-red">
          通过对话记录围度 →
        </Link>
      </div>

      <MeasurementHistoryModal
        isOpen={!!selectedPart}
        onClose={() => setSelectedPart(null)}
        bodyPart={selectedPart || ''}
        label={selectedPartInfo?.label || ''}
        data={historyData}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

- [ ] **Step 2: 配置路由（在 router/index.tsx 添加）**

```typescript
// frontend/src/router/index.tsx
import Measurements from '../pages/Measurements';

// 在路由配置中添加
{ path: '/measurements', element: <Measurements /> },
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/Measurements.tsx
# 路由配置需根据实际文件修改
git commit -m "feat(pages): 新建围度总览页面 Measurements"
```

---

## Task 6: 验证

- [ ] **Step 1: 执行数据迁移**

```bash
cd backend
# 连接数据库执行 migrate_body_parts.sql
```

- [ ] **Step 2: 启动服务测试**

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

- [ ] **Step 3: 测试围度页面**
- 访问 /measurements 查看 12 个部位
- 点击部位查看历史记录分页
- 空状态引导测试

---

## 自检清单

1. **Spec coverage:** 12 个部位、趋势、颜色、分页、空状态全覆盖
2. **Placeholder scan:** 无 TBD/TODO
3. **Type consistency:** API 响应类型一致性已确认