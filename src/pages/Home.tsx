
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Shield, 
  FileText, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Lock, 
  BarChart3,
  ChevronDown
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-brand-green border-brand-green">
                  CIS Benchmarks Compliance
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Secure Your
                  <span className="block gradient-text">Infrastructure</span>
                  with Confidence
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Comprehensive CIS benchmark compliance checking and reporting platform 
                  for modern enterprises. Assess, monitor, and improve your security posture.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6 bg-brand-green hover:bg-brand-green/90">
                  <Link to={user ? "/compliance" : "/auth"} className="flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
                  <Link to="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-gray/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card border rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Security Assessment</h3>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      85% Compliant
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm">CIS-1.1.1 Partition Configuration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm">CIS-2.1.1 Service Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-amber-600" />
                      <span className="text-sm">CIS-3.1.1 Network Security</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      View Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-brand-green" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CIS Web Compliance?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for security professionals who need reliable, comprehensive compliance management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-brand-green mb-4" />
                <CardTitle>Comprehensive Benchmarks</CardTitle>
                <CardDescription>
                  Access to complete CIS benchmark libraries covering all major operating systems and applications
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-brand-green mb-4" />
                <CardTitle>Real-time Reporting</CardTitle>
                <CardDescription>
                  Generate detailed compliance reports with actionable insights and compliance scoring
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-brand-green mb-4" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Share configurations, collaborate on assessments, and maintain compliance across teams
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">500+</div>
              <div className="text-muted-foreground">Security Controls</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">25+</div>
              <div className="text-muted-foreground">Supported Platforms</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Reliability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">24/7</div>
              <div className="text-muted-foreground">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-brand-green/10 to-brand-gray/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Strengthen Your Security Posture?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations using CIS Web Compliance to maintain robust security standards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-brand-green hover:bg-brand-green/90">
              <Link to={user ? "/compliance" : "/auth"} className="flex items-center space-x-2">
                <span>Start Free Assessment</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/benchmarks">Browse Benchmarks</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
