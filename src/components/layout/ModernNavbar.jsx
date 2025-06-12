
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ModernNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      className="navbar navbar-expand-lg fixed-top glass-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Brand */}
          <motion.div 
            className="d-flex align-items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="brand-logo me-3">
              <span className="text-white fw-bold">SE</span>
            </div>
            <Link to="/" className="navbar-brand gradient-text fs-4 fw-bold text-decoration-none">
              CIS Web Compliance
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <div className="d-flex align-items-center gap-3">
            <motion.a
              href="https://smartedge.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>SmartEdge.in</span>
              <ExternalLink size={16} />
            </motion.a>

            {user ? (
              <div className="d-flex align-items-center gap-3">
                <Link
                  to="/profile"
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                >
                  <User size={16} />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-outline-danger btn-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-primary btn-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;
