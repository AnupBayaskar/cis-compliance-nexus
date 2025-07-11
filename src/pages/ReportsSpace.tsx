
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, User, CheckCircle, BarChart3, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Team {
  _id: string;
  name: string;
}

interface Device {
  _id: string;
  name: string;
  type: string;
  teamId: string;
}

interface SavedConfiguration {
  _id: string;
  name: string;
  deviceId: string;
  teamId: string;
  createdAt: string;
  validatedBy: string;
  markedBy: string;
  status: 'validated' | 'denied' | 'pending';
}

export default function ReportsSpace() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [savedConfigs, setSavedConfigs] = useState<SavedConfiguration[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<SavedConfiguration | null>(null);
  const [showGenerateDialog, setShowGenerateDialog] = useState<SavedConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching teams and devices for reports');
        // Mock data - replace with actual API calls
        setTeams([
          { _id: '1', name: 'Security Team' },
          { _id: '2', name: 'IT Operations' },
          { _id: '3', name: 'Development Team' }
        ]);
        setDevices([
          { _id: '1', name: 'Web Server 01', type: 'Ubuntu Server', teamId: '1' },
          { _id: '2', name: 'Database Server', type: 'CentOS', teamId: '1' },
          { _id: '3', name: 'Development Laptop', type: 'Windows 11 Pro', teamId: '2' },
          { _id: '4', name: 'Production API', type: 'Docker Container', teamId: '3' }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeviceSelect = async (deviceId: string) => {
    console.log('Device selected for reports:', deviceId);
    setSelectedDevice(deviceId);
    // Mock saved configurations
    setSavedConfigs([
      {
        _id: 'config1',
        name: 'Security Baseline Configuration',
        deviceId,
        teamId: '1',
        createdAt: '2024-01-20T10:00:00Z',
        validatedBy: 'Sarah Johnson',
        markedBy: 'Mike Davis',
        status: 'validated'
      },
      {
        _id: 'config2',
        name: 'Network Security Controls',
        deviceId,
        teamId: '1',
        createdAt: '2024-01-19T14:30:00Z',
        validatedBy: 'Alice Brown',
        markedBy: 'John Smith',
        status: 'validated'
      },
      {
        _id: 'config3',
        name: 'Access Control Configuration',
        deviceId,
        teamId: '1',
        createdAt: '2024-01-18T09:15:00Z',
        validatedBy: 'Bob Wilson',
        markedBy: 'Mike Davis',
        status: 'denied'
      }
    ]);
  };

  const handleGenerateReport = async (configId: string) => {
    try {
      console.log('Generating report for configuration:', configId);
      setShowGenerateDialog(null);
      toast({
        title: "Report Generated Successfully",
        description: "Your compliance report has been generated and will be downloaded shortly.",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    }
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t._id === teamId);
    return team?.name || 'Unknown Team';
  };

  const getDeviceName = (deviceId: string) => {
    const device = devices.find(d => d._id === deviceId);
    return device?.name || 'Unknown Device';
  };

  const devicesByTeam = devices.reduce((acc, device) => {
    const teamName = getTeamName(device.teamId);
    if (!acc[teamName]) {
      acc[teamName] = [];
    }
    acc[teamName].push(device);
    return acc;
  }, {} as Record<string, Device[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-gray-light via-background to-brand-secondary/5">
        <div className="section-padding">
          <div className="content-max-width space-y-6">
            <div className="h-12 bg-muted rounded-lg animate-pulse" />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="h-96 bg-muted rounded-lg animate-pulse" />
              <div className="lg:col-span-2 h-96 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-light via-background to-brand-secondary/5">
      <div className="section-padding">
        <div className="content-max-width space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-2xl flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient-secondary heading-enhanced">
                Reports Space
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto typography-enhanced">
                Generate comprehensive compliance reports and track your security posture
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-card p-6 text-center hover-lift">
              <TrendingUp className="w-8 h-8 text-brand-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-success mb-2">156</h3>
              <p className="text-muted-foreground">Reports Generated</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <Shield className="w-8 h-8 text-brand-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-primary mb-2">98.2%</h3>
              <p className="text-muted-foreground">Compliance Score</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <CheckCircle className="w-8 h-8 text-brand-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-secondary mb-2">24</h3>
              <p className="text-muted-foreground">Active Configurations</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Device Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-brand-primary" />
                    </div>
                    <span className="font-display">Your Teams</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(devicesByTeam).map(([teamName, teamDevices]) => (
                    <div key={teamName} className="space-y-3">
                      <h4 className="font-semibold text-brand-primary border-b border-brand-primary/20 pb-2">
                        {teamName}
                      </h4>
                      <div className="space-y-2">
                        {teamDevices.map((device) => (
                          <Button
                            key={device._id}
                            variant={selectedDevice === device._id ? "default" : "ghost"}
                            size="sm"
                            className={`w-full justify-start text-left h-auto p-3 ${
                              selectedDevice === device._id
                                ? 'button-primary'
                                : 'hover:bg-muted/80 hover:shadow-md'
                            }`}
                            onClick={() => handleDeviceSelect(device._id)}
                          >
                            <div className="flex flex-col items-start space-y-1">
                              <span className="font-medium">{device.name}</span>
                              <span className="text-xs opacity-75">{device.type}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Panel - Saved Configurations */}
            <div className="lg:col-span-2">
              {selectedDevice ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass-card border-0 shadow-2xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-display">Saved Configurations</CardTitle>
                        <Button className="button-secondary">
                          View All Configurations
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground typography-enhanced">
                        Device: <span className="font-semibold text-brand-primary">{getDeviceName(selectedDevice)}</span>
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <div className="space-y-4">
                          {savedConfigs.map((config, index) => (
                            <motion.div
                              key={config._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-6 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] bg-card/50"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <h4 className="font-semibold font-display text-lg">{config.name}</h4>
                                <Badge
                                  variant={config.status === 'validated' ? 'default' : config.status === 'denied' ? 'destructive' : 'secondary'}
                                  className={`${
                                    config.status === 'validated' 
                                      ? 'bg-brand-success/10 text-brand-success border-brand-success/20' 
                                      : config.status === 'denied'
                                      ? 'bg-brand-danger/10 text-brand-danger border-brand-danger/20'
                                      : 'bg-brand-warning/10 text-brand-warning border-brand-warning/20'
                                  }`}
                                >
                                  {config.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(config.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>By {config.validatedBy}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedConfig(config)}
                                  className="hover:shadow-md"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="button-primary"
                                  onClick={() => setShowGenerateDialog(config)}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Generate Report
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <Card className="glass-card border-0 shadow-2xl w-full">
                    <CardContent className="flex flex-col items-center justify-center h-96 text-center space-y-6">
                      <div className="w-24 h-24 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                        <FileText className="h-12 w-12 text-brand-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-display font-semibold">Select a Device</h3>
                        <p className="text-muted-foreground typography-enhanced max-w-md">
                          Choose a device from your teams to view saved configurations and generate comprehensive compliance reports
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>

          {/* Configuration Details Dialog */}
          <Dialog open={!!selectedConfig} onOpenChange={() => setSelectedConfig(null)}>
            <DialogContent className="confirmation-dialog max-w-4xl">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Configuration Details</DialogTitle>
              </DialogHeader>
              {selectedConfig && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Configuration</h4>
                      <p className="font-semibold">{selectedConfig.name}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
                      <Badge
                        variant={selectedConfig.status === 'validated' ? 'default' : 'destructive'}
                        className={selectedConfig.status === 'validated' ? 'bg-brand-success/10 text-brand-success' : ''}
                      >
                        {selectedConfig.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Created</h4>
                      <p className="font-semibold">{new Date(selectedConfig.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Control Summary</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-brand-success/10 rounded-xl text-center">
                        <div className="text-3xl font-bold text-brand-success mb-1">15</div>
                        <div className="text-sm text-brand-success font-medium">Passed</div>
                      </div>
                      <div className="p-4 bg-brand-danger/10 rounded-xl text-center">
                        <div className="text-3xl font-bold text-brand-danger mb-1">3</div>
                        <div className="text-sm text-brand-danger font-medium">Failed</div>
                      </div>
                      <div className="p-4 bg-brand-warning/10 rounded-xl text-center">
                        <div className="text-3xl font-bold text-brand-warning mb-1">2</div>
                        <div className="text-sm text-brand-warning font-medium">Skipped</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setShowGenerateDialog(selectedConfig)}
                      className="button-primary"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Generate PDF Report
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export to Excel
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export to CSV
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Generate Report Confirmation Dialog */}
          <Dialog open={!!showGenerateDialog} onOpenChange={() => setShowGenerateDialog(null)}>
            <DialogContent className="confirmation-dialog">
              <DialogHeader className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Download className="w-8 h-8 text-brand-primary" />
                </div>
                <DialogTitle className="font-display text-xl">Generate Compliance Report</DialogTitle>
                <DialogDescription className="typography-enhanced">
                  You are about to generate a comprehensive compliance report for:
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Configuration:</span>
                      <span className="text-brand-primary font-semibold">{showGenerateDialog?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Device:</span>
                      <span className="text-brand-secondary font-semibold">{getDeviceName(selectedDevice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <Badge variant={showGenerateDialog?.status === 'validated' ? 'default' : 'destructive'}>
                        {showGenerateDialog?.status}
                      </Badge>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex space-x-2 pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowGenerateDialog(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleGenerateReport(showGenerateDialog!._id)}
                  className="button-primary flex-1"
                >
                  Generate Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
