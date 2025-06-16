
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center section-padding">
      <div className="max-w-md w-full">
        <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-2xl text-center">
          <CardHeader className="pb-4">
            <div className="h-20 w-20 bg-gradient-to-br from-brand-green to-brand-gray rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-6xl font-bold text-brand-green mb-4">404</CardTitle>
            <CardDescription className="text-xl">
              Oops! The page you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The page at <span className="font-mono bg-muted px-2 py-1 rounded">{location.pathname}</span> could not be found.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-brand-green hover:bg-brand-green/90 flex-1">
                <Link to="/" className="flex items-center justify-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Go Home</span>
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
