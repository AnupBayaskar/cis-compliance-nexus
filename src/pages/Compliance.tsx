
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Modal from '@/components/ui/modal';
import { useAuth } from '@/context/AuthContext';
import { useConfiguration } from '@/context/ConfigurationContext';
import { 
  Plus, 
  Search, 
  Download, 
  HelpCircle, 
  Server,
  FileText,
  AlertCircle,
  Save,
  RotateCcw,
  CheckCircle,
  OctagonX,
  X,
  BrushIcon,
  Octagon,
  Eraser,
  Check,
  
} from 'lucide-react';

// Mock data for demonstration - will be updated when new devices are added
const initialDevices = [
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
    status: null // null = empty, 'pass' = check, 'fail' = cross, 'skip' = warning
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
  const { saveConfiguration } = useConfiguration();
  const [devices, setDevices] = useState(initialDevices);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [checks, setChecks] = useState(complianceChecks);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showCheckDetail, setShowCheckDetail] = useState<any>(null);
  const [showSaveConfig, setShowSaveConfig] = useState(false);
  const [configName, setConfigName] = useState('');
const [newDevice, setNewDevice] = useState({
  uuid: crypto.randomUUID(), // or any other UUID generator
  type: '',
  ip: '',
  hostname: '',
  owner: '',
  contact: '',
  email: '',
  description: '',
});

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

  const handleCheckChange = (checkId: string, status: 'pass' | 'fail' | 'skip' | null) => {
    setChecks(checks.map(check =>
      check.id === checkId ? { ...check, status } : check
    ));
  };

  const handleResetChecks = () => {
    setChecks(checks.map(check => ({ ...check, status: null })));
  };

  const handleAddDevice = () => {
    if (!newDevice.name.trim() || !newDevice.type.trim()) {
      alert('Please fill in at least the device name and type.');
      return;
    }

    const newDeviceObj = {
      id: Date.now(), // Simple ID generation
      name: newDevice.name,
      type: newDevice.type,
      status: 'Active'
    };

    setDevices(prev => [...prev, newDeviceObj]);
    setNewDevice({ name: '', type: '', description: '' });
    setShowAddDevice(false);
    
    // Optional: Auto-select the newly added device
    setSelectedDevice(newDeviceObj);
  };

  const canGenerateReport = checks.every(check => check.status !== null);
  const canSaveConfiguration = selectedDevice && checks.some(check => check.status !== null);

  const handleSaveConfiguration = () => {
    if (!selectedDevice || !configName.trim()) return;
    
    saveConfiguration(
      configName.trim(),
      selectedDevice.id,
      selectedDevice.name,
      checks
    );
    
    setConfigName('');
    setShowSaveConfig(false);
    
    // Show success message or navigate to saved configurations
    navigate('/saved-configurations');
  };

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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Compliance Checks</CardTitle>
                    <CardDescription>
                      Review and mark compliance status for each control
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetChecks}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
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
                      {/* Status Controls */}
                  <div className="flex items-center space-x-2">
  <button
    title="Check"
    onClick={() =>
      handleCheckChange(check.id, check.status === 'pass' ? null : 'pass')
    }
    className={`p-1 rounded transition-colors ${
      check.status === 'pass'
        ? 'bg-green-500 text-white-600'
        : 'hover:bg-green-150 text-white-400 hover:text-green-600'
    }`}
  >
    <Check className="h-4 w-4" />
  </button>

  <button
    title="Cross"
    onClick={() =>
      handleCheckChange(check.id, check.status === 'fail' ? null : 'fail')
    }
    className={`p-1 rounded transition-colors ${
      check.status === 'fail'
        ? 'bg-red-500 text-white-600'
        : 'hover:bg-red-150 text-white-400 hover:text-red-600'
    }`}
  >
    <X className="h-4 w-4" />
  </button> 

  <button
    title="Skip"
    onClick={() =>
      handleCheckChange(check.id, check.status === 'skip' ? null : 'skip')
    }
    className={`p-1 rounded transition-colors ${
      check.status === 'skip'
        ? 'bg-blue-500 text-white-600'
        : 'hover:bg-blue-150  text-white-400 hover:text-blue-600'
    }`}
  >
    <OctagonX className="h-4 w-4" />
  </button>
</div>

<Button
  title="Reset"
  variant={check.status === null ? 'secondary' : 'outline'}
  size="sm"
  onClick={() => handleCheckChange(check.id, null)}
  className="p-2"
>
  <Eraser className="h-4 w-4" />
</Button>

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

                {/* Save Configuration and Generate Report */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold">Configuration Actions</h4>
                      <p className="text-sm text-muted-foreground">
                        Save your current selections or generate a report
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowSaveConfig(true)}
                        disabled={!canSaveConfiguration}
                        className="min-w-[150px]"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Configuration
                      </Button>
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
                  {!canGenerateReport && (
                    <p className="text-sm text-muted-foreground">
                      {checks.filter(c => c.status === null).length} checks remaining to generate report
                    </p>
                  )}
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
     <div className="border-2 border-green-500 rounded-lg p-4 max-h-[80vh] overflow-y-auto space-y-4">
        {/* UUID (non-editable) */}
        <div>
          <label className="block text-sm font-medium mb-2">Device UUID</label>
          <Input
            value={newDevice.uuid}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Device Type - Radio Buttons */}
        <div>
          <label className="block text-sm font-medium mb-2">Device Type *</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="deviceType"
                value="OS"
                checked={newDevice.type === 'OS'}
                onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
              />
              <span>OS</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="deviceType"
                value="Service"
                checked={newDevice.type === 'Service'}
                onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
              />
              <span>Service</span>
            </label>
          </div>
        </div>

        {/* IP Address */}
        <div>
          <label className="block text-sm font-medium mb-2">IP Address *</label>
          <Input
            value={newDevice.ip}
            onChange={(e) => setNewDevice({ ...newDevice, ip: e.target.value })}
            placeholder="e.g., 192.168.1.100"
          />
        </div>

        {/* Host Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Host Name *</label>
          <Input
            value={newDevice.hostname}
            onChange={(e) => setNewDevice({ ...newDevice, hostname: e.target.value })}
            placeholder="Enter hostname"
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Owner Name *</label>
          <Input
            value={newDevice.owner}
            onChange={(e) => setNewDevice({ ...newDevice, owner: e.target.value })}
            placeholder="Enter owner name"
          />
        </div>

        {/* Owner Contact Number */}
        <div>
          <label className="block text-sm font-medium mb-2">Contact Number *</label>
          <Input
            type="tel"
            value={newDevice.contact}
            onChange={(e) => setNewDevice({ ...newDevice, contact: e.target.value })}
            placeholder="e.g., +91 9876543210"
          />
        </div>

        {/* Owner Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address *</label>
          <Input
            type="email"
            value={newDevice.email}
            onChange={(e) => setNewDevice({ ...newDevice, email: e.target.value })}
            placeholder="e.g., admin@example.com"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Input
            value={newDevice.description}
            onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
            placeholder="Optional description"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            onClick={handleAddDevice}
            className="flex-1"
            disabled={
              !newDevice.type || !newDevice.ip || !newDevice.hostname ||
              !newDevice.owner || !newDevice.contact || !newDevice.email
            }
          >
            Add Device
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAddDevice(false)}
            className="flex-1"
          >
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
                  Go through each security control and mark as compliant (✅), non-compliant (❌), or skip (⚠️)
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

        {/* Save Configuration Modal */}
        <Modal
          isOpen={showSaveConfig}
          onClose={() => setShowSaveConfig(false)}
          title="Save Configuration"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Configuration Name</label>
              <Input
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder="Enter configuration name"
              />
            </div>
            {selectedDevice && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm"><strong>Device:</strong> {selectedDevice.name}</p>
                <p className="text-sm"><strong>Type:</strong> {selectedDevice.type}</p>
                <p className="text-sm">
                  <strong>Checks:</strong> {checks.filter(c => c.status !== null).length} of {checks.length} completed
                </p>
              </div>
            )}
            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={handleSaveConfiguration} 
                className="flex-1"
                disabled={!configName.trim()}
              >
                Save Configuration
              </Button>
              <Button variant="outline" onClick={() => setShowSaveConfig(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Compliance;
