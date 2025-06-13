
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  Play,
  BarChart3,
  Globe
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Security Benchmarks',
      description: 'Access comprehensive CIS security benchmarks for various platforms and technologies.',
      link: '/benchmarks'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Assessment',
      description: 'Run automated compliance checks against industry-standard security frameworks.',
      link: '/compliance'
    },
    {
      icon: BarChart3,
      title: 'Risk Analytics',
      description: 'Analyze security posture and track improvements over time with detailed reporting.',
      link: '/compliance'
    },
    {
      icon: Globe,
      title: 'Multi-Platform Support',
      description: 'Support for Windows, Linux, cloud platforms, databases, and network devices.',
      link: '/benchmarks'
    }
  ];

  const stats = [
    { label: 'Security Benchmarks', value: '200+', icon: FileText },
    { label: 'Compliance Checks', value: '5,000+', icon: CheckCircle },
    { label: 'Organizations Protected', value: '10,000+', icon: Users },
    { label: 'Average Risk Reduction', value: '75%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-green to-brand-gray rounded-full mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-brand-green to-brand-gray bg-clip-text text-transparent">
            CIS Web Compliance Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Streamline your security posture with automated CIS benchmark assessments. 
            Ensure compliance, reduce risk, and maintain security standards across your entire infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Button size="lg" asChild className="bg-brand-green hover:bg-brand-green/90">
                  <Link to="/compliance" className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Start Assessment</span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/benchmarks" className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Browse Benchmarks</span>
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" asChild className="bg-brand-green hover:bg-brand-green/90">
                  <Link to="/auth" className="flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/benchmarks">
                    View Benchmarks
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 bg-card/60 backdrop-blur-sm text-center">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-brand-green">{stat.value}</CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Security Management</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to assess, monitor, and improve your security posture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group cursor-pointer">
                <Link to={feature.link}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 bg-gradient-to-br from-brand-green to-brand-gray rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-brand-green transition-colors">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 bg-gradient-to-br from-brand-green/10 to-brand-gray/10 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-green to-brand-gray rounded-full mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold mb-4">
                Ready to Enhance Your Security?
              </CardTitle>
              <CardDescription className="text-xl max-w-2xl mx-auto">
                Join thousands of organizations using our platform to maintain robust security standards
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {!user && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="bg-brand-green hover:bg-brand-green/90">
                    <Link to="/auth">Start Free Assessment</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/benchmarks">Explore Benchmarks</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
