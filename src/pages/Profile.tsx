
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Server, 
  FileText, 
  Download, 
  Calendar, 
  Shield,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Mock data for demonstration
const userDevices = [
  { 
    id: 1, 
    name: 'Production Web Server', 
    type: 'Windows Server 2022', 
    status: 'Active',
    lastScan: '2024-06-10',
    compliance: 85
  },
  { 
    id: 2, 
    name: 'Database Server', 
    type: 'Ubuntu 22.04 LTS', 
    status: 'Active',
    lastScan: '2024-06-09',
    compliance: 92
  },
  { 
    id: 3, 
    name: 'Application Server', 
    type: 'CentOS 8', 
    status: 'Maintenance',
    lastScan: '2024-06-05',
    compliance: 78
  }
];

const userReports = [
  {
    id: 1,
    device: 'Production Web Server',
    type: 'CIS Windows Server 2022',
    date: '2024-06-10',
    status: 'Completed',
    compliance: 85,
    criticalIssues: 3,
    mediumIssues: 7
  },
  {
    id: 2,
    device: 'Database Server',
    type: 'CIS Ubuntu 22.04 LTS',
    date: '2024-06-09',
    status: 'Completed',
    compliance: 92,
    criticalIssues: 1,
    mediumIssues: 4
  },
  {
    id: 3,
    device: 'Application Server',
    type: 'CIS CentOS 8',
    date: '2024-06-05',
    status: 'In Progress',
    compliance: 78,
    criticalIssues: 5,
    mediumIssues: 12
  }
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center section-padding">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <AlertCircle className="h-6 w-6 text-amber-500" />
              <span>Authentication Required</span>
            </CardTitle>
            <CardDescription>
              Please log in to access your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Maintenance': return 'secondary';
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">User Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>

        {/* User Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span>User Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Personal Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Type:</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since:</span>
                    <span>January 2024</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Account Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Devices:</span>
                    <span>{userDevices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed Scans:</span>
                    <span>{userReports.filter(r => r.status === 'Completed').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Compliance:</span>
                    <span className={getComplianceColor(85)}>85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Login:</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Devices Dashboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-6 w-6" />
              <span>User Devices</span>
            </CardTitle>
            <CardDescription>
              Manage and monitor your registered devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userDevices.map((device) => (
                <Card key={device.id} className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">{device.name}</h4>
                      <Badge variant={getStatusColor(device.status)}>
                        {device.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{device.type}</p>
                    
                    <Separator className="my-3" />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Scan:</span>
                        <span>{device.lastScan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compliance:</span>
                        <span className={getComplianceColor(device.compliance)}>
                          {device.compliance}%
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => navigate('/compliance')}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/compliance')}
            >
              Add New Device
            </Button>
          </CardContent>
        </Card>

        {/* User Reports Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>Compliance Reports</span>
            </CardTitle>
            <CardDescription>
              View and download your compliance assessment reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userReports.map((report) => (
                <Card key={report.id} className="hover-lift">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold">{report.device}</h4>
                          <Badge variant={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.type}</p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{report.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className={`h-4 w-4 ${getComplianceColor(report.compliance)}`} />
                            <span className={getComplianceColor(report.compliance)}>
                              {report.compliance}% Compliant
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="text-sm">
                          <div className="flex items-center space-x-1 text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            <span>{report.criticalIssues} Critical</span>
                          </div>
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <Clock className="h-4 w-4" />
                            <span>{report.mediumIssues} Medium</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" disabled={report.status !== 'Completed'}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <Button onClick={() => navigate('/compliance')}>
                Create New Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
