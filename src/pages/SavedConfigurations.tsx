
import { useConfiguration } from '@/context/ConfigurationContext';
import { Accordion } from '@/components/ui/accordion';
import { DeviceCard } from '@/components/saved-configurations/DeviceCard';
import { EmptyState } from '@/components/saved-configurations/EmptyState';

const SavedConfigurations = () => {
  const { savedConfigurations, generateReport, deleteConfiguration } = useConfiguration();

  // Get unique devices from saved configurations
  const devices = savedConfigurations.reduce((acc, config) => {
    const existingDevice = acc.find(d => d.id === config.deviceId);
    if (!existingDevice) {
      acc.push({
        id: config.deviceId,
        name: config.deviceName,
        configCount: 1,
        configurations: [config]
      });
    } else {
      existingDevice.configCount++;
      existingDevice.configurations.push(config);
    }
    return acc;
  }, [] as Array<{ id: number; name: string; configCount: number; configurations: any[] }>);

  const handleGenerateReport = (configId: string) => {
    generateReport(configId);
  };

  const handleDeleteConfiguration = (configId: string) => {
    deleteConfiguration(configId);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Saved Configurations</h1>
          <p className="text-muted-foreground">
            Manage your saved compliance check configurations and generate reports
          </p>
        </div>

        {/* Content */}
        {savedConfigurations.length === 0 ? (
          <EmptyState />
        ) : (
          /* Device Accordion List */
          <Accordion type="multiple" className="space-y-4">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onGenerateReport={handleGenerateReport}
                onDeleteConfiguration={handleDeleteConfiguration}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default SavedConfigurations;
