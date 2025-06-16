
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useReports } from '@/context/ReportsContext';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText,
  Loader2
} from 'lucide-react';

const Compliance = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDeviceForReport, setSelectedDeviceForReport] = useState('');
  const { toast } = useToast();
  const { addReport, devices, userPreferences, updateUserPreferences } = useReports();

  // Mock compliance data with state management
  const [complianceChecks, setComplianceChecks] = useState([
    { id: 1, name: 'Password Policy', status: 'pass', severity: 'high' },
    { id: 2, name: 'Firewall Configuration', status: 'pass', severity: 'critical' },
    { id: 3, name: 'System Updates', status: 'fail', severity: 'medium' },
    { id: 4, name: 'User Access Controls', status: 'warning', severity: 'high' },
    { id: 5, name: 'Data Encryption', status: 'pass', severity: 'critical' },
    { id: 6, name: 'Audit Logging', status: 'fail', severity: 'high' },
  ]);

  // Load saved preferences on component mount
  useEffect(() => {
    if (userPreferences.selectedDevice) {
      setSelectedDeviceForReport(userPreferences.selectedDevice);
    }
    
    // Restore compliance check states if saved
    if (Object.keys(userPreferences.complianceChecks).length > 0) {
      setComplianceChecks(prev => 
        prev.map(check => ({
          ...check,
          status: userPreferences.complianceChecks[check.id] || check.status
        }))
      );
    }
  }, [userPreferences]);

  // Save device selection
  const handleDeviceChange = (deviceName: string) => {
    setSelectedDeviceForReport(deviceName);
    updateUserPreferences({ selectedDevice: deviceName });
  };

  // Save compliance check status changes
  const handleStatusChange = (checkId: number, newStatus: string) => {
    setComplianceChecks(prev => 
      prev.map(check => 
        check.id === checkId ? { ...check, status: newStatus } : check
      )
    );
    
    updateUserPreferences({
      complianceChecks: {
        ...userPreferences.complianceChecks,
        [checkId]: newStatus
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: 'bg-green-100 text-green-800',
      fail: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={variants[status] || ''}>{status.toUpperCase()}</Badge>;
  };

  const passedChecks = complianceChecks.filter(check => check.status === 'pass').length;
  const complianceScore = Math.round((passedChecks / complianceChecks.length) * 100);

  const handleGenerateReport = async () => {
    if (!selectedDeviceForReport) {
      toast({
        title: "Device Required",
        description: "Please select a device before generating a report.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate report generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const summary = `Compliance assessment completed for ${selectedDeviceForReport}. ${passedChecks} out of ${complianceChecks.length} checks passed. ${complianceChecks.filter(c => c.status === 'fail').length > 0 ? 'Critical issues found that require immediate attention.' : 'System is in good compliance standing.'}`;
      
      // Add report to context
      addReport({
        deviceName: selectedDeviceForReport,
        complianceScore,
        summary
      });

      toast({
        title: "Report Generated Successfully",
        description: `Compliance report for ${selectedDeviceForReport} has been generated and saved.`,
      });

    } catch (error) {
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance Check</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and assess your system's compliance status
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedDeviceForReport} onValueChange={handleDeviceChange}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Select a device..." />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device) => (
                <SelectItem key={device} value={device}>
                  {device}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating || !selectedDeviceForReport}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceScore}%</div>
            <Progress value={complianceScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed Checks</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{passedChecks}</div>
            <p className="text-xs text-muted-foreground">out of {complianceChecks.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Checks</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {complianceChecks.length - passedChecks}
            </div>
            <p className="text-xs text-muted-foreground">require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Compliance Checks */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Checks</CardTitle>
          <CardDescription>
            Detailed breakdown of individual compliance requirements (click to change status)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <h3 className="font-medium">{check.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Severity: {check.severity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={check.status} onValueChange={(value) => handleStatusChange(check.id, value)}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                    </SelectContent>
                  </Select>
                  {getStatusBadge(check.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compliance;
