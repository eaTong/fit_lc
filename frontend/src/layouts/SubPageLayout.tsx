import { useNavigate } from 'react-router-dom';

interface SubPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function SubPageLayout({ title, children }: SubPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <header className="bg-primary-secondary border-b-2 border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>←</span>
            <span>返回</span>
          </button>
          <h1 className="font-heading text-lg font-bold text-text-primary">{title}</h1>
          <div className="w-16" />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}