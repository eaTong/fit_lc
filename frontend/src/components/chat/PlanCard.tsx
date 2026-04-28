import Card from '../ui/Card';

interface PlanCardProps {
  planId: number;
  planName?: string;
}

export default function PlanCard({ planId, planName }: PlanCardProps) {
  return (
    <Card variant="accent" className="mt-2">
      <p className="text-text-secondary text-sm">计划已生成</p>
      <p className="text-text-primary font-heading">{planName || '健身计划'}</p>
      <a href={`/plans/${planId}`} className="text-accent-orange text-sm hover:text-accent-red mt-2 inline-block">
        查看计划详情 →
      </a>
    </Card>
  );
}