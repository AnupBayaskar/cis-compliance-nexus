
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Home, FileText, CheckCircle, User, Moon, Sun } from 'lucide-react';

const navigationItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'View Benchmarks', url: '/benchmarks', icon: FileText },
  { title: 'Compliance Check', url: '/compliance', icon: CheckCircle },
  { title: 'User Profile', url: '/profile', icon: User },
];

const ModernSidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="sidebar-fixed glass-effect">
      <div className="d-flex flex-column h-100 py-3">
        {/* Navigation Items */}
        <nav className="flex-grow-1 px-3">
          <div className="d-flex flex-column gap-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <div key={item.title} className="position-relative">
                  <Link
                    to={item.url}
                    className={`d-flex align-items-center justify-content-center text-decoration-none rounded-3 position-relative`}
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: isActive ? 'rgba(74, 185, 87, 0.1)' : 'transparent',
                      color: isActive ? 'var(--brand-green)' : 'var(--muted-foreground)',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(74, 185, 87, 0.2)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget).style.color = 'var(--foreground)';
                        (e.currentTarget).style.backgroundColor = 'var(--muted)';
                      }
                      (e.currentTarget).style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget).style.color = 'var(--muted-foreground)';
                        (e.currentTarget).style.backgroundColor = 'transparent';
                      }
                      (e.currentTarget).style.transform = 'scale(1)';
                    }}
                    title={item.title}
                  >
                    <item.icon size={24} />
                    {isActive && (
                      <div 
                        className="position-absolute top-50 translate-middle-y rounded-pill"
                        style={{
                          right: '-4px',
                          width: '4px',
                          height: '32px',
                          backgroundColor: 'var(--brand-green)'
                        }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
        
        {/* Separator */}
        <div className="px-3 my-3">
          <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
        </div>
        
        {/* Theme Toggle */}
        <div className="px-3">
          <button
            onClick={toggleTheme}
            className="d-flex align-items-center justify-content-center text-decoration-none border-0 rounded-3"
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'transparent',
              color: 'var(--muted-foreground)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget).style.color = 'var(--foreground)';
              (e.currentTarget).style.backgroundColor = 'var(--muted)';
              (e.currentTarget).style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.color = 'var(--muted-foreground)';
              (e.currentTarget).style.backgroundColor = 'transparent';
              (e.currentTarget).style.transform = 'scale(1)';
            }}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ModernSidebar;
