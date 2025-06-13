
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  Bell, 
  Key, 
  Moon, 
  Sun,
  Save,
  Edit
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@company.com',
    role: 'Security Administrator',
    department: 'IT Security',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    scanAlerts: true,
    weeklyReports: false,
    maintenanceAlerts: true
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log('Saving profile:', profileData);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const recentActivity = [
    { action: 'Completed CIS Windows 10 scan', time: '2 hours ago', type: 'scan' },
    { action: 'Downloaded compliance report', time: '1 day ago', type: 'report' },
    { action: 'Updated security settings', time: '2 days ago', type: 'settings' },
    { action: 'Added new benchmark', time: '3 days ago', type: 'benchmark' }
  ];

  const permissions = [
    { name: 'Run Compliance Scans', granted: true },
    { name: 'View All Reports', granted: true },
    { name: 'Manage Benchmarks', granted: true },
    { name: 'User Administration', granted: false },
    { name: 'System Configuration', granted: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">User Profile</h1>
          <p className="text-xl text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 border-0 bg-card/60 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-brand-green to-brand-gray text-white">
                  {getInitials(profileData.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{profileData.name}</h2>
                <p className="text-lg text-muted-foreground mb-2">{profileData.role}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge variant="secondary">{profileData.department}</Badge>
                  <Badge variant="outline">{profileData.location}</Badge>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {profileData.email}
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full lg:w-fit">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <Button onClick={handleSaveProfile} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Role & Permissions</CardTitle>
                  <CardDescription>
                    Your current role and system permissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Role</Label>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-brand-green" />
                        <span className="font-medium">{profileData.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      {permissions.map((permission, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                          <span className="text-sm">{permission.name}</span>
                          <Badge variant={permission.granted ? 'default' : 'secondary'}>
                            {permission.granted ? 'Granted' : 'Denied'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable Two-Factor Authentication
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage API Keys
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Theme Preference</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred theme
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={toggleTheme}>
                      {theme === 'light' ? (
                        <>
                          <Moon className="h-4 w-4 mr-2" />
                          Dark Mode
                        </>
                      ) : (
                        <>
                          <Sun className="h-4 w-4 mr-2" />
                          Light Mode
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {key === 'emailNotifications' && 'Receive general email notifications'}
                        {key === 'scanAlerts' && 'Get alerts when scans complete or fail'}
                        {key === 'weeklyReports' && 'Receive weekly compliance summary reports'}
                        {key === 'maintenanceAlerts' && 'Notifications about system maintenance'}
                      </p>
                    </div>
                    <Button
                      variant={value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreferences({...preferences, [key]: !value})}
                    >
                      {value ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent actions and system interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-2 w-2 bg-brand-green rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
