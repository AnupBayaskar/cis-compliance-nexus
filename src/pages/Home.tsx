
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, FileText, Zap, Users, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            <span className="gradient-text">CIS Web Compliance</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
            Professional benchmark compliance platform for enterprise security excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            <Button size="lg" asChild className="min-w-[200px] hover-lift">
              <Link to="/benchmarks">
                <FileText className="mr-2 h-5 w-5" />
                View Benchmarks
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[200px] hover-lift">
              <Link to="/compliance">
                <CheckCircle className="mr-2 h-5 w-5" />
                Compliance Check
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is CIS Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">What is CIS?</h2>
              <p className="text-lg text-muted-foreground">
                The Center for Internet Security (CIS) provides globally recognized security standards 
                that help organizations improve their cybersecurity posture through actionable controls 
                and benchmarks.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-brand-green mt-1" />
                  <div>
                    <h3 className="font-semibold">Security Controls</h3>
                    <p className="text-muted-foreground">Proven cybersecurity framework with 18 critical security controls</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand-green mt-1" />
                  <div>
                    <h3 className="font-semibold">Configuration Benchmarks</h3>
                    <p className="text-muted-foreground">Secure configuration guidelines for 100+ technologies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-brand-green mt-1" />
                  <div>
                    <h3 className="font-semibold">Global Standard</h3>
                    <p className="text-muted-foreground">Adopted by organizations worldwide for cybersecurity excellence</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-brand-green" />
                  <span>CIS Critical Security Controls</span>
                </CardTitle>
                <CardDescription>
                  Essential cybersecurity practices for organizations of all sizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Inventory & Control of Assets</span>
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Inventory & Control of Software</span>
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Continuous Vulnerability Management</span>
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Controlled Use of Admin Privileges</span>
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                </div>
                <div className="text-center pt-2">
                  <span className="text-sm text-muted-foreground">+ 14 more controls</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section-padding bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple, efficient compliance checking in three easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover-lift">
              <CardHeader>
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-brand-green" />
                </div>
                <CardTitle>1. Select Benchmark</CardTitle>
                <CardDescription>
                  Choose from our comprehensive library of CIS benchmarks for your specific technology stack
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover-lift">
              <CardHeader>
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-brand-green" />
                </div>
                <CardTitle>2. Run Assessment</CardTitle>
                <CardDescription>
                  Execute automated compliance checks against your infrastructure and configurations
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover-lift">
              <CardHeader>
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-brand-green" />
                </div>
                <CardTitle>3. Get Results</CardTitle>
                <CardDescription>
                  Receive detailed GRC reports with actionable insights and remediation guidance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why CIS Compliance Matters</h2>
            <p className="text-xl text-muted-foreground">
              Essential for modern cybersecurity and regulatory compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Risk Reduction</h3>
              <p className="text-muted-foreground">
                Significantly reduce cybersecurity risks through proven security controls and best practices
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Regulatory Compliance</h3>
              <p className="text-muted-foreground">
                Meet industry standards and regulatory requirements with confidence and documentation
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Industry Recognition</h3>
              <p className="text-muted-foreground">
                Demonstrate security maturity to clients, partners, and stakeholders with CIS compliance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
