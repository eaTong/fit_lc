import { useSearchParams } from 'react-router-dom';
import DashboardTab from '../components/tabs/DashboardTab';
import HistoryTab from '../components/tabs/HistoryTab';
import TrendsTab from '../components/tabs/TrendsTab';
import MeasurementsTab from '../components/tabs/MeasurementsTab';

type DataTab = 'dashboard' | 'history' | 'trends' | 'measurements';

export default function History() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as DataTab) || 'dashboard';

  const setTab = (tab: DataTab) => {
    setSearchParams({ tab });
  };

  const tabs: { key: DataTab; label: string }[] = [
    { key: 'dashboard', label: '看板' },
    { key: 'history', label: '训练历史' },
    { key: 'trends', label: '趋势分析' },
    { key: 'measurements', label: '围度记录' },
  ];

  return (
    <div className="p-4">
      {/* 子Tab切换 */}
      <div className="flex border-b-2 border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            className={`px-4 py-2 font-heading uppercase tracking-wide transition-colors
              ${currentTab === tab.key
                ? 'text-accent-orange border-b-2 border-accent-orange -mb-px'
                : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab内容 */}
      <div className="mt-4">
        {currentTab === 'dashboard' && <DashboardTab />}
        {currentTab === 'history' && <HistoryTab />}
        {currentTab === 'trends' && <TrendsTab />}
        {currentTab === 'measurements' && <MeasurementsTab />}
      </div>
    </div>
  );
}