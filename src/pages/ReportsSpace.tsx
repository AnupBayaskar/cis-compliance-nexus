
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Shield,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Mock data with more detailed information
const mockDeviceReports = [
  {
    device_id: '1',
    uuid: 'uuid-001',
    type: 'os',
    device_subtype: 'Ubuntu Server 20.04',
    ip_address: '192.168.1.10',
    machine_name: 'web-server-01',
    description: 'Primary web server for customer portal',
    owner_name: 'John Doe',
    owner_phone: '+1-555-0123',
    owner_email: 'john.doe@company.com',
    created_by: 'admin',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T14:20:00Z',
    status: 'active',
    compliance: 87,
    device: 'Web Server 01',
    date: '2024-01-20',
    criticalIssues: 2,
    mediumIssues: 5,
    lastScan: '2024-01-20T08:00:00Z',
    controls: [
      { id: '1.1.1', name: 'Filesystem Controls', status: 'pass', score: 95 },
      { id: '2.1.1', name: 'Service Controls', status: 'fail', score: 60 },
      { id: '3.1.1', name: 'Network Controls', status: 'pass', score: 90 }
    ]
  },
  {
    device_id: '2',
    uuid: 'uuid-002',
    type: 'service',
    device_subtype: 'MySQL Database',
    ip_address: '192.168.1.20',
    machine_name: 'db-server-01',
    description: 'Primary database server',
    owner_name: 'Jane Smith',
    owner_phone: '+1-555-0124',
    owner_email: 'jane.smith@company.com',
    created_by: 'admin',
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-18T16:45:00Z',
    status: 'active',
    compliance: 92,
    device: 'Database Server',
    date: '2024-01-18',
    criticalIssues: 0,
    mediumIssues: 3,
    lastScan: '2024-01-18T10:30:00Z',
    controls: [
      { id: '1.1.1', name: 'Filesystem Controls', status: 'pass', score: 98 },
      { id: '2.1.1', name: 'Service Controls', status: 'pass', score: 85 },
      { id: '3.1.1', name: 'Network Controls', status: 'pass', score: 93 }
    ]
  },
  {
    device_id: '3',
    uuid: 'uuid-003',
    type: 'os',
    device_subtype: 'Windows 11 Pro',
    ip_address: '192.168.1.30',
    machine_name: 'workstation-01',
    description: 'Developer workstation',
    owner_name: 'Bob Wilson',
    owner_phone: '+1-555-0125',
    owner_email: 'bob.wilson@company.com',
    created_by: 'bob',
    created_at: '2024-01-05T14:00:00Z',
    updated_at: '2024-01-15T11:30:00Z',
    status: 'active',
    compliance: 78,
    device: 'Workstation 01',
    date: '2024-01-15',
    criticalIssues: 4,
    mediumIssues: 7,
    lastScan: '2024-01-15T09:00:00Z',
    controls: [
      { id: '1.1.1', name: 'Filesystem Controls', status: 'fail', score: 45 },
      { id: '2.1.1', name: 'Service Controls', status: 'pass', score: 80 },
      { id: '3.1.1', name: 'Network Controls', status: 'pass', score: 88 }
    ]
  }
];

export default function ReportsSpace() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCompliance, setFilterCompliance] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [expandedControls, setExpandedControls] = useState(false);

  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceBadge = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  // Filter and sort devices
  const filteredDevices = mockDeviceReports
    .filter(device => {
      const matchesSearch = device.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           device.machine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           device.owner_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
      
      const matchesCompliance = filterCompliance === 'all' ||
        (filterCompliance === 'high' && device.compliance >= 90) ||
        (filterCompliance === 'medium' && device.compliance >= 75 && device.compliance < 90) ||
        (filterCompliance === 'low' && device.compliance < 75);
      
      return matchesSearch && matchesStatus && matchesCompliance;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'compliance':
          aValue = a.compliance;
          bValue = b.compliance;
          break;
        case 'name':
          aValue = a.device.toLowerCase();
          bValue = b.device.toLowerCase();
          break;
        case 'date':
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleViewDetails = (device) => {
    setSelectedDevice(device);
    setShowDetailsDialog(true);
  };

  const handleCreateReport = () => {
    console.log('Creating new report...');
    // Implementation for creating new report
  };

  const handleDownloadReport = (device) => {
    console.log('Downloading report for:', device.device);
    // Implementation for downloading report
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Reports Space</h1>
          <p className="text-muted-foreground">View and download compliance reports</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search devices, machines, or owners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCompliance} onValueChange={setFilterCompliance}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Compliance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Compliance</SelectItem>
                  <SelectItem value="high">High (90%+)</SelectItem>
                  <SelectItem value="medium">Medium (75-89%)</SelectItem>
                  <SelectItem value="low">Low (<75%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>Compliance Reports ({filteredDevices.length})</span>
            </CardTitle>
            <Button onClick={handleCreateReport}>
              Create New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDevices.map((report) => (
              <Card key={report.device_id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-lg">{report.device}</h4>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Badge className={getComplianceBadge(report.compliance)}>
                          {report.compliance}% Compliant
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <p><strong>Machine:</strong> {report.machine_name}</p>
                        <p><strong>IP:</strong> {report.ip_address}</p>
                        <p><strong>Owner:</strong> {report.owner_name}</p>
                        <p><strong>Type:</strong> {report.device_subtype}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Last Scan: {new Date(report.lastScan).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-red-600">{report.criticalIssues} Critical</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-yellow-600">{report.mediumIssues} Medium</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(report)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport(report)}
                        disabled={report.status !== 'active'}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredDevices.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No reports found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Device Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {selectedDevice?.device} - Compliance Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedDevice && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Device Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Device Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Device:</span> {selectedDevice.device}
                  </div>
                  <div>
                    <span className="font-medium">Machine Name:</span> {selectedDevice.machine_name}
                  </div>
                  <div>
                    <span className="font-medium">IP Address:</span> {selectedDevice.ip_address}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {selectedDevice.device_subtype}
                  </div>
                  <div>
                    <span className="font-medium">Owner:</span> {selectedDevice.owner_name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {selectedDevice.owner_email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {selectedDevice.owner_phone}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> 
                    <Badge className={cn("ml-2", getStatusColor(selectedDevice.status))}>
                      {selectedDevice.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> {new Date(selectedDevice.updated_at).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              {/* Middle: Compliance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={cn("text-4xl font-bold mb-2", getComplianceColor(selectedDevice.compliance))}>
                      {selectedDevice.compliance}%
                    </div>
                    <p className="text-muted-foreground">Overall Compliance Score</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-red-700">Critical Issues</span>
                      <span className="font-bold text-red-700">{selectedDevice.criticalIssues}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-yellow-700">Medium Issues</span>
                      <span className="font-bold text-yellow-700">{selectedDevice.mediumIssues}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-green-700">Passed Controls</span>
                      <span className="font-bold text-green-700">
                        {selectedDevice.controls.filter(c => c.status === 'pass').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right: Control Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Control Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {selectedDevice.controls.map((control) => (
                        <div key={control.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{control.id}</span>
                            <Badge 
                              className={control.status === 'pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            >
                              {control.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{control.name}</p>
                          <div className="text-sm">
                            <span className="font-medium">Score: </span>
                            <span className={control.score >= 80 ? 'text-green-600' : control.score >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                              {control.score}/100
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleDownloadReport(selectedDevice)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
