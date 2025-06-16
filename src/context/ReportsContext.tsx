
import { createContext, useContext, useState, ReactNode } from 'react';

interface Report {
  id: string;
  deviceName: string;
  generatedAt: Date;
  complianceScore: number;
  summary: string;
}

interface ReportsContextType {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'generatedAt'>) => void;
  selectedDevice: string;
  setSelectedDevice: (device: string) => void;
  devices: string[];
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  
  // Mock devices - in a real app, this would come from an API
  const devices = [
    'Server-01-Production',
    'Workstation-Admin-001',
    'Database-Primary',
    'Web-Server-Frontend',
    'Security-Gateway'
  ];

  const addReport = (reportData: Omit<Report, 'id' | 'generatedAt'>) => {
    const newReport: Report = {
      ...reportData,
      id: Math.random().toString(36).substr(2, 9),
      generatedAt: new Date(),
    };
    setReports(prev => [newReport, ...prev]);
  };

  return (
    <ReportsContext.Provider value={{
      reports,
      addReport,
      selectedDevice,
      setSelectedDevice,
      devices
    }}>
      {children}
    </ReportsContext.Provider>
  );
};
