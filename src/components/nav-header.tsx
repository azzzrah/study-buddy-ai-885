import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, LayoutDashboard, Upload, LogOut } from 'lucide-react';

export function NavHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/upload', label: 'Upload', icon: Upload },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors">
          <Brain className="h-6 w-6 text-primary" />
          <span>MasteryQuiz</span>
        </button>

        <nav className="flex items-center gap-1">
          {links.map(({ path, label, icon: Icon }) => (
            <Button
              key={path}
              variant={location.pathname === path ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate(path)}
              className="gap-1.5"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="ml-2 text-muted-foreground">
            <LogOut className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
