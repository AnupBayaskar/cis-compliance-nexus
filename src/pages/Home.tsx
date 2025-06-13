
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, FileText, Zap, Users, Globe, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Home = () => {
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding gradient-bg mesh-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in floating">
            <span className="gradient-text animate-gradient">CIS Web Compliance</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in max-w-2xl mx-auto leading-relaxed">
            Professional benchmark compliance platform for enterprise security excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            <Button size="lg" asChild className="min-w-[200px] hover-lift bg-gradient-to-r from-brand-green to-brand-gray hover:opacity-90 group">
              <Link to="/benchmarks" className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>View Benchmarks</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[200px] hover-lift glass-effect group">
              <Link to="/compliance" className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Compliance Check</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is CIS Section */}
      <section className="section-padding scroll-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                What is CIS?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Center for Internet Security (CIS) provides globally recognized security standards 
                that help organizations improve their cybersecurity posture through actionable controls 
                and benchmarks.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Security Controls",
                    description: "Proven cybersecurity framework with 18 critical security controls"
                  },
                  {
                    icon: CheckCircle,
                    title: "Configuration Benchmarks", 
                    description: "Secure configuration guidelines for 100+ technologies"
                  },
                  {
                    icon: Globe,
                    title: "Global Standard",
                    description: "Adopted by organizations worldwide for cybersecurity excellence"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover-glow p-4 rounded-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="hover-lift card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span>CIS Critical Security Controls</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Essential cybersecurity practices for organizations of all sizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Inventory & Control of Assets",
                  "Inventory & Control of Software", 
                  "Continuous Vulnerability Management",
                  "Controlled Use of Admin Privileges"
                ].map((control, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <span className="font-medium">{control}</span>
                    <CheckCircle className="h-5 w-5 text-brand-green" />
                  </div>
                ))}
                <div className="text-center pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">+ 14 more critical controls</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section-padding bg-muted/30 scroll-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, efficient compliance checking in three easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                step: "1",
                title: "Select Benchmark",
                description: "Choose from our comprehensive library of CIS benchmarks for your specific technology stack"
              },
              {
                icon: CheckCircle,
                step: "2", 
                title: "Run Assessment",
                description: "Execute automated compliance checks against your infrastructure and configurations"
              },
              {
                icon: Zap,
                step: "3",
                title: "Get Results",
                description: "Receive detailed GRC reports with actionable insights and remediation guidance"
              }
            ].map((step, index) => (
              <Card key={index} className="text-center hover-lift card-gradient group">
                <CardHeader className="pb-8">
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-green to-brand-gray rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-4">{step.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="section-padding scroll-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why CIS Compliance Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Essential for modern cybersecurity and regulatory compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            ].map((benefit, index) => (
              <div key={index} className="space-y-6 group hover-glow p-6 rounded-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-gray rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
