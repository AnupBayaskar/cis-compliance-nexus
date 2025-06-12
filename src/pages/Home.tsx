
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, FileText, Zap, Users, Globe, ArrowRight } from 'lucide-react';

const Home = () => {
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #4ade80, #6b7280)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const cardStyle = {
    backgroundColor: 'rgba(var(--bs-body-bg-rgb), 0.5)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(var(--bs-border-color-rgb), 0.5)',
    WebkitBackdropFilter: 'blur(16px)',
  };

  const gradientBgStyle = {
    background: 'linear-gradient(135deg, var(--bs-body-bg) 0%, rgba(var(--bs-secondary-bg-rgb), 0.2) 50%, var(--bs-body-bg) 100%)',
  };

  const gridBgStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(var(--bs-border-color-rgb), 0.3) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(var(--bs-border-color-rgb), 0.3) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  };

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section 
        className="position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center"
        style={gradientBgStyle}
      >
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ ...gridBgStyle, opacity: 0.3 }}
        />
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.05) 0%, transparent 50%, rgba(107, 114, 128, 0.05) 100%)'
          }}
        />
        
        <div className="position-relative container text-center px-4" style={{ zIndex: 10 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-1 fw-bold mb-4" style={gradientTextStyle}>
                CIS Web Compliance
              </h1>
              <p className="fs-4 text-muted mb-5 lh-base">
                Professional benchmark compliance platform for enterprise security excellence
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-4 justify-content-center align-items-center">
                <Link 
                  to="/benchmarks"
                  className="btn btn-lg text-white d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: '#4ade80',
                    borderColor: '#4ade80',
                    minWidth: '220px',
                    height: '56px',
                    fontSize: '18px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.9)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4ade80';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FileText size={20} />
                  <span>View Benchmarks</span>
                  <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/compliance"
                  className="btn btn-outline-success btn-lg d-flex align-items-center gap-2"
                  style={{
                    borderColor: 'rgba(74, 222, 128, 0.2)',
                    color: '#4ade80',
                    minWidth: '220px',
                    height: '56px',
                    fontSize: '18px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.4)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.2)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <CheckCircle size={20} />
                  <span>Compliance Check</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is CIS Section */}
      <section className="py-5 py-lg-6">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h2 className="display-4 fw-bold mb-4" style={gradientTextStyle}>What is CIS?</h2>
              <p className="fs-5 text-muted mb-4 lh-base">
                The Center for Internet Security (CIS) provides globally recognized security standards 
                that help organizations improve their cybersecurity posture through actionable controls 
                and benchmarks.
              </p>
              <div className="d-flex flex-column gap-4">
                {[
                  {
                    icon: Shield,
                    title: 'Security Controls',
                    description: 'Proven cybersecurity framework with 18 critical security controls'
                  },
                  {
                    icon: CheckCircle,
                    title: 'Configuration Benchmarks',
                    description: 'Secure configuration guidelines for 100+ technologies'
                  },
                  {
                    icon: Globe,
                    title: 'Global Standard',
                    description: 'Adopted by organizations worldwide for cybersecurity excellence'
                  }
                ].map((item, index) => (
                  <div key={index} className="d-flex align-items-start gap-3">
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'rgba(74, 222, 128, 0.1)',
                        flexShrink: 0,
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.1)'}
                    >
                      <item.icon size={24} color="#4ade80" />
                    </div>
                    <div>
                      <h3 className="fs-5 fw-semibold mb-2">{item.title}</h3>
                      <p className="text-muted mb-0">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-lg-6">
              <div 
                className="card h-100"
                style={{
                  ...cardStyle,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="card-header border-0 bg-transparent">
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-2"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'rgba(74, 222, 128, 0.1)'
                      }}
                    >
                      <Shield size={24} color="#4ade80" />
                    </div>
                    <h3 className="fs-4 fw-bold mb-0">CIS Critical Security Controls</h3>
                  </div>
                  <p className="text-muted mt-2 mb-0">
                    Essential cybersecurity practices for organizations of all sizes
                  </p>
                </div>
                <div className="card-body">
                  {[
                    'Inventory & Control of Assets',
                    'Inventory & Control of Software',
                    'Continuous Vulnerability Management',
                    'Controlled Use of Admin Privileges'
                  ].map((control, index) => (
                    <div 
                      key={index} 
                      className="d-flex justify-content-between align-items-center p-3 rounded-2 mb-2"
                      style={{
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--bs-secondary-bg-rgb), 0.5)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span className="fw-medium">{control}</span>
                      <CheckCircle size={20} color="#4ade80" />
                    </div>
                  ))}
                  <div className="text-center pt-3 border-top">
                    <small className="text-muted">+ 14 more critical controls</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-5 py-lg-6" style={{ backgroundColor: 'rgba(var(--bs-secondary-bg-rgb), 0.3)' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-4" style={gradientTextStyle}>How It Works</h2>
            <p className="fs-5 text-muted">
              Simple, efficient compliance checking in three easy steps
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                icon: FileText,
                title: '1. Select Benchmark',
                description: 'Choose from our comprehensive library of CIS benchmarks for your specific technology stack'
              },
              {
                icon: CheckCircle,
                title: '2. Run Assessment',
                description: 'Execute automated compliance checks against your infrastructure and configurations'
              },
              {
                icon: Zap,
                title: '3. Get Results',
                description: 'Receive detailed GRC reports with actionable insights and remediation guidance'
              }
            ].map((step, index) => (
              <div key={index} className="col-md-4">
                <div 
                  className="card h-100 text-center"
                  style={{
                    ...cardStyle,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="card-header border-0 bg-transparent pb-2">
                    <div 
                      className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-4"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(107, 114, 128, 0.2) 100%)',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <step.icon size={40} color="#4ade80" />
                    </div>
                    <h3 className="fs-4 fw-bold">{step.title}</h3>
                  </div>
                  <div className="card-body">
                    <p className="text-muted lh-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-5 py-lg-6">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-4" style={gradientTextStyle}>Why CIS Compliance Matters</h2>
            <p className="fs-5 text-muted">
              Essential for modern cybersecurity and regulatory compliance
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                icon: Shield,
                title: 'Risk Reduction',
                description: 'Significantly reduce cybersecurity risks through proven security controls and best practices'
              },
              {
                icon: CheckCircle,
                title: 'Regulatory Compliance',
                description: 'Meet industry standards and regulatory requirements with confidence and documentation'
              },
              {
                icon: Users,
                title: 'Industry Recognition',
                description: 'Demonstrate security maturity to clients, partners, and stakeholders with CIS compliance'
              }
            ].map((item, index) => (
              <div key={index} className="col-lg-4">
                <div 
                  className="p-4 rounded-4 h-100"
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--bs-secondary-bg-rgb), 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-4 mb-4"
                    style={{
                      width: '64px',
                      height: '64px',
                      background: 'linear-gradient(135deg, #4ade80 0%, #6b7280 100%)',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <item.icon size={32} color="white" />
                  </div>
                  <h3 className="fs-4 fw-semibold mb-3">{item.title}</h3>
                  <p className="text-muted lh-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain/SmartEdge Information */}
      <section className="py-5 py-lg-6" style={{ backgroundColor: 'rgba(var(--bs-secondary-bg-rgb), 0.3)' }}>
        <div className="container py-5 text-center">
          <h2 className="display-4 fw-bold mb-4" style={gradientTextStyle}>About SmartEdge</h2>
          <p className="fs-5 text-muted mb-5 mx-auto" style={{ maxWidth: '800px' }}>
            SmartEdge is a leading cybersecurity company specializing in compliance automation, 
            security assessments, and enterprise risk management solutions. We help organizations 
            achieve and maintain compliance with industry standards through cutting-edge technology.
          </p>
          <a 
            href="https://smartedge.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline-success btn-lg d-flex align-items-center gap-2 mx-auto"
            style={{
              borderColor: 'rgba(74, 222, 128, 0.2)',
              color: '#4ade80',
              maxWidth: '200px',
              height: '48px',
              transition: 'all 0.3s ease'
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
            <span>Visit SmartEdge.in</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Let's Connect */}
      <section className="py-5 py-lg-6">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div 
                className="card p-5 text-center"
                style={cardStyle}
              >
                <h2 className="display-5 fw-bold mb-4" style={gradientTextStyle}>Let's Connect</h2>
                <p className="fs-5 text-muted mb-4 lh-base">
                  Ready to enhance your organization's security posture? Get in touch with our experts 
                  to learn how CIS compliance can benefit your business.
                </p>
                <button 
                  className="btn btn-lg text-white"
                  style={{
                    backgroundColor: '#4ade80',
                    borderColor: '#4ade80',
                    height: '56px',
                    fontSize: '18px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.9)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#4ade80';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
