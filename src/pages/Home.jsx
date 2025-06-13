
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Users, 
  TrendingUp,
  Server,
  Globe,
  Lock
} from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Total Benchmarks', value: '156', icon: FileText, color: 'bg-blue-500' },
    { label: 'Compliant Systems', value: '89', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Non-Compliant', value: '23', icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'In Progress', value: '44', icon: TrendingUp, color: 'bg-yellow-500' }
  ];

  const recentBenchmarks = [
    { name: 'CIS Windows 10 v1.10.0', status: 'Compliant', score: 95 },
    { name: 'CIS Ubuntu Linux 20.04 v1.1.0', status: 'Non-Compliant', score: 67 },
    { name: 'CIS Microsoft 365 v1.4.0', status: 'In Progress', score: 78 },
    { name: 'CIS Apache HTTP Server v2.4', status: 'Compliant', score: 88 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Powered by SmartEdge Security</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">CIS Compliance</span>
              <br />
              <span className="text-foreground">Made Simple</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Streamline your security posture with automated CIS benchmark assessments, 
              real-time compliance monitoring, and actionable remediation guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/compliance">Start Compliance Check</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/benchmarks">View Benchmarks</Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div className={`h-8 w-8 rounded-full ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by security experts, trusted by enterprises worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Automated Scanning</CardTitle>
                <CardDescription>
                  Deploy automated CIS benchmark scans across your entire infrastructure with just a few clicks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Continuous monitoring with instant alerts when compliance status changes or new vulnerabilities are detected.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-brand-green to-brand-gray rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-grade encryption, role-based access control, and audit trails to meet the strictest security requirements.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <Card className="border-0 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Recent Benchmark Results</span>
                  </CardTitle>
                  <CardDescription>
                    Latest compliance assessments across your infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentBenchmarks.map((benchmark, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="space-y-1">
                        <p className="font-medium">{benchmark.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={benchmark.status === 'Compliant' ? 'default' : benchmark.status === 'Non-Compliant' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {benchmark.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Score: {benchmark.score}%</span>
                        </div>
                      </div>
                      <Progress value={benchmark.score} className="w-20" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:w-96">
              <Card className="border-0 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" asChild>
                    <Link to="/compliance">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Run New Assessment
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/benchmarks">
                      <FileText className="h-4 w-4 mr-2" />
                      Browse Benchmarks
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Team
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
