
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Users, Plus, Edit2, Trash2, Crown, Shield, CheckCircle, User, Mail, Phone, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Mock data
const mockTeams = [
  {
    id: '1',
    name: 'Security Team',
    description: 'Responsible for cybersecurity compliance and monitoring',
    leadId: '3',
    leadName: 'Alice Johnson',
    leadEmail: 'alice.johnson@company.com',
    members: [
      { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'member', phone: '+1-555-0123', joinedAt: '2024-01-15' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', role: 'validator', phone: '+1-555-0124', joinedAt: '2024-01-10' },
      { id: '3', name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'team-lead', phone: '+1-555-0125', joinedAt: '2024-01-01' }
    ],
    createdAt: '2024-01-01',
    stats: {
      totalMembers: 3,
      activeConfigurations: 12,
      pendingValidations: 4,
      complianceRate: 87
    }
  },
  {
    id: '2',
    name: 'IT Operations',
    description: 'Infrastructure management and system administration',
    leadId: '4',
    leadName: 'Bob Wilson',
    leadEmail: 'bob.wilson@company.com',
    members: [
      { id: '4', name: 'Bob Wilson', email: 'bob.wilson@company.com', role: 'team-lead', phone: '+1-555-0126', joinedAt: '2024-01-01' },
      { id: '5', name: 'Carol Davis', email: 'carol.davis@company.com', role: 'member', phone: '+1-555-0127', joinedAt: '2024-01-12' }
    ],
    createdAt: '2024-01-01',
    stats: {
      totalMembers: 2,
      activeConfigurations: 8,
      pendingValidations: 2,
      complianceRate: 92
    }
  }
];

const getRoleIcon = (role) => {
  switch (role) {
    case 'organization-lead': return Crown;
    case 'team-lead': return Shield;
    case 'validator': return CheckCircle;
    default: return User;
  }
};

const getRoleColor = (role) => {
  switch (role) {
    case 'organization-lead': return 'bg-primary text-primary-foreground';
    case 'team-lead': return 'bg-primary/20 text-primary';
    case 'validator': return 'bg-green-500/20 text-green-700';
    default: return 'bg-gray-500/20 text-gray-700';
  }
};

export default function TeamSpace() {
  const { user } = useAuth();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const canManageTeams = user?.role === 'organization-lead' || user?.role === 'team-lead';

  const handleCreateTeam = () => {
    console.log('Creating team:', { name: newTeamName, description: newTeamDescription });
    setNewTeamName('');
    setNewTeamDescription('');
    setShowTeamDialog(false);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setNewTeamName(team.name);
    setNewTeamDescription(team.description);
    setIsEditing(true);
    setShowTeamDialog(true);
  };

  const handleDeleteTeam = (teamId) => {
    console.log('Deleting team:', teamId);
  };

  const handleAddMember = () => {
    console.log('Adding member:', newMemberEmail, 'to team:', selectedTeam?.id);
    setNewMemberEmail('');
    setShowMemberDialog(false);
  };

  const handleRemoveMember = (memberId) => {
    console.log('Removing member:', memberId, 'from team:', selectedTeam?.id);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Users className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Team Space</h1>
            <p className="text-muted-foreground">Manage teams and team members</p>
          </div>
        </div>
        {canManageTeams && (
          <Button onClick={() => {
            setIsEditing(false);
            setNewTeamName('');
            setNewTeamDescription('');
            setShowTeamDialog(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        )}
      </div>

      {/* Teams Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {mockTeams.map((team) => (
          <Card key={team.id} className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {team.name}
                </CardTitle>
                {canManageTeams && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTeam(team)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Team</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{team.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteTeam(team.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">{team.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Team Lead */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Team Lead
                </h4>
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {team.leadName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{team.leadName}</p>
                    <p className="text-xs text-muted-foreground">{team.leadEmail}</p>
                  </div>
                </div>
              </div>

              {/* Team Stats */}
              <div>
                <h4 className="font-medium mb-3">Team Statistics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{team.stats.totalMembers}</div>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{team.stats.complianceRate}%</div>
                    <p className="text-xs text-muted-foreground">Compliance</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{team.stats.activeConfigurations}</div>
                    <p className="text-xs text-muted-foreground">Configs</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{team.stats.pendingValidations}</div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Team Members ({team.members.length})</h4>
                  {canManageTeams && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTeam(team);
                        setShowMemberDialog(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {team.members.slice(0, 3).map((member) => {
                    const RoleIcon = getRoleIcon(member.role);
                    return (
                      <div key={member.id} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={cn("text-xs", getRoleColor(member.role))}>
                                <RoleIcon className="h-3 w-3 mr-1" />
                                {member.role.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {canManageTeams && member.role !== 'team-lead' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Member</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {member.name} from {team.name}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveMember(member.id)}>
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    );
                  })}
                  {team.members.length > 3 && (
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Members ({team.members.length})
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Team Dialog */}
      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Team' : 'Create New Team'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Team Name</label>
              <Input
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={newTeamDescription}
                onChange={(e) => setNewTeamDescription(e.target.value)}
                placeholder="Enter team description"
                rows={3}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowTeamDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateTeam} className="flex-1">
                {isEditing ? 'Update Team' : 'Create Team'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Member Email</label>
              <Input
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Enter member email address"
                type="email"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The user must already be registered in the system
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowMemberDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddMember} className="flex-1">
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
