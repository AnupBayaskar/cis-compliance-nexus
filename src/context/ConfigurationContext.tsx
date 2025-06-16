
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ComplianceCheck {
  id: string;
  title: string;
  category: string;
  criticality: string;
  description: string;
  status: boolean | null | 'skip';
}

interface SavedConfiguration {
  id: string;
  name: string;
  deviceId: number;
  deviceName: string;
  checks: ComplianceCheck[];
  savedAt: Date;
  reportGenerated?: boolean;
  reportData?: {
    totalChecks: number;
    passedChecks: number;
    failedChecks: number;
    skippedChecks: number;
    complianceScore: number;
  };
}

interface ConfigurationContextType {
  savedConfigurations: SavedConfiguration[];
  saveConfiguration: (name: string, deviceId: number, deviceName: string, checks: ComplianceCheck[]) => void;
  generateReport: (configId: string) => void;
  deleteConfiguration: (configId: string) => void;
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext);
  if (!context) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider');
  }
  return context;
};

export const ConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedConfigurations, setSavedConfigurations] = useState<SavedConfiguration[]>([]);

  // Load saved configurations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedConfigurations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedConfigurations(parsed.map((config: any) => ({
          ...config,
          savedAt: new Date(config.savedAt)
        })));
      } catch (error) {
        console.error('Error loading saved configurations:', error);
      }
    }
  }, []);

  // Save configurations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savedConfigurations', JSON.stringify(savedConfigurations));
  }, [savedConfigurations]);

  const saveConfiguration = (name: string, deviceId: number, deviceName: string, checks: ComplianceCheck[]) => {
    const newConfiguration: SavedConfiguration = {
      id: Date.now().toString(),
      name,
      deviceId,
      deviceName,
      checks,
      savedAt: new Date(),
      reportGenerated: false
    };

    setSavedConfigurations(prev => [newConfiguration, ...prev]);
  };

  const generateReport = (configId: string) => {
    setSavedConfigurations(prev => 
      prev.map(config => {
        if (config.id === configId) {
          const totalChecks = config.checks.length;
          const passedChecks = config.checks.filter(check => check.status === true).length;
          const failedChecks = config.checks.filter(check => check.status === false).length;
          const skippedChecks = config.checks.filter(check => check.status === 'skip').length;
          const complianceScore = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;

          return {
            ...config,
            reportGenerated: true,
            reportData: {
              totalChecks,
              passedChecks,
              failedChecks,
              skippedChecks,
              complianceScore
            }
          };
        }
        return config;
      })
    );
  };

  const deleteConfiguration = (configId: string) => {
    setSavedConfigurations(prev => prev.filter(config => config.id !== configId));
  };

  return (
    <ConfigurationContext.Provider value={{
      savedConfigurations,
      saveConfiguration,
      generateReport,
      deleteConfiguration
    }}>
      {children}
    </ConfigurationContext.Provider>
  );
};
