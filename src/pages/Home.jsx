
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  Zap, 
  Users, 
  Globe,
  ArrowRight,
  Star,
  Award,
  Target
} from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <motion.div variants={itemVariants}>
                <div className="hero-badge mb-4">
                  <Shield size={20} className="me-2" />
                  Professional Security Compliance
                </div>
              </motion.div>
              
              <motion.h1 
                className="hero-title mb-4"
                variants={itemVariants}
              >
                CIS Web <span className="gradient-text">Compliance</span>
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle mb-5"
                variants={itemVariants}
              >
                Professional benchmark compliance platform for enterprise security excellence.
                Ensure your infrastructure meets the highest security standards.
              </motion.p>
              
              <motion.div 
                className="hero-buttons d-flex gap-3 justify-content-center flex-wrap"
                variants={itemVariants}
              >
                <Link to="/benchmarks" className="btn btn-primary btn-lg hero-btn">
                  <FileText size={20} className="me-2" />
                  View Benchmarks
                  <ArrowRight size={16} className="ms-2" />
                </Link>
                <Link to="/compliance" className="btn btn-outline-primary btn-lg hero-btn">
                  <CheckCircle size={20} className="me-2" />
                  Compliance Check
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <motion.div 
            className="floating-card"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Shield size={24} className="text-primary" />
          </motion.div>
          <motion.div 
            className="floating-card floating-card-2"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Award size={24} className="text-success" />
          </motion.div>
        </div>
      </motion.section>

      {/* What is CIS Section */}
      <motion.section 
        className="section-padding bg-light"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div variants={itemVariants}>
                <div className="section-badge mb-3">
                  <Target size={16} className="me-2" />
                  Industry Standard
                </div>
                <h2 className="display-5 fw-bold mb-4">What is CIS?</h2>
                <p className="lead mb-4">
                  The Center for Internet Security (CIS) provides globally recognized security 
                  standards that help organizations improve their cybersecurity posture through 
                  actionable controls and benchmarks.
                </p>
                
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h5 className="mb-2">Security Controls</h5>
                      <p className="text-muted mb-0">
                        Proven cybersecurity framework with 18 critical security controls
                      </p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h5 className="mb-2">Configuration Benchmarks</h5>
                      <p className="text-muted mb-0">
                        Secure configuration guidelines for 100+ technologies
                      </p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h5 className="mb-2">Global Standard</h5>
                      <p className="text-muted mb-0">
                        Adopted by organizations worldwide for cybersecurity excellence
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="col-lg-6">
              <motion.div 
                className="cis-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-header d-flex align-items-center">
                  <Shield size={24} className="text-primary me-2" />
                  <h5 className="mb-0">CIS Critical Security Controls</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-4">
                    Essential cybersecurity practices for organizations of all sizes
                  </p>
                  
                  <div className="control-list">
                    {[
                      'Inventory & Control of Assets',
                      'Inventory & Control of Software',
                      'Continuous Vulnerability Management',
                      'Controlled Use of Admin Privileges'
                    ].map((control, index) => (
                      <div key={index} className="control-item">
                        <CheckCircle size={16} className="text-success me-2" />
                        <span>{control}</span>
                      </div>
                    ))}
                    <div className="text-center mt-3">
                      <small className="text-muted">+ 14 more controls</small>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How it Works Section */}
      <motion.section 
        className="section-padding"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.div className="text-center mb-5" variants={itemVariants}>
            <div className="section-badge mb-3 mx-auto">
              <Zap size={16} className="me-2" />
              Simple Process
            </div>
            <h2 className="display-5 fw-bold mb-4">How It Works</h2>
            <p className="lead text-muted">
              Simple, efficient compliance checking in three easy steps
            </p>
          </motion.div>
          
          <div className="row g-4">
            {[
              {
                icon: FileText,
                title: "Select Benchmark",
                description: "Choose from our comprehensive library of CIS benchmarks for your specific technology stack",
                step: "01"
              },
              {
                icon: CheckCircle,
                title: "Run Assessment",
                description: "Execute automated compliance checks against your infrastructure and configurations",
                step: "02"
              },
              {
                icon: Zap,
                title: "Get Results",
                description: "Receive detailed GRC reports with actionable insights and remediation guidance",
                step: "03"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="col-lg-4"
                variants={itemVariants}
              >
                <motion.div 
                  className="process-card text-center"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="process-step">{item.step}</div>
                  <div className="process-icon">
                    <item.icon size={32} />
                  </div>
                  <h4 className="mb-3">{item.title}</h4>
                  <p className="text-muted">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Importance Section */}
      <motion.section 
        className="section-padding bg-dark text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.div className="text-center mb-5" variants={itemVariants}>
            <div className="section-badge-dark mb-3 mx-auto">
              <Star size={16} className="me-2" />
              Why Choose Us
            </div>
            <h2 className="display-5 fw-bold mb-4">Why CIS Compliance Matters</h2>
            <p className="lead text-white-50">
              Essential for modern cybersecurity and regulatory compliance
            </p>
          </motion.div>
          
          <div className="row g-4">
            {[
              {
                icon: Shield,
                title: "Risk Reduction",
                description: "Significantly reduce cybersecurity risks through proven security controls and best practices"
              },
              {
                icon: CheckCircle,
                title: "Regulatory Compliance",
                description: "Meet industry standards and regulatory requirements with confidence and documentation"
              },
              {
                icon: Users,
                title: "Industry Recognition",
                description: "Demonstrate security maturity to clients, partners, and stakeholders with CIS compliance"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="col-lg-4"
                variants={itemVariants}
              >
                <motion.div 
                  className="importance-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="importance-icon">
                    <item.icon size={32} />
                  </div>
                  <h4 className="mb-3">{item.title}</h4>
                  <p className="text-white-50">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
