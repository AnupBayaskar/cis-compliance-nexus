
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { Download, Search, FileText, Calendar, Users } from 'lucide-react';

const benchmarks = [
  {
    id: 1,
    name: 'CIS Microsoft Windows Server 2022',
    version: 'v2.0.0',
    released: '2024-01-15',
    category: 'Operating System',
    description: 'Comprehensive security configuration benchmark for Windows Server 2022',
    downloads: 15420
  },
  {
    id: 2,
    name: 'CIS Ubuntu Linux 22.04 LTS',
    version: 'v1.1.0',
    released: '2024-02-20',
    category: 'Operating System',
    description: 'Security hardening guidelines for Ubuntu 22.04 LTS systems',
    downloads: 12890
  },
  {
    id: 3,
    name: 'CIS Apache HTTP Server 2.4',
    version: 'v2.1.0',
    released: '2024-01-30',
    category: 'Web Server',
    description: 'Security configuration benchmark for Apache HTTP Server',
    downloads: 8765
  },
  {
    id: 4,
    name: 'CIS PostgreSQL 15',
    version: 'v1.0.0',
    released: '2024-03-10',
    category: 'Database',
    description: 'Database security configuration guidelines for PostgreSQL 15',
    downloads: 6543
  },
  {
    id: 5,
    name: 'CIS Docker Community Edition',
    version: 'v1.6.0',
    released: '2024-02-05',
    category: 'Containerization',
    description: 'Container security benchmark for Docker environments',
    downloads: 9876
  }
];

const Benchmarks = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Operating System', 'Web Server', 'Database', 'Containerization'];

  const filteredBenchmarks = benchmarks.filter(benchmark => {
    const matchesSearch = benchmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benchmark.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || benchmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (benchmark: any, format: string) => {
    console.log(`Downloading ${benchmark.name} as ${format}`);
    // In real implementation, this would trigger actual download
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">CIS Benchmarks Library</h1>
          <p className="text-xl text-muted-foreground">
            Access the latest security configuration benchmarks for your technology stack
          </p>
        </div>

        {/* Current Version Info */}
        <Card className="mb-8 border-brand-green/20 bg-brand-green/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-brand-green" />
              <span>Latest Updates</span>
            </CardTitle>
            <CardDescription>
              What's new in the current benchmark versions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Enhanced Security Controls</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Updated password complexity requirements</li>
                  <li>• New multi-factor authentication guidelines</li>
                  <li>• Enhanced logging and monitoring controls</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Platform Updates</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Support for latest OS versions</li>
                  <li>• Cloud-native security configurations</li>
                  <li>• Container security enhancements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search benchmarks by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Benchmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBenchmarks.map((benchmark) => (
            <Card key={benchmark.id} className="hover-lift">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{benchmark.category}</Badge>
                  <Badge variant="outline">{benchmark.version}</Badge>
                </div>
                <CardTitle className="text-lg">{benchmark.name}</CardTitle>
                <CardDescription>{benchmark.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{benchmark.released}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{benchmark.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleDownload(benchmark, 'pdf')}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    
                    {user && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleDownload(benchmark, 'csv')}
                        >
                          CSV
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleDownload(benchmark, 'json')}
                        >
                          JSON
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBenchmarks.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No benchmarks found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Benchmarks;
