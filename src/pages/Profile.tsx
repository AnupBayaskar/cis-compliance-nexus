import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Upload, HelpCircle, Eye, Settings, Crown, Mail, Calendar, CheckCircle, AlertCircle, Clock, Users, Monitor, Shield, FileText, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Mock data
const mockUserTeams = [
  { id: '1', name: 'Security Team', role: 'Team Lead' },
  { id: '2', name: 'Compliance Board', role: 'Member' }
];

const mockUserConfigurations = [
  {
    id: '1',
    name: 'Web Server Security Config',
    date: '2024-01-15',
    device: 'Web Server 01',
    status: 'Validated'
  },
  {
    id: '2',
    name: 'Database Hardening',
    date: '2024-01-12',
    device: 'Database Server',
    status: 'Pending'
  },
  {
    id: '3',
    name: 'Workstation Setup',
    date: '2024-01-10',
    device: 'John Laptop',
    status: 'Denied'
  }
];

const mockValidations = [
  {
    id: '1',
    configName: 'Web Server Security Config',
    team: 'Security Team',
    validatedOn: '2024-01-15',
    marks: 85,
    status: 'Approved'
  },
  {
    id: '2',
    configName: 'Database Hardening',
    team: 'IT Operations',
    validatedOn: '2024-01-12',
    marks: 92,
    status: 'Approved'
  }
];

const mockTeamStats = [
  {
    teamName: 'Security Team',
    members: 8,
    totalMarks: 1250,
    avgCompliance: 87,
    pendingValidations: 3
  },
  {
    teamName: 'IT Operations',
    members: 6,
    totalMarks: 980,
    avgCompliance: 92,
    pendingValidations: 1
  }
];

const rolePermissions = {
  'member': {
    title: 'Member',
    permissions: [
      'Create compliance configurations',
      'Mark compliance controls',
      'Submit configurations for validation',
      'View own submissions and status'
    ]
  },
  'validator': {
    title: 'Validator',
    permissions: [
      'All member permissions',
      'Validate compliance submissions',
      'Review and approve configurations',
      'Send queries back to members'
    ]
  },
  'team-lead': {
    title: 'Team Lead',
    permissions: [
      'All validator permissions',
      'Manage team members',
      'Assign roles within team',
      'Generate team reports'
    ]
  },
  'organization-lead': {
    title: 'Organization Lead',
    permissions: [
      'All team lead permissions',
      'Create and manage teams',
      'Organization-wide oversight',
      'User management across all teams'
    ]
  }
};

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showRoleInfo, setShowRoleInfo] = useState(false);
  const [expandedConfigs, setExpandedConfigs] = useState(false);
  const [expandedValidations, setExpandedValidations] = useState(false);

  const handleProfilePictureUpload = () => {
    console.log('Profile picture upload clicked');
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

  // Organization Leader gets the full profile view
  if (user.role === 'organization-lead') {
    const roleInfo = rolePermissions[user.role] || rolePermissions.member;
    const RoleIcon = Crown;

    const getQuickActions = () => {
      return [
        { name: 'Team Space', href: '/team-space', icon: Users, description: 'Manage your teams' },
        { name: 'Device Space', href: '/device-space', icon: Monitor, description: 'Configure devices' },
        { name: 'Compliance Space', href: '/compliance-space', icon: Shield, description: 'Mark compliance' },
        { name: 'Validation Space', href: '/validation-space', icon: CheckCircle, description: 'Validate submissions' },
        { name: 'Reports Space', href: '/reports-space', icon: FileText, description: 'Generate reports' },
        { name: 'Organization Space', href: '/organization-space', icon: Building, description: 'Manage organizations' }
      ];
    };

    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <Badge className={cn("mt-2", "bg-primary/10 text-primary")}>
                  <RoleIcon className="h-4 w-4 mr-2" />
                  {roleInfo.title}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <p className="text-muted-foreground">Navigate to different sections of the application</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {getQuickActions().map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <Button
                        key={action.name}
                        variant="outline"
                        onClick={() => navigate(action.href)}
                        className="h-auto p-4 justify-start hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ActionIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{action.name}</div>
                            <div className="text-sm text-muted-foreground">{action.description}</div>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info for Org Leaders */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Organization Leader Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Create Organizations</h4>
                      <p className="text-sm text-muted-foreground">Set up new organizational structures</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/organization-space')}
                    >
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Global Validation</h4>
                      <p className="text-sm text-muted-foreground">Validate compliance across all teams</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/validation-space')}
                    >
                      Validate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Simplified profile for other roles
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your profile and settings</p>
        </div>
      </div>

      {/* Header Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                onClick={handleProfilePictureUpload}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>

            {/* Organization and Role Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{user?.organizationName || 'SmartEdge Technologies'}</h2>
              <div className="flex items-center gap-2 mb-4">
                <Badge 
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {rolePermissions[user?.role]?.title || 'Member'}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowRoleInfo(true)}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Name:</strong> {user?.name || 'John Doe'}</p>
                <p><strong>Email:</strong> {user?.email || 'john.doe@smartedge.in'}</p>
                <p><strong>User ID:</strong> {user?.id || 'USR-001'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Your Teams */}
        <Card>
          <CardHeader>
            <CardTitle>Your Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockUserTeams.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{team.name}</h4>
                    <p className="text-sm text-muted-foreground">Role: {team.role}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Opens Team Space page
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Role-specific content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {user.role === 'validator' ? 'Recent Validations' : 
               user.role === 'team-lead' ? 'Team Statistics' : 
               'Your Configurations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.role === 'validator' ? (
              <div className={`space-y-3 ${!expandedValidations ? 'max-h-64 overflow-hidden' : ''}`}>
                {mockValidations.map((validation) => (
                  <div
                    key={validation.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{validation.configName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Team: {validation.team} • {validation.validatedOn}
                      </p>
                      <p className="text-sm text-primary">Marks: {validation.marks}/100</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setExpandedValidations(!expandedValidations)}
                  >
                    {expandedValidations ? 'Show Less' : 'Read More'}
                  </Button>
                </div>
              </div>
            ) : user.role === 'team-lead' ? (
              <div className="space-y-3">
                {mockTeamStats.map((team, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <h4 className="font-medium mb-2">{team.teamName}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Members</p>
                        <p className="font-medium">{team.members}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Marks</p>
                        <p className="font-medium">{team.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Compliance</p>
                        <p className="font-medium">{team.avgCompliance}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pending</p>
                        <p className="font-medium">{team.pendingValidations}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    View Team Details
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`space-y-3 ${!expandedConfigs ? 'max-h-64 overflow-hidden' : ''}`}>
                {mockUserConfigurations.map((config) => (
                  <div
                    key={config.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{config.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Device: {config.device} • {config.date}
                      </p>
                      <Badge
                        variant={
                          config.status === 'Validated' ? 'default' :
                          config.status === 'Denied' ? 'destructive' : 'secondary'
                        }
                        className={
                          config.status === 'Validated' ? 'bg-green-100 text-green-800' : ''
                        }
                      >
                        {config.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setExpandedConfigs(!expandedConfigs)}
                  >
                    {expandedConfigs ? 'Show Less' : 'Read More'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {expandedConfigs ? 'Collapse view' : 'Expand to see all configurations'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Role Information Dialog */}
      <Dialog open={showRoleInfo} onOpenChange={setShowRoleInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Role: {rolePermissions[user?.role]?.title || 'Member'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Permissions & Responsibilities:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {(rolePermissions[user?.role]?.permissions || rolePermissions.member.permissions).map((permission, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t">
              <Button onClick={() => setShowRoleInfo(false)} className="w-full">
                Got it
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
