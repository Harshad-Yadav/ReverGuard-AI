
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';

const StatsOverview: React.FC = () => {
  const [stats, setStats] = useState({
    activeLocations: 5,
    incidentsResolved: 42,
    pendingIncidents: 7,
    avgResponseTime: 14, // in minutes
  });
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update values to simulate real-time changes
      setStats(prevStats => ({
        ...prevStats,
        pendingIncidents: Math.max(0, prevStats.pendingIncidents + (Math.random() > 0.7 ? 1 : 0)),
        incidentsResolved: prevStats.incidentsResolved + (Math.random() > 0.8 ? 1 : 0),
        avgResponseTime: Math.max(5, Math.min(30, prevStats.avgResponseTime + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      title: 'Active Monitoring',
      value: `${stats.activeLocations} Locations`,
      icon: <Eye className="h-5 w-5" />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Incidents Resolved',
      value: stats.incidentsResolved.toString(),
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Pending Incidents',
      value: stats.pendingIncidents.toString(),
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Avg. Response',
      value: `${stats.avgResponseTime} min`,
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statItems.map((stat, index) => (
        <Card key={index} className="border-2 border-riverguard-200/50 transition-all hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
