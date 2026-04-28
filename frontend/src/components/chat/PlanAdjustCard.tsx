import Card from '../ui/Card';

interface PlanAdjustCardProps {
  planId: number;
  adjustment: string;
}

export default function PlanAdjustCard({ planId, adjustment }: PlanAdjustCardProps) {
  return (
    <Card variant="default" className="mt-2">
      <p className="text-text-secondary text-sm mb-1">计划已调整</p>
      <p className="text-text-primary text-sm">{adjustment}</p>
      <a href={`/plans/${planId}`} className="text-accent-orange text-sm hover:text-accent-red mt-2 inline-block">
        查看更新后的计划 →
      </a>
    </Card>
  );
}