
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, Mail, MessageSquare, BellRing, BellOff } from 'lucide-react';
import { toast } from 'sonner';

const NotificationSystem: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState('environmental-officer@example.gov');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [testSent, setTestSent] = useState(false);

  const handleTestNotification = () => {
    toast.info('Test notification sent', {
      description: 'A test notification was sent to all enabled channels',
    });
    setTestSent(true);
    
    // Reset after 3 seconds
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleSaveSettings = () => {
    toast.success('Notification settings saved', {
      description: 'Your notification preferences have been updated',
    });
  };

  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Alert & Notification System
        </CardTitle>
        <CardDescription>
          Configure how alerts are sent when incidents are detected
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="channels" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="channels">Notification Channels</TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
            <TabsTrigger value="test">Test System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="channels" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 rounded-md border bg-card">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-riverguard-600" />
                  <div>
                    <h4 className="font-medium">Email Alerts</h4>
                    <p className="text-xs text-muted-foreground">
                      Send notifications to email addresses
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>
              
              {emailEnabled && (
                <div className="pl-10 space-y-2">
                  <Label htmlFor="email-recipients">Recipients</Label>
                  <Input 
                    id="email-recipients"
                    placeholder="Enter email addresses"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple emails with commas
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between p-3 rounded-md border bg-card">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-riverguard-600" />
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-xs text-muted-foreground">
                      Send SMS alerts using Twilio
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                />
              </div>
              
              {smsEnabled && (
                <div className="pl-10 space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input 
                    id="phone-number"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use international format: +1234567890
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between p-3 rounded-md border bg-card">
                <div className="flex items-center space-x-3">
                  <BellRing className="h-5 w-5 text-riverguard-600" />
                  <div>
                    <h4 className="font-medium">Telegram Bot</h4>
                    <p className="text-xs text-muted-foreground">
                      Send alerts directly to Telegram
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={telegramEnabled}
                  onCheckedChange={setTelegramEnabled}
                />
              </div>
              
              {telegramEnabled && (
                <div className="pl-10 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bot-token">Bot Token</Label>
                    <Input 
                      id="bot-token"
                      placeholder="Enter Telegram bot token"
                      type="password"
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chat-id">Chat ID</Label>
                    <Input 
                      id="chat-id"
                      placeholder="Enter chat ID"
                      value={chatId}
                      onChange={(e) => setChatId(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <Button onClick={handleSaveSettings} className="w-full">
                Save Notification Settings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100">
                <h3 className="font-medium mb-2">Alert Severity Thresholds</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="confidence-threshold">
                        AI Confidence Threshold
                      </Label>
                      <div className="flex items-center mt-1.5">
                        <Input 
                          id="confidence-threshold" 
                          type="range" 
                          min="50" 
                          max="99" 
                          defaultValue="80" 
                          className="w-full"
                        />
                        <span className="ml-2 text-sm">80%</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="alert-delay">
                        Alert Delay (seconds)
                      </Label>
                      <Input 
                        id="alert-delay"
                        type="number" 
                        min="0" 
                        max="60" 
                        defaultValue="5"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base">Incident Types to Alert</Label>
                
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="alert-dumping" defaultChecked />
                    <Label htmlFor="alert-dumping">Dumping Activity</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="alert-suspicious" defaultChecked />
                    <Label htmlFor="alert-suspicious">Suspicious Behavior</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="alert-vehicles" defaultChecked />
                    <Label htmlFor="alert-vehicles">Unauthorized Vehicles</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="alert-debris" />
                    <Label htmlFor="alert-debris">Floating Debris</Label>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button onClick={handleSaveSettings} className="w-full">
                  Save Alert Settings
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="test" className="space-y-4">
            <div className="bg-muted p-4 rounded-md text-center">
              <BellRing className="h-12 w-12 mx-auto mb-2 text-riverguard-600" />
              <h3 className="text-lg font-medium mb-2">Test Notification System</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send a test alert to all enabled notification channels
              </p>
              
              <Button 
                onClick={handleTestNotification} 
                disabled={testSent}
                className="w-full"
              >
                {testSent ? 'Test Sent ✓' : 'Send Test Alert'}
              </Button>
            </div>
            
            <div className="bg-riverguard-50 border border-riverguard-100 rounded-md p-4">
              <h4 className="font-medium mb-2 flex items-center">
                <BellOff className="h-4 w-4 mr-1.5" />
                Do Not Disturb Settings
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                  <Switch id="quiet-hours" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="start-time" className="text-xs">From</Label>
                    <Input id="start-time" type="time" defaultValue="22:00" />
                  </div>
                  <div>
                    <Label htmlFor="end-time" className="text-xs">To</Label>
                    <Input id="end-time" type="time" defaultValue="07:00" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationSystem;
