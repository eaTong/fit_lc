import { View } from '@tarojs/components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Cell, Legend, Pie } from 'recharts';
import './index.scss';

const COLORS = ['#FF4500', '#DC143C', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

interface LineChartData {
  date?: string;
  week?: string;
  [key: string]: any;
}

interface PieChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface TrendChartProps {
  type: 'line' | 'bar' | 'pie';
  data: LineChartData[] | PieChartData[];
  dataKey: string;
  xAxisKey?: string;
}

export default function TrendChart({ type, data, dataKey, xAxisKey }: TrendChartProps) {
  if (type === 'line') {
    return (
      <View className="trend-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data as LineChartData[]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey={xAxisKey || 'date'} stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333333' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Line type="monotone" dataKey={dataKey} stroke="#FF4500" strokeWidth={2} dot={{ fill: '#FF4500' }} />
          </LineChart>
        </ResponsiveContainer>
      </View>
    );
  }

  if (type === 'bar') {
    return (
      <View className="trend-chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data as LineChartData[]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey={xAxisKey || 'week'} stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333333' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Bar dataKey={dataKey} fill="#FF4500" />
          </BarChart>
        </ResponsiveContainer>
      </View>
    );
  }

  if (type === 'pie') {
    return (
      <View className="trend-chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data as PieChartData[]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333333' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </View>
    );
  }

  return null;
}