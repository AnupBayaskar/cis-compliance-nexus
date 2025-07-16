
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, UserPlus, Crown, Shield, CheckCircle, User, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface TeamMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinedAt: string;
  teamId: string;
}

interface Team {
  _id: string;
  name: string;
  details?: string;
  admin: string;
  members: TeamMember[];
  organizationId: string;
  createdAt: string;
}

const roleConfig = {
  'organization-lead': { label: 'Organization Leader', icon: Crown, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  'team-lead': { label: 'Team Leader', icon: Shield, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  'validator': { label: 'Validator', icon: CheckCircle, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  'member': { label: 'Member', icon: User, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' }
};

const API_BASE_URL = 'http://localhost:3000';

export default function TeamSpace() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '', teamId: '' });
  const [addingMember, setAddingMember] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch teams from API
  const fetchTeams = async () => {
    if (!isAuthenticated || !user) {
      setError('Please log in to view teams');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('governer-token');
      const response = await axios.get(`${API_BASE_URL}/teams`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Filter teams by user's organization if user is not super-admin
      let filteredTeams = response.data;
      if (user.role !== 'super-admin' && user.organizationId) {
        filteredTeams = response.data.filter((team: Team) => 
          team.organizationId === user.organizationId
        );
      }

      setTeams(filteredTeams);
    } catch (err: any) {
      console.error('Error fetching teams:', err);
      setError(err.response?.data?.message || 'Failed to fetch teams');
      toast({
        title: 'Error',
        description: 'Failed to fetch teams. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Add member to team
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.email.trim() || !newMember.role || !newMember.teamId) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    try {
      setAddingMember(true);
      const token = localStorage.getItem('governer-token');
      
      await axios.post(`${API_BASE_URL}/teams/${newMember.teamId}/members`, {
        name: newMember.name.trim(),
        email: newMember.email.trim(),
        role: newMember.role
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast({
        title: 'Success',
        description: 'Team member added successfully'
      });

      // Refresh teams data
      await fetchTeams();
      
      // Reset form
      setNewMember({ name: '', email: '', role: '', teamId: '' });
      setShowAddMember(false);
    } catch (err: any) {
      console.error('Error adding member:', err);
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to add team member',
        variant: 'destructive'
      });
    } finally {
      setAddingMember(false);
    }
  };

  // Fetch teams on component mount and when user changes
  useEffect(() => {
    fetchTeams();
  }, [user, isAuthenticated]);

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">
                Please log in to view and manage teams.
              </p>
              <Button onClick={() => window.location.href = '/auth'}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Team Management</h1>
              <p className="text-muted-foreground">Manage your organization's teams and members</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-2 text-muted-foreground">Loading teams...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage your organization's teams and members</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Error Loading Teams</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchTeams} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage your organization's teams and members</p>
          </div>
        </div>
        
        <Button onClick={fetchTeams} variant="outline">
          <Users className="w-4 h-4 mr-2" />
          Refresh Teams
        </Button>
      </div>

      {teams.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">No Teams Found</h2>
              <p className="text-muted-foreground mb-4">
                No teams have been created yet. Create a team in the Organization Space to get started.
              </p>
              <Button onClick={() => window.location.href = '/organization-space'}>
                Go to Organization Space
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {teams.map((team) => (
            <Card key={team._id} className="border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {team.members.length} members • Admin: {team.admin}
                    </p>
                    {team.details && (
                      <p className="text-sm text-muted-foreground mt-1">{team.details}</p>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {team.members.map((member) => (
                    <div
                      key={member._id}
                      className="flex flex-col items-center p-4 rounded-xl border border-border hover:bg-accent/50 transition-all duration-200 cursor-pointer min-w-[140px]"
                      onClick={() => setSelectedMember(member)}
                    >
                      <Avatar className="h-12 w-12 mb-3">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-sm text-center mb-2">{member.name}</p>
                      <Badge className={cn("text-xs mb-2", roleConfig[member.role as keyof typeof roleConfig]?.color || roleConfig.member.color)}>
                        {roleConfig[member.role as keyof typeof roleConfig]?.label || 'Member'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7 text-blue-600 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}

                  <div
                    className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer min-w-[140px] min-h-[160px]"
                    onClick={() => {
                      setNewMember({ ...newMember, teamId: team._id });
                      setShowAddMember(true);
                    }}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Plus className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-blue-600">Add Member</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddMember} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              required
            />
            <Select
              value={newMember.role}
              onValueChange={(value) => setNewMember({ ...newMember, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="validator">Validator</SelectItem>
                <SelectItem value="team-lead">Team Lead</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowAddMember(false)} 
                className="flex-1"
                disabled={addingMember}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={addingMember}>
                {addingMember ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Member'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Member Details Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-lg">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <p className="text-muted-foreground">{selectedMember.email}</p>
                  <Badge className={cn("mt-2", roleConfig[selectedMember.role as keyof typeof roleConfig]?.color || roleConfig.member.color)}>
                    {roleConfig[selectedMember.role as keyof typeof roleConfig]?.label || 'Member'}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Joined:</span>
                  <span>{new Date(selectedMember.joinedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Team ID:</span>
                  <span className="font-mono text-xs">{selectedMember.teamId}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Reassign Team
                </Button>
                <Button variant="outline" className="flex-1">
                  Change Role
                </Button>
                <Button variant="destructive" className="flex-1">
                  Remove
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
