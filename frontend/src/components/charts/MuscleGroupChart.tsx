import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { type MuscleGroupVolume } from '../../api/achievement';

interface MuscleGroupChartProps {
  data: MuscleGroupVolume[];
}

const GROUP_COLORS: Record<string, string> = {
  chest: '#FF4500',
  back: '#3B82F6',
  legs: '#22C55E',
  shoulders: '#A855F7',
  arms: '#F59E0B',
  core: '#EC4899',
  other: '#6B7280',
};

export default function MuscleGroupChart({ data }: MuscleGroupChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-secondary">暂无训练数据</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" stroke="#888" tickFormatter={(v) => `${(v / 1000).toFixed(0)}t`} />
          <YAxis type="category" dataKey="name" stroke="#888" width={60} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '2px solid #333',
              borderRadius: 0,
            }}
            formatter={(value: number) => [`${value.toLocaleString()} kg`, '训练量']}
          />
          <Bar dataKey="volume" name="训练量">
            {data.map((entry) => (
              <Cell key={entry.group} fill={GROUP_COLORS[entry.group] || '#6B7280'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
