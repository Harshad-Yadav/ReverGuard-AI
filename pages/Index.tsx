import React from 'react';
import AppLayout from '@/components/AppLayout';
import LiveFeed from '@/components/dashboard/LiveFeed';
import WebcamFeed from '@/components/dashboard/WebcamFeed';
import RecentIncidents from '@/components/dashboard/RecentIncidents';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ActivityChart from '@/components/dashboard/ActivityChart';
import DetectionMetrics from '@/components/dashboard/DetectionMetrics';
import PatternAnalysis from '@/components/dashboard/PatternAnalysis';
import NotificationSystem from '@/components/dashboard/NotificationSystem';
import IoTIntegration from '@/components/dashboard/IoTIntegration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-riverguard-900 mb-1">RiverGuard Dashboard</h1>
          <p className="text-gray-500">Smart surveillance system for river monitoring and pollution prevention</p>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WebcamFeed />
          <LiveFeed />
        </div>

        <Card className="border-2 border-riverguard-200/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-riverguard-600" />
              Surveillance Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-gray-100 rounded-md relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/img2.jpg" 
                  alt="River Surveillance Map" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-gray-800 font-semibold bg-white/80 px-4 py-2 rounded">
                    Interactive map integration in progress
                  </p>
                </div>
              </div>
              {/* Map incident markers */}
              <div className="absolute top-[30%] left-[40%] animate-pulse">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="h-6 w-6 bg-red-500 bg-opacity-20 rounded-full absolute -top-1.5 -left-1.5 animate-ping"></div>
              </div>
              <div className="absolute top-[60%] left-[65%] animate-pulse">
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-6 w-6 bg-yellow-500 bg-opacity-20 rounded-full absolute -top-1.5 -left-1.5 animate-ping"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentIncidents />
          <PatternAnalysis />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart />
          <DetectionMetrics />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <NotificationSystem />
          <IoTIntegration />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
