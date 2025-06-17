
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink, User, X } from 'lucide-react';
import Modal from '@/components/ui/modal';

const ModernNavbar = () => {
  const { user, logout } = useAuth();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-lg border-b border-border/50 supports-[backdrop-filter]:bg-background/60">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SE</span>
              </div>
              <Link 
                to="/" 
                className="text-xl font-bold bg-gradient-to-r from-brand-green to-brand-gray bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                CIS Web Compliance
              </Link>
            </div>
          </div>
          
          {/* Right side - External link, How It Works, and Auth */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHowItWorks(true)}
              className="hover:bg-muted/50"
            >
              How It Works
            </Button>
            
            <Button variant="ghost" size="sm" asChild className="hover:bg-muted/50">
              <a 
                href="https://smartedge.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>SmartEdge.in</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild className="hover:bg-muted/50">
                  <Link to="/profile" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="border-brand-green/20 hover:bg-brand-green/10 hover:text-brand-green hover:border-brand-green/40 transition-all"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button size="sm" asChild className="bg-brand-green hover:bg-brand-green/90 text-white">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowHowItWorks(false)}
          />
          <div className="relative bg-background border border-border rounded-lg shadow-2xl w-full mx-4 max-w-2xl animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">How It Works</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHowItWorks(false)}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Select Your Device</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from your registered devices or add a new one to begin your compliance assessment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Download Benchmarks</h3>
                    <p className="text-sm text-muted-foreground">
                      Get the latest CIS benchmark files in your preferred format (PDF, CSV, or JSON).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Review Security Controls</h3>
                    <p className="text-sm text-muted-foreground">
                      Go through each security control and mark them as:
                    </p>
                    <ul className="text-sm text-muted-foreground ml-4 mt-2 space-y-1">
                      <li>✅ Compliant (Pass)</li>
                      <li>❌ Non-compliant (Fail)</li>
                      <li>⚠️ Skipped (Not Applicable)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Generate Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Once all controls are reviewed, generate comprehensive GRC reports for compliance documentation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong> Save your configurations to quickly resume assessments later or compare results across different time periods.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernNavbar;
