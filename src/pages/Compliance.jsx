
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Shield, 
  TrendingUp,
  Download,
  Settings,
  Info
} from 'lucide-react';

const Compliance = () => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const complianceData = {
    overall: 78,
    passed: 156,
    failed: 43,
    warning: 12,
    total: 211
  };

  const categoryResults = [
    { name: 'Access Control', score: 85, status: 'good', passed: 34, failed: 6, total: 40 },
    { name: 'System Maintenance', score: 72, status: 'warning', passed: 29, failed: 11, total: 40 },
    { name: 'Logging and Monitoring', score: 90, status: 'good', passed: 27, failed: 3, total: 30 },
    { name: 'Network Configuration', score: 65, status: 'critical', passed: 26, failed: 14, total: 40 },
    { name: 'System Settings', score: 88, status: 'good', passed: 40, failed: 9, total: 61 }
  ];

  const recentScans = [
    { id: 1, name: 'Production Web Servers', time: '2 hours ago', score: 82, status: 'completed' },
    { id: 2, name: 'Development Environment', time: '1 day ago', score: 91, status: 'completed' },
    { id: 3, name: 'Database Cluster', time: '2 days ago', score: 76, status: 'completed' },
    { id: 4, name: 'Cloud Infrastructure', time: '3 days ago', score: 88, status: 'completed' }
  ];

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'good': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Compliance Assessment</h1>
          <p className="text-xl text-muted-foreground">
            Monitor and evaluate your security posture against CIS benchmarks
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-green">{complianceData.overall}%</div>
              <Progress value={complianceData.overall} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Passed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{complianceData.passed}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((complianceData.passed / complianceData.total) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{complianceData.failed}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((complianceData.failed / complianceData.total) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{complianceData.warning}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((complianceData.warning / complianceData.total) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full lg:w-fit">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="scan">New Scan</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Results */}
              <Card className="border-0 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Compliance by Category</CardTitle>
                  <CardDescription>
                    Breakdown of compliance scores across different security domains
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryResults.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusBadge(category.status)} className="text-xs">
                            {category.score}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={category.score} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{category.passed} passed</span>
                        <span>{category.failed} failed</span>
                        <span>{category.total} total</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Scans</CardTitle>
                  <CardDescription>
                    Latest compliance assessments across your infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="space-y-1">
                        <p className="font-medium">{scan.name}</p>
                        <p className="text-sm text-muted-foreground">{scan.time}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {scan.score}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scan" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Run Compliance Scan</CardTitle>
                <CardDescription>
                  Start a new CIS benchmark assessment on your infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {scanning ? (
                  <div className="space-y-4">
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        Scanning in progress... This may take several minutes to complete.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <Progress value={scanProgress} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        This scan will assess your systems against CIS Windows 10 Enterprise benchmark v1.10.0.
                        Estimated time: 15-20 minutes.
                      </AlertDescription>
                    </Alert>
                    <div className="flex gap-4">
                      <Button onClick={startScan} className="flex items-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Start Scan</span>
                      </Button>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Configure</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Scan History</CardTitle>
                <CardDescription>
                  Historical compliance assessment results and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Historical Trends</h3>
                  <p className="text-muted-foreground">
                    View compliance trends and historical scan results over time
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
                <CardDescription>
                  Generate and download detailed compliance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Reports</h3>
                  <p className="text-muted-foreground">
                    Export detailed compliance reports in PDF or Excel format
                  </p>
                  <Button className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Compliance;
