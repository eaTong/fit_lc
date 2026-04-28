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
  const hasAnyData = Object.values(latestData).some(v => v !== null);

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
              onClick={() => handlePartClick(part.key)}
            />
          ))}

          {!hasAnyData && (
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