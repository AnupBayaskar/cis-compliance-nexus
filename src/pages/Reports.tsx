
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReports } from '@/context/ReportsContext';
import { useAuth } from '@/context/AuthContext';
import { ChevronDown, FileText, Calendar, TrendingUp } from 'lucide-react';

const Reports = () => {
  const { reports, selectedDevice, setSelectedDevice, devices } = useReports();
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredReports = selectedDevice 
    ? reports.filter(report => report.deviceName === selectedDevice)
    : reports;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name || 'User'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Device Selection
          </CardTitle>
          <CardDescription>
            Select a device to view its compliance reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full md:w-80 justify-between"
              >
                {selectedDevice || 'Select a device...'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-background border border-border shadow-lg">
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedDevice('');
                  setIsDropdownOpen(false);
                }}
                className="cursor-pointer hover:bg-muted"
              >
                All Devices
              </DropdownMenuItem>
              {devices.map((device) => (
                <DropdownMenuItem
                  key={device}
                  onClick={() => {
                    setSelectedDevice(device);
                    setIsDropdownOpen(false);
                  }}
                  className="cursor-pointer hover:bg-muted"
                >
                  {device}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">
          {selectedDevice ? `Reports for ${selectedDevice}` : 'All Reports'}
        </h2>
        
        {filteredReports.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {selectedDevice 
                  ? `No reports found for ${selectedDevice}`
                  : 'No reports generated yet. Generate your first report from the Compliance Check page.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {report.deviceName}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {report.generatedAt.toLocaleDateString()}
                  </div>
                </div>
                <CardDescription>
                  Compliance Score: {report.complianceScore}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-brand-green" />
                  <span className="font-medium">Summary</span>
                </div>
                <p className="text-sm text-muted-foreground">{report.summary}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
