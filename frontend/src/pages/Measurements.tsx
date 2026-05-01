import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../api/user';
import MeasurementCard from '../components/MeasurementCard';
import MeasurementHistoryModal from '../components/MeasurementHistoryModal';

const BODY_PARTS_SINGLE = [
  { key: 'neck', label: '颈围' },
  { key: 'chest', label: '胸围' },
  { key: 'shoulder', label: '肩宽' },
  { key: 'waist', label: '腰围' },
  { key: 'hips', label: '臀围' },
];

const BODY_PARTS_PAIRED = [
  { leftKey: 'biceps_l', rightKey: 'biceps_r', leftLabel: '左臂围', rightLabel: '右臂围' },
  { leftKey: 'thigh_l', rightKey: 'thigh_r', leftLabel: '左大腿围', rightLabel: '右大腿围' },
  { leftKey: 'calf_l', rightKey: 'calf_r', leftLabel: '左小腿围', rightLabel: '右小腿围' },
];

const ALL_PARTS = [
  ...BODY_PARTS_SINGLE,
  ...BODY_PARTS_PAIRED.map(p => ({ key: p.leftKey, label: p.leftLabel })),
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

  const selectedPartInfo = ALL_PARTS.find(p => p.key === selectedPart);
  const hasAnyData = Object.values(latestData).some(v => v !== null);

  return (
    <div className="px-6 py-4">
      <h1 className="font-heading text-3xl font-bold mb-6">身体围度</h1>

      {loading ? (
        <div className="text-center text-text-muted py-10">加载中...</div>
      ) : (
        <div className="bg-primary-secondary border-2 border-border">
          {BODY_PARTS_SINGLE.map((part) => (
            <MeasurementCard
              key={part.key}
              bodyPart={part.key}
              label={part.label}
              value={latestData[part.key]?.value ?? null}
              date={latestData[part.key]?.date}
              onClick={() => handlePartClick(part.key)}
              className="border-b border-border"
            />
          ))}
          {BODY_PARTS_PAIRED.map((pair) => (
            <div key={pair.leftKey} className="flex">
              <MeasurementCard
                bodyPart={pair.leftKey}
                label={pair.leftLabel}
                value={latestData[pair.leftKey]?.value ?? null}
                date={latestData[pair.leftKey]?.date}
                onClick={() => handlePartClick(pair.leftKey)}
                className="flex-1 border-r border-border"
              />
              <MeasurementCard
                bodyPart={pair.rightKey}
                label={pair.rightLabel}
                value={latestData[pair.rightKey]?.value ?? null}
                date={latestData[pair.rightKey]?.date}
                onClick={() => handlePartClick(pair.rightKey)}
                className="flex-1"
              />
            </div>
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