import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Feeds: React.FC = () => {
  const { toast } = useToast();
  const cameras = [
    { id: 1, name: 'East River Checkpoint', status: 'online' },
    { id: 2, name: 'West Bridge Camera', status: 'online' },
    { id: 3, name: 'Downtown Riverfront', status: 'offline' },
    { id: 4, name: 'Industrial Zone', status: 'online' }
  ];

  const handleRefreshFeeds = () => {
    toast({
      title: "Refreshing camera feeds",
      description: "Attempting to reconnect to all camera systems..."
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-riverguard-900 mb-1">Camera Feeds</h1>
            <p className="text-gray-500">Monitor all connected surveillance cameras</p>
          </div>
          <Button variant="outline" onClick={handleRefreshFeeds}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Feeds
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Cameras</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="offline">Offline</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cameras.map((camera) => (
                <Card key={camera.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center border-b">
                    {camera.status === 'online' ? (
                      <img 
                        src={camera.id % 4 === 1 ? '/img1.jpeg' : 
                             camera.id % 4 === 2 ? '/img2.jpg' : 
                             camera.id % 4 === 3 ? '/img3.jpeg' : '/img4.jpeg'} 
                        alt={camera.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Camera className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-gray-500">Feed unavailable</p>
                      </div>
                    )}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      camera.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {camera.status}
                    </div>
                  </div>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">{camera.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <Button asChild className="text-sm text-riverguard-600 hover:text-riverguard-800">
                      <Link to={`/live-camera/${camera.id}`}>
                        View Live Feed
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="online" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cameras
                .filter(camera => camera.status === 'online')
                .map((camera) => (
                  <Card key={camera.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center border-b">
                      <img 
                        src={camera.id % 4 === 1 ? '/img1.jpeg' : 
                             camera.id % 4 === 2 ? '/img2.jpg' : 
                             camera.id % 4 === 3 ? '/img3.jpeg' : '/img4.jpeg'} 
                        alt={camera.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {camera.status}
                      </div>
                    </div>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">{camera.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <Button asChild className="text-sm text-riverguard-600 hover:text-riverguard-800">
                        <Link to={`/live-camera/${camera.id}`}>
                          View Live Feed
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="offline" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cameras
                .filter(camera => camera.status === 'offline')
                .map((camera) => (
                  <Card key={camera.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center border-b">
                      <div className="flex flex-col items-center justify-center h-full">
                        <Camera className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-gray-500">Feed unavailable</p>
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {camera.status}
                      </div>
                    </div>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">{camera.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <Button className="text-sm text-riverguard-600 hover:text-riverguard-800">
                        Troubleshoot
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Feeds;
