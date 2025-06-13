
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink, User } from 'lucide-react';

export function ModernNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-16 right-0 z-40 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-brand-green to-brand-gray rounded"></div>
            <span className="font-semibold text-lg gradient-text">CIS Web Compliance</span>
          </div>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild className="hover:bg-muted/50 transition-colors">
            <a 
              href="https://smartedge.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <span>SmartEdge.in</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild className="hover:bg-muted/50 transition-colors">
                <Link to="/profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" asChild className="bg-gradient-to-r from-brand-green to-brand-gray hover:opacity-90 transition-opacity">
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
