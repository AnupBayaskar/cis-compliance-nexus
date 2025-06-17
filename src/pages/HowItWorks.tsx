
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Server, 
  Download, 
  CheckCircle, 
  FileText, 
  Users, 
  Shield,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to use CIS Web Compliance to assess and improve your infrastructure security
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center mb-12">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-brand-green" />
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-8">
          {/* Step 1 */}
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="h-6 w-6" />
                    <span>Add Your Devices</span>
                  </CardTitle>
                  <CardDescription>
                    Register the systems you want to assess for compliance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Start by adding your servers, workstations, or network devices to the platform. 
                You can specify the device type (Windows Server, Ubuntu, CentOS, etc.) to get 
                the appropriate CIS benchmarks.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Click "Add New Device" in the Compliance Check section</li>
                <li>Provide device name and type</li>
                <li>Optionally add a description for better organization</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-6 w-6" />
                    <span>Download Benchmarks</span>
                  </CardTitle>
                  <CardDescription>
                    Get the latest CIS benchmark files for your devices
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Download comprehensive security benchmarks in your preferred format. 
                These benchmarks contain detailed security controls and configuration 
                recommendations from the Center for Internet Security.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Available in PDF, CSV, and JSON formats</li>
                <li>Updated with the latest security standards</li>
                <li>Device-specific recommendations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6" />
                    <span>Perform Compliance Checks</span>
                  </CardTitle>
                  <CardDescription>
                    Review and mark the status of each security control
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Go through each security control and mark its compliance status. 
                Use the visual indicators to quickly assess your infrastructure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Pass - Compliant</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                  <div className="h-5 w-5 text-red-600">❌</div>
                  <span className="text-sm font-medium">Fail - Non-compliant</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg">
                  <div className="h-5 w-5 text-yellow-600">⚠️</div>
                  <span className="text-sm font-medium">Skip - Not applicable</span>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Search through controls by ID or title</li>
                <li>View detailed descriptions and remediation guidance</li>
                <li>Reset all selections to start fresh</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-6 w-6" />
                    <span>Generate Reports</span>
                  </CardTitle>
                  <CardDescription>
                    Create comprehensive compliance reports
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Save your compliance check configurations and generate detailed reports 
                for auditing, documentation, and continuous monitoring.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Save multiple configurations per device</li>
                <li>Track compliance scores over time</li>
                <li>Export reports for stakeholders</li>
                <li>View summary statistics and trends</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-br from-brand-green/10 to-brand-gray/10">
            <CardContent className="space-y-4">
              <Shield className="h-12 w-12 text-brand-green mx-auto" />
              <h3 className="text-2xl font-bold">Ready to Secure Your Infrastructure?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start your compliance assessment today and improve your security posture
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90">
                  <Link to="/compliance" className="flex items-center space-x-2">
                    <span>Start Compliance Check</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/benchmarks">View Benchmarks</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
