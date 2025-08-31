
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrashIcon, AlertTriangleIcon, InfoIcon, ClockIcon, MapPinIcon } from 'lucide-react';

// Mock incidents data
const mockIncidents = [
  {
    id: 'inc-001',
    time: '2025-04-05T10:23:00',
    location: 'Yamuna River, Delhi',
    type: 'Dumping',
    confidence: 'High',
    severity: 'high',
    description: 'Individual detected disposing waste into river',
  },
  {
    id: 'inc-002',
    time: '2025-04-05T08:15:00',
    location: 'Hooghly River, Kolkata',
    type: 'Suspicious Activity',
    confidence: 'Medium',
    severity: 'medium',
    description: 'Vehicle stopped near riverbank for extended period',
  },
  {
    id: 'inc-003',
    time: '2025-04-04T18:40:00',
    location: 'Marine Drive, Mumbai',
    type: 'Floating Debris',
    confidence: 'High',
    severity: 'low',
    description: 'Large debris cluster detected moving downstream',
  },
  {
    id: 'inc-004',
    time: '2025-04-04T14:10:00',
    location: 'Howrah Bridge, Kolkata',
    type: 'Dumping',
    confidence: 'High',
    severity: 'high',
    description: 'Multiple objects thrown from bridge into water',
  },
];

const RecentIncidents: React.FC = () => {
  // Helper function to format date
  const formatIncidentTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Helper function for severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-orange-500">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-slate-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Helper function for icon based on incident type
  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'Dumping':
        return <TrashIcon className="h-5 w-5 text-red-500" />;
      case 'Suspicious Activity':
        return <AlertTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[340px] pr-4">
          <div className="space-y-4">
            {mockIncidents.map((incident) => (
              <div
                key={incident.id}
                className="p-3 rounded-lg bg-white shadow border border-riverguard-100 hover:border-riverguard-300 transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-riverguard-50 rounded-md">
                    {getIncidentIcon(incident.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{incident.type}</h4>
                      {getSeverityBadge(incident.severity)}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{incident.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {formatIncidentTime(incident.time)}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        {incident.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentIncidents;
