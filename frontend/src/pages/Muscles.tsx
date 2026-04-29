import { useSearchParams } from 'react-router-dom';
import MusclesList from '../components/tabs/MusclesList';
import ExercisesList from '../components/tabs/ExercisesList';

type KnowledgeTab = 'muscles' | 'exercises';

export default function Muscles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get('tab') as KnowledgeTab) || 'muscles';

  const setTab = (tab: KnowledgeTab) => {
    setSearchParams({ tab });
  };

  const tabs: { key: KnowledgeTab; label: string }[] = [
    { key: 'muscles', label: '肌肉库' },
    { key: 'exercises', label: '动作库' },
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
        {currentTab === 'muscles' && <MusclesList />}
        {currentTab === 'exercises' && <ExercisesList />}
      </div>
    </div>
  );
}