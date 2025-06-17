
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

interface ReportSummaryProps {
  reportData: {
    totalChecks: number;
    passedChecks: number;
    failedChecks: number;
    skippedChecks: number;
    complianceScore: number;
  };
}

export const ReportSummary = ({ reportData }: ReportSummaryProps) => {
  return (
    <div className="mb-6 p-4 bg-muted/50 rounded-lg">
      <h4 className="font-semibold mb-3 flex items-center space-x-2">
        <FileText className="h-5 w-5" />
        <span>Compliance Report Summary</span>
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {reportData.passedChecks}
          </div>
          <div className="text-sm text-muted-foreground">Passed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {reportData.failedChecks}
          </div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {reportData.skippedChecks}
          </div>
          <div className="text-sm text-muted-foreground">Skipped</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-green">
            {reportData.complianceScore}%
          </div>
          <div className="text-sm text-muted-foreground">Score</div>
        </div>
      </div>
      <Button variant="outline" size="sm" className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download Full Report
      </Button>
    </div>
  );
};
