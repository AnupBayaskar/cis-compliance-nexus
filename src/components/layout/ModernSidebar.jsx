
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  CheckCircle, 
  User, 
  Moon, 
  Sun,
  Shield
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ModernSidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const mainNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/benchmarks', icon: FileText, label: 'View Benchmarks' },
    { path: '/compliance', icon: CheckCircle, label: 'Compliance Check' },
    { path: '/profile', icon: User, label: 'User Profile' }
  ];

  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="sidebar-container"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="sidebar-content">
        {/* Brand Section */}
        <motion.div 
          className="sidebar-brand"
          variants={itemVariants}
        >
          <div className="brand-logo-lg">
            <Shield className="text-white" size={24} />
          </div>
          <h5 className="text-white mb-0 fw-bold">SmartEdge</h5>
          <small className="text-white-50">Security Solutions</small>
        </motion.div>

        {/* Navigation */}
        <motion.nav className="sidebar-nav" variants={itemVariants}>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Separator */}
        <motion.hr 
          className="sidebar-separator" 
          variants={itemVariants}
        />

        {/* Theme Toggle */}
        <motion.div variants={itemVariants}>
          <button
            onClick={toggleTheme}
            className="sidebar-link w-100 border-0 bg-transparent"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModernSidebar;
