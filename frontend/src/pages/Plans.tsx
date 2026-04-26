import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlanStore } from '../stores/planStore';
import { useToastStore } from '../stores/toastStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TabSwitcher from '../components/ui/TabSwitcher';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import type { Plan } from '../types';

const statusTabs = [
  { id: 'all', label: '全部' },
  { id: 'draft', label: '草稿' },
  { id: 'active', label: '进行中' },
  { id: 'completed', label: '已完成' },
  { id: 'paused', label: '已暂停' },
];

const goalLabels: Record<Plan['goal'], string> = {
  bulk: '增肌',
  cut: '减脂',
  maintain: '维持',
};

const statusColors: Record<Plan['status'], string> = {
  draft: 'bg-text-muted text-text-secondary',
  active: 'bg-green-600 text-white',
  completed: 'bg-blue-600 text-white',
  paused: 'bg-accent-orange text-white',
};

function StatusBadge({ status }: { status: Plan['status'] }) {
  const labels: Record<Plan['status'], string> = {
    draft: '草稿',
    active: '进行中',
    completed: '已完成',
    paused: '已暂停',
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${statusColors[status]}`}>
      {labels[status]}
    </span>
  );
}

interface PlanCardProps {
  plan: Plan;
  onActivate: (id: number) => void;
  onDelete: (id: number) => void;
}

function PlanCard({ plan, onActivate, onDelete }: PlanCardProps) {
  return (
    <Card className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading text-lg font-bold text-text-primary truncate">
              {plan.name}
            </h3>
            <StatusBadge status={plan.status} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
            <span>目标：{goalLabels[plan.goal]}</span>
            <span>频率：每周{plan.frequency}次</span>
            <span>周期：{plan.duration_weeks}周</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {plan.status === 'draft' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onActivate(plan.id)}
            >
              激活
            </Button>
          )}
          <Link to={`/plans/${plan.id}`}>
            <Button variant="secondary" size="sm">
              详情
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(plan.id)}
          >
            删除
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function Plans() {
  const { plans, isLoading, fetchPlans, activatePlan, deletePlan } = usePlanStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const filteredPlans =
    activeTab === 'all'
      ? plans
      : plans.filter((p) => p.status === activeTab);

  const handleActivate = async (id: number) => {
    try {
      await activatePlan(id);
      addToast('计划已激活', 'success');
    } catch {
      addToast('激活失败，请重试', 'error');
    }
  };

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget !== null) {
      try {
        await deletePlan(deleteTarget);
        addToast('计划已删除', 'success');
      } catch {
        addToast('删除失败，请重试', 'error');
      }
      setDeleteTarget(null);
    }
  };

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">健身计划</h1>
        <Link to="/plans/new">
          <Button variant="primary">生成新计划</Button>
        </Link>
      </div>

      <TabSwitcher
        tabs={statusTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-6">
        {isLoading && (
          <p className="text-text-secondary text-center">加载中...</p>
        )}

        {!isLoading && filteredPlans.length === 0 && (
          <p className="text-text-secondary text-center">
            暂无{activeTab === 'all' ? '计划' : statusTabs.find((t) => t.id === activeTab)?.label}计划
          </p>
        )}

        {!isLoading &&
          filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onActivate={handleActivate}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="确认删除"
        message="确定要删除此健身计划吗？此操作不可撤销。"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
