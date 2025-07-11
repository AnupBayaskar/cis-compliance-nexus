
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, CheckCircle, Users, BarChart3, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const getMainButton = () => {
    if (!user) {
      return (
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Shield className="mr-2 h-5 w-5" />
          Login
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    }

    switch (user.role) {
      case 'member':
        return (
          <Link to="/compliance-space">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Shield className="mr-2 h-5 w-5" />
              Mark Compliance
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        );
      case 'validator':
        return (
          <Link to="/validation-space">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <CheckCircle className="mr-2 h-5 w-5" />
              Validate Configurations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        );
      case 'team-lead':
        return (
          <Link to="/team-space">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Users className="mr-2 h-5 w-5" />
              Manage Teams
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        );
      case 'organization-lead':
        return (
          <Link to="/organization-space">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Award className="mr-2 h-5 w-5" />
              Manage Organization
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        );
      default:
        return (
          <Link to="/compliance-space">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Shield className="mr-2 h-5 w-5" />
              Mark Compliance
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-primary-foreground filter drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            CIS Compliance
            <span className="block text-primary">Made Simple</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your cybersecurity compliance with our comprehensive CIS Controls framework. 
            Validate, track, and maintain your security posture with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {getMainButton()}
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          {user && (
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-primary">
                <Users className="w-5 h-5" />
                <span className="font-medium">Welcome, {user.name}</span>
              </div>
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <div className="flex items-center space-x-2 text-primary">
                <Award className="w-5 h-5" />
                <span className="font-medium">{user.organizationName}</span>
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="glass-card hover-lift">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">CIS Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Comprehensive implementation of CIS Critical Security Controls for robust cybersecurity.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Expert validation of compliance configurations with detailed feedback and recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Comprehensive reporting and analytics to track compliance status and progress.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Collaborative platform for teams to work together on compliance initiatives.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 shadow-xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Security Teams</h2>
            <p className="text-muted-foreground">Join organizations worldwide in achieving cybersecurity excellence</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Organizations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm text-muted-foreground">Devices Secured</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Secure Your Infrastructure?</h2>
              <p className="text-muted-foreground mb-6">
                Start your compliance journey today with our comprehensive CIS Controls implementation platform.
              </p>
              {!user ? (
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/compliance-space">
                    <Button size="lg">
                      Start Compliance Check
                    </Button>
                  </Link>
                  <Link to="/reports-space">
                    <Button variant="outline" size="lg">
                      View Reports
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
