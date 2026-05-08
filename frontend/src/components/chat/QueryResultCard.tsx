import Card from '../ui/Card';

const bodyPartLabels: Record<string, string> = {
  chest: '胸围',
  waist: '腰围',
  hips: '臀围',
  biceps: '臂围',
  biceps_l: '左臂围',
  biceps_r: '右臂围',
  thighs: '大腿围',
  thigh_l: '左大腿围',
  thigh_r: '右大腿围',
  calves: '小腿围',
  calf_l: '左小腿围',
  calf_r: '右小腿围',
  weight: '体重',
  bodyFat: '体脂率',
};

interface QueryResultCardProps {
  queryType: 'workout' | 'measurement';
  summary: Record<string, number>;
}

function formatLabel(key: string): string {
  if (bodyPartLabels[key]) return bodyPartLabels[key];
  if (key === 'totalVolume') return '总容量';
  if (key === 'totalWorkouts') return '训练次数';
  if (key === 'totalDuration') return '总时长';
  return key;
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
            <span className="text-text-muted">{formatLabel(key)}</span>
            <span className="text-text-primary">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}