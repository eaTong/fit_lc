import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface ChartDataPoint {
  date: string;
  [key: string]: string | number | undefined;
}

interface TrendChartProps {
  type: 'line' | 'bar';
  data: ChartDataPoint[];
  lines?: { dataKey: string; color: string; name: string }[];
}

const COLORS = {
  orange: '#FF4500',
  red: '#DC143C',
  blue: '#3B82F6',
  green: '#22C55E',
  purple: '#A855F7',
};

export default function TrendChart({ type, data, lines = [] }: TrendChartProps) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '2px solid #333',
              borderRadius: 0,
            }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || COLORS.orange}
              name={line.name}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="date" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1A1A1A',
            border: '2px solid #333',
            borderRadius: 0,
          }}
        />
        <Bar dataKey="count" fill={COLORS.orange} name="训练次数" />
      </BarChart>
    </ResponsiveContainer>
  );
}