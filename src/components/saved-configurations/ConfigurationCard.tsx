
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  X,
  AlertTriangle,
  Minus
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ReportSummary } from './ReportSummary';

interface ConfigurationCardProps {
  config: any;
  onGenerateReport: (configId: string) => void;
  onDeleteConfiguration: (configId: string) => void;
}

export const ConfigurationCard = ({ config, onGenerateReport, onDeleteConfiguration }: ConfigurationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGenerateReport = () => {
    onGenerateReport(config.id);
  };

  const handleDeleteConfiguration = () => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      onDeleteConfiguration(config.id);
    }
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-brand-green">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-3 text-lg">
              <span>{config.name}</span>
              {config.reportGenerated && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Report Generated
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="flex items-center space-x-4">
              <span>Saved: {config.savedAt.toLocaleDateString()}</span>
              <span>{config.checks.length} checks</span>
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateReport}
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
                  onClick={toggleExpanded}
                >
                  {isExpanded ? (
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
              onClick={handleDeleteConfiguration}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {/* Report Summary */}
            {config.reportGenerated && config.reportData && (
              <ReportSummary reportData={config.reportData} />
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
                      {check.status === 'skip' && (
                        <Minus className="h-5 w-5 text-yellow-600" />
                      )}
                      {check.status === null && (
                        <AlertTriangle className="h-5 w-5 text-gray-400" />
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
  );
};
