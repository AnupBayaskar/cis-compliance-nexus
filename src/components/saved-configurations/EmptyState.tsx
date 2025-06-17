
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const EmptyState = () => {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Saved Configurations</h3>
        <p className="text-muted-foreground mb-4">
          Save a compliance check configuration from the Compliance Check page to get started
        </p>
      </CardContent>
    </Card>
  );
};
