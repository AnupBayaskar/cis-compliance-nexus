
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useConfiguration } from '@/context/ConfigurationContext';
import { 
  FileText, 
  Download, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  X,
  AlertTriangle,
  Server,
  ArrowLeft
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const SavedConfigurations = () => {
  const { savedConfigurations, generateReport, deleteConfiguration } = useConfiguration();
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [expandedConfigs, setExpandedConfigs] = useState<Set<string>>(new Set());

  // Get unique devices from saved configurations
  const devices = savedConfigurations.reduce((acc, config) => {
    const existingDevice = acc.find(d => d.id === config.deviceId);
    if (!existingDevice) {
      acc.push({
        id: config.deviceId,
        name: config.deviceName,
        configCount: 1
      });
    } else {
      existingDevice.configCount++;
    }
    return acc;
  }, [] as Array<{ id: number; name: string; configCount: number }>);

  // Get configurations for selected device
  const deviceConfigurations = selectedDeviceId 
    ? savedConfigurations.filter(config => config.deviceId === selectedDeviceId)
    : [];

  const toggleExpanded = (configId: string) => {
    setExpandedConfigs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(configId)) {
        newSet.delete(configId);
      } else {
        newSet.add(configId);
      }
      return newSet;
    });
  };

  const handleGenerateReport = (configId: string) => {
    generateReport(configId);
  };

  const handleDeleteConfiguration = (configId: string) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      deleteConfiguration(configId);
    }
  };

  const handleBackToDevices = () => {
    setSelectedDeviceId(null);
    setExpandedConfigs(new Set());
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            {selectedDeviceId && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToDevices}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Devices</span>
              </Button>
            )}
            <h1 className="text-4xl font-bold">
              {selectedDeviceId ? 'Device Configurations' : 'Saved Configurations'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {selectedDeviceId 
              ? 'Manage compliance check configurations for the selected device'
              : 'Select a device to view its saved compliance check configurations'
            }
          </p>
        </div>

        {/* Content */}
        {savedConfigurations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Saved Configurations</h3>
              <p className="text-muted-foreground mb-4">
                Save a compliance check configuration from the Compliance Check page to get started
              </p>
            </CardContent>
          </Card>
        ) : selectedDeviceId === null ? (
          /* Device List View */
          <div className="space-y-4">
            {devices.map((device) => (
              <Card 
                key={device.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedDeviceId(device.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Server className="h-8 w-8 text-brand-green" />
                      <div>
                        <CardTitle className="text-xl">{device.name}</CardTitle>
                        <CardDescription>
                          Device ID: {device.id} • {device.configCount} configuration{device.configCount !== 1 ? 's' : ''}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {device.configCount} config{device.configCount !== 1 ? 's' : ''}
                      </Badge>
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          /* Device Configurations View */
          <div className="space-y-6">
            {deviceConfigurations.map((config) => (
              <Card key={config.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-3">
                        <span>{config.name}</span>
                        {config.reportGenerated && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Report Generated
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Server className="h-4 w-4" />
                          <span>{config.deviceName}</span>
                        </span>
                        <span>Saved: {config.savedAt.toLocaleDateString()}</span>
                        <span>{config.checks.length} checks</span>
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateReport(config.id)}
                        disabled={config.reportGenerated}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        {config.reportGenerated ? 'Report Generated' : 'Generate Report'}
                      </Button>
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleExpanded(config.id)}
                          >
                            {expandedConfigs.has(config.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteConfiguration(config.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <Collapsible open={expandedConfigs.has(config.id)}>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      {/* Report Summary */}
                      {config.reportGenerated && config.reportData && (
                        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center space-x-2">
                            <FileText className="h-5 w-5" />
                            <span>Compliance Report Summary</span>
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">
                                {config.reportData.passedChecks}
                              </div>
                              <div className="text-sm text-muted-foreground">Passed</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">
                                {config.reportData.failedChecks}
                              </div>
                              <div className="text-sm text-muted-foreground">Failed</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-600">
                                {config.reportData.skippedChecks}
                              </div>
                              <div className="text-sm text-muted-foreground">Skipped</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-brand-green">
                                {config.reportData.complianceScore}%
                              </div>
                              <div className="text-sm text-muted-foreground">Score</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download Full Report
                          </Button>
                        </div>
                      )}

                      {/* Compliance Checks Details */}
                      <div>
                        <h4 className="font-semibold mb-3">Compliance Checks</h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {config.checks.map((check) => (
                            <div
                              key={check.id}
                              className="flex items-center space-x-3 p-3 border border-border rounded-lg"
                            >
                              {/* Status Icon */}
                              <div className="flex-shrink-0">
                                {check.status === true && (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                )}
                                {check.status === false && (
                                  <X className="h-5 w-5 text-red-600" />
                                )}
                                {check.status === null && (
                                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                )}
                              </div>

                              {/* Check Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-mono text-sm text-brand-green">
                                    {check.id}
                                  </span>
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
                                <h5 className="font-medium text-sm">{check.title}</h5>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedConfigurations;
