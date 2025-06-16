
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Home, FileText, CheckCircle, User, Moon, Sun } from 'lucide-react';

const navigationItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Benchmarks', url: '/benchmarks', icon: FileText },
  { title: 'Compliance', url: '/compliance', icon: CheckCircle },
  { title: 'Profile', url: '/profile', icon: User },
];

export function ModernSidebar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-16 bg-background/80 backdrop-blur-xl border-r border-border/50">
      <div className="flex flex-col h-full py-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link 
            to="/" 
            className="w-8 h-8 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <span className="text-white font-bold text-xs">C</span>
          </Link>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group relative",
                location.pathname === item.url
                  ? "bg-gradient-to-br from-brand-green to-brand-gray text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              
              {/* Tooltip */}
              <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg border">
                {item.title}
              </div>
            </Link>
          ))}
        </nav>
        
        {/* Theme Toggle */}
        <div className="px-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-12 h-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 group relative"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            
            {/* Tooltip */}
            <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg border">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
