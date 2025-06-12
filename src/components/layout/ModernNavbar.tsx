
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink, User } from 'lucide-react';

const ModernNavbar = () => {
  const { user, logout } = useAuth();

  const navbarStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: '64px',
    backgroundColor: 'rgba(var(--bs-body-bg-rgb), 0.8)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(var(--bs-border-color-rgb), 0.5)',
    WebkitBackdropFilter: 'blur(16px)',
  };

  const logoStyle = {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #4ade80 0%, #6b7280 100%)',
    borderRadius: '8px',
  };

  const gradientTextStyle = {
    background: 'linear-gradient(to right, #4ade80, #6b7280)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <nav style={navbarStyle}>
      <div className="h-100 px-4 d-flex align-items-center justify-content-between">
        {/* Left side - Logo and Brand */}
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div 
              className="d-flex align-items-center justify-content-center me-3"
              style={logoStyle}
            >
              <span className="text-white fw-bold" style={{ fontSize: '14px' }}>SE</span>
            </div>
            <Link 
              to="/" 
              className="text-decoration-none fs-5 fw-bold"
              style={{
                ...gradientTextStyle,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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
            className="btn btn-link text-decoration-none d-flex align-items-center text-muted me-3 p-2"
            style={{ 
              fontSize: '14px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.classList.remove('text-muted')}
            onMouseLeave={(e) => e.currentTarget.classList.add('text-muted')}
          >
            <span className="me-2">SmartEdge.in</span>
            <ExternalLink size={16} />
          </a>
          
          {user ? (
            <div className="d-flex align-items-center">
              <Link 
                to="/profile" 
                className="btn btn-link text-decoration-none d-flex align-items-center text-muted me-3 p-2"
                style={{ 
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.classList.remove('text-muted')}
                onMouseLeave={(e) => e.currentTarget.classList.add('text-muted')}
              >
                <User size={16} className="me-2" />
                <span>{user.name}</span>
              </Link>
              <button 
                className="btn btn-outline-success btn-sm"
                onClick={logout}
                style={{
                  borderColor: 'rgba(74, 222, 128, 0.2)',
                  color: '#4ade80',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.2)';
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/auth"
              className="btn btn-sm text-white"
              style={{
                backgroundColor: '#4ade80',
                borderColor: '#4ade80',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4ade80'}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
