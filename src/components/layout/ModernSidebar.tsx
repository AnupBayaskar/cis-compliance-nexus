
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

  const sidebarStyle = {
    position: 'fixed' as const,
    left: 0,
    top: '64px',
    zIndex: 40,
    height: 'calc(100vh - 64px)',
    width: '80px',
    backgroundColor: 'rgba(var(--bs-body-bg-rgb), 0.8)',
    backdropFilter: 'blur(16px)',
    borderRight: '1px solid rgba(var(--bs-border-color-rgb), 0.5)',
    WebkitBackdropFilter: 'blur(16px)',
  };

  const getNavItemStyle = (isActive: boolean) => ({
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    backgroundColor: isActive ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
    color: isActive ? '#4ade80' : '#6b7280',
    border: 'none',
    cursor: 'pointer',
  });

  const activeIndicatorStyle = {
    position: 'absolute' as const,
    right: '-4px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '32px',
    backgroundColor: '#4ade80',
    borderRadius: '2px',
  };

  return (
    <aside style={sidebarStyle}>
      <div className="d-flex flex-column h-100 py-4">
        {/* Navigation Items */}
        <nav className="flex-grow-1 px-3">
          <div className="d-flex flex-column gap-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <div key={item.title} className="position-relative">
                  <Link
                    to={item.url}
                    className="btn d-flex align-items-center justify-content-center text-decoration-none"
                    style={getNavItemStyle(isActive)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(108, 114, 147, 0.1)';
                        e.currentTarget.style.color = 'var(--bs-body-color)';
                      }
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#6b7280';
                      }
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title={item.title}
                  >
                    <item.icon size={24} />
                    {isActive && <div style={activeIndicatorStyle} />}
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
        
        {/* Separator */}
        <div className="px-3 my-3">
          <hr style={{ 
            margin: 0, 
            borderColor: 'rgba(var(--bs-border-color-rgb), 0.5)',
            opacity: 1 
          }} />
        </div>
        
        {/* Theme Toggle */}
        <div className="px-3">
          <button
            onClick={toggleTheme}
            className="btn d-flex align-items-center justify-content-center"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(108, 114, 147, 0.1)';
              e.currentTarget.style.color = 'var(--bs-body-color)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? (
              <Moon size={24} />
            ) : (
              <Sun size={24} />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ModernSidebar;
