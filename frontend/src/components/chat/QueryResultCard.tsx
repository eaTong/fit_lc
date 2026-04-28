import Card from '../ui/Card';

interface QueryResultCardProps {
  queryType: 'workout' | 'measurement';
  summary: Record<string, number>;
}

export default function QueryResultCard({ queryType, summary }: QueryResultCardProps) {
  return (
    <Card variant="default" className="mt-2">
      <p className="text-text-secondary text-sm mb-2">
        {queryType === 'workout' ? '训练统计' : '围度统计'}
      </p>
      <div className="space-y-1">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-text-muted">{key}</span>
            <span className="text-text-primary">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}