
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { BellRing, CloudRain, Cog, Key, Mail, Shield, User, VideoIcon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-riverguard-900 mb-1">Settings</h1>
          <p className="text-gray-500">Configure system preferences and account settings</p>
        </div>

        <Tabs defaultValue="general">
          <div className="flex">
            <div className="w-48 shrink-0 mr-6">
              <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                <TabsTrigger value="general" className="w-full justify-start px-3">
                  <Cog className="mr-2 h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start px-3">
                  <BellRing className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start px-3">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="cameras" className="w-full justify-start px-3">
                  <VideoIcon className="mr-2 h-4 w-4" />
                  Cameras
                </TabsTrigger>
                <TabsTrigger value="sensors" className="w-full justify-start px-3">
                  <CloudRain className="mr-2 h-4 w-4" />
                  Sensors
                </TabsTrigger>
                <TabsTrigger value="account" className="w-full justify-start px-3">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure general system preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select defaultValue="america-new_york">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-new_york">America/New York</SelectItem>
                          <SelectItem value="america-chicago">America/Chicago</SelectItem>
                          <SelectItem value="america-denver">America/Denver</SelectItem>
                          <SelectItem value="america-los_angeles">America/Los Angeles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="units">Unit System</Label>
                      <Select defaultValue="imperial">
                        <SelectTrigger id="units">
                          <SelectValue placeholder="Select unit system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imperial">Imperial (°F, mph)</SelectItem>
                          <SelectItem value="metric">Metric (°C, km/h)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically refresh dashboard data
                        </div>
                      </div>
                      <Switch id="auto-refresh" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <div className="text-sm text-muted-foreground">
                          Use dark theme across the application
                        </div>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage how and when you receive alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Critical Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          High priority notifications for urgent events
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Warning Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Medium priority notifications
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Information Updates</Label>
                        <div className="text-sm text-muted-foreground">
                          Low priority informational updates
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Notifications</Label>
                      <Input id="email" type="email" placeholder="Email address" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">SMS Notifications</Label>
                      <Input id="phone" type="tel" placeholder="Phone number" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and API keys
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Key className="mr-2 h-4 w-4" />
                        Setup
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label>API Keys</Label>
                      <div className="text-sm text-muted-foreground mt-1 mb-4">
                        Manage API access for integrations
                      </div>
                      <Button size="sm" variant="outline">
                        Generate API Key
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="cameras">
                <Card>
                  <CardHeader>
                    <CardTitle>Camera Settings</CardTitle>
                    <CardDescription>
                      Configure surveillance camera settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="resolution">Default Resolution</Label>
                      <Select defaultValue="720p">
                        <SelectTrigger id="resolution">
                          <SelectValue placeholder="Select resolution" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                          <SelectItem value="720p">720p (HD)</SelectItem>
                          <SelectItem value="480p">480p (SD)</SelectItem>
                          <SelectItem value="360p">360p (Low)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="framerate">Frame Rate</Label>
                      <Select defaultValue="15">
                        <SelectTrigger id="framerate">
                          <SelectValue placeholder="Select frame rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 fps</SelectItem>
                          <SelectItem value="25">25 fps</SelectItem>
                          <SelectItem value="15">15 fps</SelectItem>
                          <SelectItem value="5">5 fps</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Motion Detection</Label>
                        <div className="text-sm text-muted-foreground">
                          Enable camera motion detection
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Night Vision</Label>
                        <div className="text-sm text-muted-foreground">
                          Enable camera night vision capabilities
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="sensors">
                <Card>
                  <CardHeader>
                    <CardTitle>Sensor Settings</CardTitle>
                    <CardDescription>
                      Configure environmental sensor settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="update-frequency">Update Frequency</Label>
                      <Select defaultValue="15">
                        <SelectTrigger id="update-frequency">
                          <SelectValue placeholder="Select update frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">Every 5 minutes</SelectItem>
                          <SelectItem value="15">Every 15 minutes</SelectItem>
                          <SelectItem value="30">Every 30 minutes</SelectItem>
                          <SelectItem value="60">Every hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label>Active Sensors</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Temperature Sensors</div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Water Level Sensors</div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Water Quality Sensors</div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Precipitation Sensors</div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Wind Sensors</div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Calibration Mode</Label>
                        <div className="text-sm text-muted-foreground">
                          Enable sensor calibration mode
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your user profile and account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Alex Johnson" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-email">Email Address</Label>
                      <Input id="account-email" type="email" defaultValue="alex.johnson@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Environmental Officer" readOnly />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Communications</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive system emails and newsletters
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="account-delete" className="text-red-500">Danger Zone</Label>
                      <div className="text-sm text-muted-foreground">
                        This will deactivate your account and remove all access
                      </div>
                      <Button variant="destructive" className="mt-2">Deactivate Account</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
