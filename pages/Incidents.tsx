import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Clock, MapPin, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { onNewIncident, IncidentEventData } from '@/lib/events';

// Define incident type
interface Incident {
  id: number | string;
  title: string;
  location: string;
  timestamp: string;
  date: string;
  status: string;
  description: string;
  image: string;
}

const Incidents: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      title: 'Illegal Waste Dumping',
      location: 'Yamuna River, Delhi',
      timestamp: 'Today, 10:23 AM',
      date: 'Apr 5, 2025',
      status: 'critical',
      description: 'Vehicle detected dumping industrial waste into river',
      image: '/img1.jpeg'
    },
    {
      id: 2,
      title: 'Suspicious Activity',
      location: 'Howrah Bridge, Kolkata',
      timestamp: 'Yesterday, 8:45 PM',
      date: 'Apr 4, 2025',
      status: 'warning',
      description: 'Unknown individuals spotted near restricted area',
      image: '/img2.jpg'
    },
    {
      id: 3,
      title: 'Water Pollution Detected',
      location: 'Ganga River, Varanasi',
      timestamp: 'Apr 3, 2025, 3:12 PM',
      date: 'Apr 3, 2025',
      status: 'resolved',
      description: 'Unusual water discoloration detected, authorities notified',
      image: '/img3.jpeg'
    },
    {
      id: 4,
      title: 'Wildlife Disturbance',
      location: 'Marine Drive, Mumbai',
      timestamp: 'Apr 2, 2025, 5:30 PM',
      date: 'Apr 2, 2025',
      status: 'resolved',
      description: 'Group causing disturbance to protected bird nesting area',
      image: '/img4.jpeg'
    }
  ]);
  const [incidentStats, setIncidentStats] = useState({
    critical: 1,
    warning: 1,
    resolved: 2,
    total: 4,
    byType: {
      dumping: 1,
      pollution: 1,
      vandalism: 0,
      wildlife: 1,
      other: 1
    }
  });

  // Function to update statistics after new incident
  const updateStats = (incidentType: string, incidentStatus: string) => {
    setIncidentStats(prev => {
      const newStats = { ...prev };
      
      // Update counts by status
      if (incidentStatus === 'critical' || incidentStatus === 'warning' || incidentStatus === 'resolved') {
        newStats[incidentStatus]++;
      }
      
      // Update total count
      newStats.total++;
      
      // Update count by type
      const typeKey = incidentType as keyof typeof newStats.byType;
      if (newStats.byType[typeKey] !== undefined) {
        newStats.byType[typeKey]++;
      } else {
        newStats.byType.other++;
      }
      
      return newStats;
    });
  };

  // Listen for new incidents using our event system
  useEffect(() => {
    const unsubscribe = onNewIncident((incident) => {
      // Format the incident data to match our incidents array format
      const formattedIncident: Incident = {
        id: incident.id,
        title: incident.title,
        location: incident.location,
        timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: incident.severity,
        description: incident.title, // In a real app would use a proper description field
        image: incident.imageUrl
      };
      
      // Add to the beginning of incidents array
      setIncidents(prev => [formattedIncident, ...prev]);
      
      // Update statistics
      updateStats(incident.type, incident.severity);
    });
    
    return unsubscribe;
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500 text-white">Warning</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-riverguard-900 mb-1">Incidents</h1>
          <p className="text-gray-500">Detected environmental incidents and alerts</p>
        </div>
        
        {/* Incident Statistics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Incidents</p>
                  <p className="text-2xl font-bold">{incidentStats.total}</p>
                </div>
                <div className="w-12 h-12 bg-riverguard-100 rounded-full flex items-center justify-center">
                  <Bell className="h-6 w-6 text-riverguard-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Critical</p>
                  <p className="text-2xl font-bold">{incidentStats.critical}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Badge variant="destructive" className="h-6 px-2 py-0 flex items-center">Critical</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Warning</p>
                  <p className="text-2xl font-bold">{incidentStats.warning}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Badge className="bg-yellow-500 text-white h-6 px-2 py-0 flex items-center">Warning</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Resolved</p>
                  <p className="text-2xl font-bold">{incidentStats.resolved}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 h-6 px-2 py-0 flex items-center">
                    Resolved
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Incidents</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="warning">Warning</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6 space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 w-full">
                    <div className="aspect-video md:h-full">
                      <img 
                        src={incident.image} 
                        alt={incident.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{incident.title}</h3>
                        <div className="flex items-center text-gray-500 mt-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {incident.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(incident.status)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{incident.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {incident.date}
                        <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
                        {incident.timestamp.split(',')[1]}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="critical" className="mt-6 space-y-4">
            {incidents.filter(incident => incident.status === 'critical').map((incident) => (
              <Card key={incident.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 w-full">
                    <div className="aspect-video md:h-full">
                      <img 
                        src={incident.image} 
                        alt={incident.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{incident.title}</h3>
                        <div className="flex items-center text-gray-500 mt-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {incident.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(incident.status)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{incident.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {incident.date}
                        <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
                        {incident.timestamp.split(',')[1]}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="warning" className="mt-6 space-y-4">
            {incidents.filter(incident => incident.status === 'warning').map((incident) => (
              <Card key={incident.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 w-full">
                    <div className="aspect-video md:h-full">
                      <img 
                        src={incident.image} 
                        alt={incident.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{incident.title}</h3>
                        <div className="flex items-center text-gray-500 mt-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {incident.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(incident.status)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{incident.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {incident.date}
                        <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
                        {incident.timestamp.split(',')[1]}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="resolved" className="mt-6 space-y-4">
            {incidents.filter(incident => incident.status === 'resolved').map((incident) => (
              <Card key={incident.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 w-full">
                    <div className="aspect-video md:h-full">
                      <img 
                        src={incident.image} 
                        alt={incident.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{incident.title}</h3>
                        <div className="flex items-center text-gray-500 mt-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {incident.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(incident.status)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{incident.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {incident.date}
                        <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
                        {incident.timestamp.split(',')[1]}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Incidents;
