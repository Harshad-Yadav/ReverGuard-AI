
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudRain, MapPin, Video, Eye, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Locations: React.FC = () => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  
  const locations = [
    {
      id: 1,
      name: 'Yamuna River Checkpoint',
      coordinates: '28.6139° N, 77.2090° E',
      status: 'active',
      cameraCount: 2,
      sensorCount: 3,
      riskLevel: 'medium',
      lastIncident: '3 days ago',
      incidentCount: 7
    },
    {
      id: 2,
      name: 'Howrah Bridge Camera',
      coordinates: '22.5850° N, 88.3461° E',
      status: 'active',
      cameraCount: 1,
      sensorCount: 2,
      riskLevel: 'high',
      lastIncident: '1 day ago',
      incidentCount: 12
    },
    {
      id: 3,
      name: 'Marine Drive Waterfront',
      coordinates: '18.9442° N, 72.8228° E', 
      status: 'maintenance',
      cameraCount: 3,
      sensorCount: 4,
      riskLevel: 'low',
      lastIncident: '2 weeks ago',
      incidentCount: 3
    },
    {
      id: 4,
      name: 'Ganga Ghats, Varanasi',
      coordinates: '25.3176° N, 83.0062° E',
      status: 'active',
      cameraCount: 4,
      sensorCount: 6,
      riskLevel: 'critical',
      lastIncident: 'Today',
      incidentCount: 18
    }
  ];

  const handleViewFeeds = (locationId: number) => {
    toast({
      title: "Opening camera feeds",
      description: `Connecting to cameras at ${locations.find(l => l.id === locationId)?.name}`
    });
  };

  const handleSetAlert = (locationId: number) => {
    toast({
      title: "Alert configured",
      description: `You'll be notified of incidents at ${locations.find(l => l.id === locationId)?.name}`
    });
  };
  
  const handleLocationClick = (id: number) => {
    setSelectedLocation(selectedLocation === id ? null : id);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">High Risk</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Critical Risk</Badge>;
      default:
        return <Badge>{risk}</Badge>;
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-700">Active</span>
          </div>
        );
      case 'maintenance':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-yellow-700">Maintenance</span>
          </div>
        );
      case 'inactive':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
            <span className="text-gray-600">Inactive</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-riverguard-900 mb-1">Monitoring Locations</h1>
          <p className="text-gray-500">Camera and sensor deployment locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <Card 
              key={location.id} 
              className={`overflow-hidden cursor-pointer transition-all ${selectedLocation === location.id ? 'ring-2 ring-riverguard-500' : 'hover:border-riverguard-300'}`}
              onClick={() => handleLocationClick(location.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                  {getRiskBadge(location.riskLevel)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {location.coordinates}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <Video className="h-4 w-4 mr-2 text-riverguard-600" />
                      <span>{location.cameraCount} cameras</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CloudRain className="h-4 w-4 mr-2 text-riverguard-600" />
                      <span>{location.sensorCount} sensors</span>
                    </div>
                  </div>
                  
                  {selectedLocation === location.id && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewFeeds(location.id)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View Feeds
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSetAlert(location.id)}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Set Alert
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-sm">
                      <span className="text-gray-600">Last incident: </span>
                      <span className="font-medium">{location.lastIncident}</span>
                    </div>
                    {getStatusIndicator(location.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Location Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-md relative overflow-hidden">
              <img 
                src="https://miro.medium.com/v2/resize:fit:1400/1*qYUvh-EtES8dtgKiBRiLsA.png" 
                alt="Surveillance Map" 
                className="w-full h-full object-cover opacity-70"
              />
              
              {/* Map incident markers */}
              <div className="absolute top-[30%] left-[40%]">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="h-6 w-6 bg-red-500 bg-opacity-30 rounded-full absolute -top-1.5 -left-1.5 animate-ping"></div>
              </div>
              <div className="absolute top-[25%] left-[20%]">
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="absolute top-[60%] left-[65%]">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="h-6 w-6 bg-red-500 bg-opacity-30 rounded-full absolute -top-1.5 -left-1.5 animate-ping"></div>
              </div>
              <div className="absolute top-[45%] left-[50%]">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Locations;
