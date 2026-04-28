import Modal from './ui/Modal';
import type { MeasurementHistory } from '../api/user';

interface MeasurementHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bodyPart: string;
  label: string;
  data?: MeasurementHistory;
  onPageChange: (page: number) => void;
}

export default function MeasurementHistoryModal({ isOpen, onClose, bodyPart, label, data, onPageChange }: MeasurementHistoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${label}历史记录`} size="sm">
      {data?.history.length === 0 ? (
        <p className="text-text-muted text-sm">暂无记录</p>
      ) : (
        <div className="space-y-2">
          {data?.history.map((h, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border">
              <span className="text-text-muted text-sm">{h.date}</span>
              <span className="text-text-primary font-heading">{h.value} cm</span>
            </div>
          ))}
        </div>
      )}
      {data && data.pagination.total > 10 && (
        <div className="mt-4 flex justify-center gap-2">
          {data.pagination.page > 1 && (
            <button onClick={() => onPageChange(data.pagination.page - 1)} className="text-accent-orange text-sm">
              上一页
            </button>
          )}
          <span className="text-text-muted text-sm">
            {data.pagination.page} / {Math.ceil(data.pagination.total / data.pagination.limit)}
          </span>
          {data.pagination.page < Math.ceil(data.pagination.total / data.pagination.limit) && (
            <button onClick={() => onPageChange(data.pagination.page + 1)} className="text-accent-orange text-sm">
              下一页
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}