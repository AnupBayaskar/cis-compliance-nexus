
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  Globe, 
  Users, 
  Award,
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="section-padding" style={{
        background: 'linear-gradient(135deg, rgba(74, 185, 87, 0.1) 0%, rgba(88, 88, 90, 0.1) 100%)',
        position: 'relative'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(74, 185, 87, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(88, 88, 90, 0.1) 0%, transparent 50%)'
        }} />
        
        <div className="container position-relative">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="animate-fade-in-up">
                <h1 className="display-3 fw-bold mb-4 gradient-text animate-float">
                  CIS Web Compliance
                </h1>
                <p className="lead mb-5" style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem' }}>
                  Streamline your security posture with comprehensive CIS benchmark compliance testing and reporting
                </p>
                
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-5">
                  <Link 
                    to="/benchmarks" 
                    className="btn btn-brand btn-lg d-flex align-items-center justify-content-center hover-lift"
                    style={{ padding: '12px 32px' }}
                  >
                    <FileText size={20} className="me-2" />
                    View Benchmarks
                    <ArrowRight size={20} className="ms-2" />
                  </Link>
                  <Link 
                    to="/compliance" 
                    className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center hover-lift"
                    style={{ 
                      padding: '12px 32px',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)'
                    }}
                  >
                    <CheckCircle size={20} className="me-2" />
                    Start Compliance Check
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About CIS Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 animate-fade-in-up">
              <div className="card border-0 glass-effect hover-lift h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Shield size={32} style={{ color: 'var(--brand-green)' }} className="me-3" />
                    <h2 className="h3 fw-bold mb-0">About CIS Benchmarks</h2>
                  </div>
                  <p style={{ color: 'var(--muted-foreground)' }}>
                    The Center for Internet Security (CIS) Benchmarks are globally recognized best practices for securing IT systems and data. 
                    These comprehensive guidelines help organizations establish a secure baseline configuration for their technology infrastructure.
                  </p>
                  <div className="row g-3 mt-3">
                    <div className="col-6">
                      <div className="text-center p-3 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                        <Award size={24} style={{ color: 'var(--brand-green)' }} className="mb-2" />
                        <div className="fw-semibold">Trusted</div>
                        <small style={{ color: 'var(--muted-foreground)' }}>Industry Standard</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-3 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                        <Globe size={24} style={{ color: 'var(--brand-green)' }} className="mb-2" />
                        <div className="fw-semibold">Global</div>
                        <small style={{ color: 'var(--muted-foreground)' }}>Recognition</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 animate-slide-in-right">
              <div className="card border-0 glass-effect hover-lift h-100">
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold mb-3">How It Works & Importance</h3>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex">
                      <div 
                        className="d-flex align-items-center justify-content-center flex-shrink-0 me-3 rounded-circle"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: 'rgba(74, 185, 87, 0.1)',
                          color: 'var(--brand-green)'
                        }}
                      >
                        1
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-1">Assessment</h5>
                        <p className="mb-0" style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                          Evaluate your systems against CIS benchmark controls
                        </p>
                      </div>
                    </div>
                    
                    <div className="d-flex">
                      <div 
                        className="d-flex align-items-center justify-content-center flex-shrink-0 me-3 rounded-circle"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: 'rgba(74, 185, 87, 0.1)',
                          color: 'var(--brand-green)'
                        }}
                      >
                        2
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-1">Reporting</h5>
                        <p className="mb-0" style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                          Generate comprehensive compliance reports and recommendations
                        </p>
                      </div>
                    </div>
                    
                    <div className="d-flex">
                      <div 
                        className="d-flex align-items-center justify-content-center flex-shrink-0 me-3 rounded-circle"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: 'rgba(74, 185, 87, 0.1)',
                          color: 'var(--brand-green)'
                        }}
                      >
                        3
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-1">Implementation</h5>
                        <p className="mb-0" style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                          Apply security controls to improve your compliance posture
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SmartEdge Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center animate-fade-in-up">
              <div className="card border-0 glass-effect hover-lift">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center justify-content-center mb-4">
                    <div 
                      className="d-flex align-items-center justify-content-center me-3 rounded-3"
                      style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, var(--brand-green) 0%, var(--brand-gray) 100%)'
                      }}
                    >
                      <span className="text-white fw-bold fs-5">SE</span>
                    </div>
                    <h2 className="h3 fw-bold mb-0 gradient-text">SmartEdge Solutions</h2>
                  </div>
                  
                  <p className="lead mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    Empowering organizations with cutting-edge cybersecurity solutions and compliance frameworks 
                    that adapt to the evolving threat landscape.
                  </p>
                  
                  <div className="row g-4 mb-4">
                    <div className="col-md-4">
                      <div className="text-center">
                        <Shield size={32} style={{ color: 'var(--brand-green)' }} className="mb-2" />
                        <h5 className="fw-semibold">Security First</h5>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                          Comprehensive security solutions
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center">
                        <Users size={32} style={{ color: 'var(--brand-green)' }} className="mb-2" />
                        <h5 className="fw-semibold">Expert Team</h5>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                          Certified security professionals
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center">
                        <Globe size={32} style={{ color: 'var(--brand-green)' }} className="mb-2" />
                        <h5 className="fw-semibold">Global Reach</h5>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                          Serving clients worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href="https://smartedge.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-brand d-inline-flex align-items-center hover-lift"
                  >
                    Visit SmartEdge.in
                    <ExternalLink size={16} className="ms-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Connect Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5 animate-fade-in-up">
                <h2 className="h3 fw-bold mb-3">Let's Connect</h2>
                <p className="lead" style={{ color: 'var(--muted-foreground)' }}>
                  Ready to enhance your security posture? Get in touch with our experts to discuss your compliance needs.
                </p>
              </div>
              
              <div className="row g-4">
                <div className="col-lg-4 animate-fade-in-up">
                  <div className="card border-0 glass-effect hover-lift h-100 text-center">
                    <div className="card-body p-4">
                      <Mail size={32} style={{ color: 'var(--brand-green)' }} className="mb-3" />
                      <h5 className="fw-semibold mb-2">Email Us</h5>
                      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                        Get in touch for compliance consultations
                      </p>
                      <a 
                        href="mailto:info@smartedge.in" 
                        className="btn btn-outline-secondary btn-sm"
                        style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green)' }}
                      >
                        Send Message
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="card border-0 glass-effect hover-lift h-100 text-center">
                    <div className="card-body p-4">
                      <Phone size={32} style={{ color: 'var(--brand-green)' }} className="mb-3" />
                      <h5 className="fw-semibold mb-2">Call Us</h5>
                      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                        Speak directly with our security experts
                      </p>
                      <a 
                        href="tel:+1234567890" 
                        className="btn btn-outline-secondary btn-sm"
                        style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green)' }}
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="card border-0 glass-effect hover-lift h-100 text-center">
                    <div className="card-body p-4">
                      <MapPin size={32} style={{ color: 'var(--brand-green)' }} className="mb-3" />
                      <h5 className="fw-semibold mb-2">Visit Us</h5>
                      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                        Meet our team at our office location
                      </p>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green)' }}
                      >
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
