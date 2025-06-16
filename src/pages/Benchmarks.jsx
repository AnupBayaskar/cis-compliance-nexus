
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Server, 
  Globe, 
  Database,
  Monitor,
  Cloud,
  Shield
} from 'lucide-react';

const Benchmarks = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const benchmarkCategories = [
    { id: 'operating-systems', name: 'Operating Systems', icon: Monitor, count: 45 },
    { id: 'cloud-providers', name: 'Cloud Providers', icon: Cloud, count: 28 },
    { id: 'databases', name: 'Databases', icon: Database, count: 22 },
    { id: 'web-servers', name: 'Web Servers', icon: Server, count: 18 },
    { id: 'network-devices', name: 'Network Devices', icon: Globe, count: 15 },
    { id: 'applications', name: 'Applications', icon: Shield, count: 38 }
  ];

  const benchmarks = [
    {
      id: 1,
      name: 'CIS Microsoft Windows 10 Enterprise',
      version: 'v1.10.0',
      category: 'Operating Systems',
      description: 'Comprehensive security configuration benchmark for Windows 10 Enterprise environments.',
      controls: 487,
      difficulty: 'Intermediate',
      updated: '2024-01-15'
    },
    {
      id: 2,
      name: 'CIS Ubuntu Linux 20.04 LTS',
      version: 'v1.1.0',
      category: 'Operating Systems',
      description: 'Security hardening guidelines for Ubuntu Linux 20.04 LTS server and desktop systems.',
      controls: 312,
      difficulty: 'Advanced',
      updated: '2024-01-20'
    },
    {
      id: 3,
      name: 'CIS Amazon Web Services Foundations',
      version: 'v1.4.0',
      category: 'Cloud Providers',
      description: 'Security best practices for AWS cloud infrastructure and services configuration.',
      controls: 156,
      difficulty: 'Intermediate',
      updated: '2024-01-10'
    },
    {
      id: 4,
      name: 'CIS Microsoft Azure Foundations',
      version: 'v1.3.0',
      category: 'Cloud Providers',
      description: 'Comprehensive security framework for Microsoft Azure cloud environments.',
      controls: 203,
      difficulty: 'Intermediate',
      updated: '2024-01-08'
    },
    {
      id: 5,
      name: 'CIS PostgreSQL 13',
      version: 'v1.0.0',
      category: 'Databases',
      description: 'Database security configuration guidelines for PostgreSQL 13 installations.',
      controls: 89,
      difficulty: 'Advanced',
      updated: '2023-12-15'
    },
    {
      id: 6,
      name: 'CIS Apache HTTP Server 2.4',
      version: 'v1.5.0',
      category: 'Web Servers',
      description: 'Web server hardening standards for Apache HTTP Server 2.4 deployments.',
      controls: 127,
      difficulty: 'Intermediate',
      updated: '2024-01-05'
    }
  ];

  const filteredBenchmarks = benchmarks.filter(benchmark =>
    benchmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    benchmark.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">CIS Benchmarks Library</h1>
          <p className="text-xl text-muted-foreground">
            Discover and implement industry-standard security configurations
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search benchmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full lg:w-fit">
            <TabsTrigger value="all">All Benchmarks</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Updated</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBenchmarks.map((benchmark) => (
                <Card key={benchmark.id} className="border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg leading-tight">{benchmark.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {benchmark.version}
                        </Badge>
                      </div>
                      <div className={`h-3 w-3 rounded-full ${getDifficultyColor(benchmark.difficulty)}`} />
                    </div>
                    <CardDescription className="text-sm">
                      {benchmark.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Controls:</span>
                      <span className="font-medium">{benchmark.controls}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant="secondary" className="text-xs">
                        {benchmark.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Updated:</span>
                      <span className="font-medium">{benchmark.updated}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benchmarkCategories.map((category) => (
                <Card key={category.id} className="border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="h-16 w-16 bg-gradient-to-br from-brand-green to-brand-gray rounded-full flex items-center justify-center mx-auto mb-4">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>
                      {category.count} benchmarks available
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Most Popular Benchmarks</h3>
              <p className="text-muted-foreground">Coming soon - popularity metrics based on community usage</p>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Recently Updated</h3>
              <p className="text-muted-foreground">Showing benchmarks updated in the last 30 days</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Benchmarks;
