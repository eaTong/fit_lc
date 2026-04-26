interface Tab {
  id: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b-2 border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-3 font-heading font-semibold uppercase tracking-wide
            transition-all duration-150 border-b-2 -mb-[2px]
            ${
              activeTab === tab.id
                ? 'text-accent-orange border-accent-orange'
                : 'text-text-secondary border-transparent hover:text-text-primary'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}