import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="bg-primary-secondary border-b-2 border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <Link to="/chat" className="font-heading text-2xl font-bold text-accent-orange">
          FITLC
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-text-secondary text-sm">
              {user.email}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}