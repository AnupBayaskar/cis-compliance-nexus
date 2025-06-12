
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink, User } from 'lucide-react';

const ModernNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-fixed glass-effect d-flex align-items-center">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Left side - Logo and Brand */}
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <div 
                className="d-flex align-items-center justify-content-center me-3 rounded"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, var(--brand-green) 0%, var(--brand-gray) 100%)'
                }}
              >
                <span className="text-white fw-bold" style={{ fontSize: '14px' }}>SE</span>
              </div>
              <Link 
                to="/" 
                className="text-decoration-none fs-5 fw-bold gradient-text"
                style={{ transition: 'opacity 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget).style.opacity = '0.8'}
                onMouseLeave={(e) => (e.currentTarget).style.opacity = '1'}
              >
                CIS Web Compliance
              </Link>
            </div>
          </div>
          
          {/* Right side - External link and Auth */}
          <div className="d-flex align-items-center">
            <a 
              href="https://smartedge.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-link text-decoration-none d-flex align-items-center me-3 p-2"
              style={{ 
                color: 'var(--muted-foreground)',
                transition: 'color 0.2s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => (e.currentTarget).style.color = 'var(--foreground)'}
              onMouseLeave={(e) => (e.currentTarget).style.color = 'var(--muted-foreground)'}
            >
              <span className="me-2">SmartEdge.in</span>
              <ExternalLink size={16} />
            </a>
            
            {user ? (
              <div className="d-flex align-items-center">
                <Link 
                  to="/profile" 
                  className="btn btn-link text-decoration-none d-flex align-items-center me-3 p-2"
                  style={{ 
                    color: 'var(--muted-foreground)',
                    transition: 'color 0.2s ease',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget).style.color = 'var(--foreground)'}
                  onMouseLeave={(e) => (e.currentTarget).style.color = 'var(--muted-foreground)'}
                >
                  <User size={16} className="me-2" />
                  <span>{user.name}</span>
                </Link>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={logout}
                  style={{
                    borderColor: 'rgba(74, 185, 87, 0.2)',
                    color: 'var(--brand-green)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget).style.backgroundColor = 'rgba(74, 185, 87, 0.1)';
                    (e.currentTarget).style.borderColor = 'rgba(74, 185, 87, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget).style.backgroundColor = 'transparent';
                    (e.currentTarget).style.borderColor = 'rgba(74, 185, 87, 0.2)';
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-brand btn-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
