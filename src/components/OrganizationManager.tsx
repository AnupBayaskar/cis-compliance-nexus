
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Building, Plus, Users, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Organization {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  teamsCount: number;
  membersCount: number;
}

export function OrganizationManager() {
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      _id: '1',
      name: 'TechCorp Security',
      description: 'Main security organization for TechCorp',
      createdAt: '2024-01-15T10:00:00Z',
      teamsCount: 3,
      membersCount: 15
    }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDescription, setNewOrgDescription] = useState('');
  const { toast } = useToast();

  const handleCreateOrganization = async () => {
    if (!newOrgName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide an organization name",
        variant: "destructive"
      });
      return;
    }

    try {
      const newOrg: Organization = {
        _id: Date.now().toString(),
        name: newOrgName,
        description: newOrgDescription,
        createdAt: new Date().toISOString(),
        teamsCount: 0,
        membersCount: 1
      };

      setOrganizations([...organizations, newOrg]);
      setIsCreateModalOpen(false);
      setNewOrgName('');
      setNewOrgDescription('');

      toast({
        title: "Organization Created",
        description: `${newOrg.name} has been created successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create organization",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manage Organizations</h2>
          <p className="text-muted-foreground">Create and manage your organizations</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Organization
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Card key={org._id} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{org.name}</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{org.description}</p>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{org.teamsCount} teams</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{org.membersCount} members</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  Created {new Date(org.createdAt).toLocaleDateString()}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Teams
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Organization Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-white dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Create New Organization</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name (Required)</Label>
              <Input
                id="orgName"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="Enter organization name..."
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="orgDescription">Description</Label>
              <Textarea
                id="orgDescription"
                value={newOrgDescription}
                onChange={(e) => setNewOrgDescription(e.target.value)}
                placeholder="Describe your organization..."
                className="mt-2"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateOrganization} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Create Organization
              </Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
