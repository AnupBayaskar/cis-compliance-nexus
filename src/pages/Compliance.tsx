
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '@/components/ui/modal';
import { useAuth } from '@/context/AuthContext';
import { 
  Plus, 
  Search, 
  Download, 
  CheckCircle, 
  X, 
  HelpCircle, 
  Server,
  FileText,
  AlertCircle 
} from 'lucide-react';

// Mock data for demonstration
const devices = [
  { id: 1, name: 'Production Web Server', type: 'Windows Server 2022', status: 'Active' },
  { id: 2, name: 'Database Server', type: 'Ubuntu 22.04 LTS', status: 'Active' },
  { id: 3, name: 'Application Server', type: 'CentOS 8', status: 'Maintenance' }
];

const complianceChecks = [
  {
    id: 'CIS-1.1.1',
    title: 'Ensure separate partition exists for /tmp',
    category: 'Initial Setup',
    criticality: 'High',
    description: 'The /tmp directory is a world-writable directory used for temporary storage by all users and some applications.',
    status: null // null = empty, true = check, false = cross
  },
  {
    id: 'CIS-1.1.2',
    title: 'Ensure nodev option set on /tmp partition',
    category: 'Initial Setup',
    criticality: 'Medium',
    description: 'The nodev mount option specifies that the filesystem cannot contain special devices.',
    status: null
  },
  {
    id: 'CIS-1.2.1',
    title: 'Ensure package manager repositories are configured',
    category: 'Software Updates',
    criticality: 'High',
    description: 'Systems need to have package manager repositories configured to ensure they can receive software updates.',
    status: null
  },
  {
    id: 'CIS-2.1.1',
    title: 'Ensure xinetd is not installed',
    category: 'Services',
    criticality: 'Medium',
    description: 'The eXtended InterNET Daemon (xinetd) is an open source super daemon.',
    status: null
  },
  {
    id: 'CIS-3.1.1',
    title: 'Ensure IP forwarding is disabled',
    category: 'Network Configuration',
    criticality: 'High',
    description: 'The net.ipv4.ip_forward flag is used to tell the system whether it can forward packets.',
    status: null
  }
];

const Compliance = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [checks, setChecks] = useState(complianceChecks);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showCheckDetail, setShowCheckDetail] = useState<any>(null);
  const [newDevice, setNewDevice] = useState({ name: '', type: '', description: '' });

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
              Please log in to access the compliance check feature
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

  const filteredChecks = checks.filter(check =>
    check.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    check.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckChange = (checkId: string, status: boolean | null) => {
    setChecks(checks.map(check =>
      check.id === checkId ? { ...check, status } : check
    ));
  };

  const handleAddDevice = () => {
    // In real implementation, this would call API
    console.log('Adding device:', newDevice);
    setNewDevice({ name: '', type: '', description: '' });
    setShowAddDevice(false);
  };

  const canGenerateReport = checks.every(check => check.status !== null);

  const handleGenerateReport = () => {
    console.log('Generating GRC report...');
    // In real implementation, this would call backend to generate report
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Compliance Check</h1>
            <p className="text-muted-foreground">
              Assess your infrastructure against CIS benchmarks
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHelp(true)}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            How to Use
          </Button>
        </div>

        {/* Device Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-6 w-6" />
              <span>Select Device</span>
            </CardTitle>
            <CardDescription>
              Choose a device to perform compliance check
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {devices.map((device) => (
                <Card
                  key={device.id}
                  className={`cursor-pointer transition-all ${
                    selectedDevice?.id === device.id
                      ? 'ring-2 ring-brand-green bg-brand-green/5'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDevice(device)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{device.name}</h4>
                      <Badge variant={device.status === 'Active' ? 'default' : 'secondary'}>
                        {device.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{device.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowAddDevice(true)}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Device
            </Button>
          </CardContent>
        </Card>

        {/* Compliance Check Section */}
        {selectedDevice && (
          <div className="space-y-6">
            {/* Download Options */}
            <Card>
              <CardHeader>
                <CardTitle>Download Benchmark Files</CardTitle>
                <CardDescription>
                  Download benchmark files for {selectedDevice.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download JSON
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Checks */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Checks</CardTitle>
                <CardDescription>
                  Review and mark compliance status for each control
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by reference ID or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Check List */}
                <div className="space-y-3">
                  {filteredChecks.map((check) => (
                    <div
                      key={check.id}
                      className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      {/* Status Checkboxes */}
                      <div className="flex space-x-2">
                        <Button
                          variant={check.status === true ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleCheckChange(check.id, true)}
                          className="p-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={check.status === false ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => handleCheckChange(check.id, false)}
                          className="p-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={check.status === null ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleCheckChange(check.id, null)}
                          className="p-2"
                        >
                          —
                        </Button>
                      </div>

                      {/* Reference ID */}
                      <Button
                        variant="link"
                        className="font-mono text-brand-green hover:text-brand-green/80 p-0"
                        onClick={() => setShowCheckDetail(check)}
                      >
                        {check.id}
                      </Button>

                      {/* Title and Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{check.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {check.category}
                          </Badge>
                          <Badge
                            variant={check.criticality === 'High' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {check.criticality}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Generate Report */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Generate GRC Report</h4>
                      <p className="text-sm text-muted-foreground">
                        {canGenerateReport
                          ? 'All checks completed. Ready to generate report.'
                          : `${checks.filter(c => c.status === null).length} checks remaining`}
                      </p>
                    </div>
                    <Button
                      onClick={handleGenerateReport}
                      disabled={!canGenerateReport}
                      className="min-w-[150px]"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={showAddDevice}
          onClose={() => setShowAddDevice(false)}
          title="Add New Device"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Device Name</label>
              <Input
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                placeholder="Enter device name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Device Type</label>
              <Input
                value={newDevice.type}
                onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                placeholder="e.g., Windows Server 2022, Ubuntu 22.04"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Input
                value={newDevice.description}
                onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleAddDevice} className="flex-1">
                Add Device
              </Button>
              <Button variant="outline" onClick={() => setShowAddDevice(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
          title="How to Use Compliance Check"
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">1. Select a Device</h4>
                <p className="text-sm text-muted-foreground">
                  Choose from your registered devices or add a new one to begin assessment
                </p>
              </div>
              <div>
                <h4 className="font-semibold">2. Download Benchmarks</h4>
                <p className="text-sm text-muted-foreground">
                  Get the latest CIS benchmark files in your preferred format (PDF, CSV, JSON)
                </p>
              </div>
              <div>
                <h4 className="font-semibold">3. Review Controls</h4>
                <p className="text-sm text-muted-foreground">
                  Go through each security control and mark as compliant (✓), non-compliant (✗), or skip (—)
                </p>
              </div>
              <div>
                <h4 className="font-semibold">4. Generate Report</h4>
                <p className="text-sm text-muted-foreground">
                  Once all controls are reviewed, generate a comprehensive GRC report for your records
                </p>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={!!showCheckDetail}
          onClose={() => setShowCheckDetail(null)}
          title={showCheckDetail?.id || ''}
          size="lg"
        >
          {showCheckDetail && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{showCheckDetail.title}</h3>
                <div className="flex space-x-2 mb-4">
                  <Badge variant="outline">{showCheckDetail.category}</Badge>
                  <Badge variant={showCheckDetail.criticality === 'High' ? 'destructive' : 'secondary'}>
                    {showCheckDetail.criticality}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{showCheckDetail.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Remediation Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed implementation steps and configuration examples would be provided here 
                  from the backend database for this specific control.
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Compliance;
