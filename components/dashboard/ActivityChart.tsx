
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for chart
const weeklyData = [
  { name: 'Mon', incidents: 4, alerts: 7 },
  { name: 'Tue', incidents: 2, alerts: 5 },
  { name: 'Wed', incidents: 5, alerts: 8 },
  { name: 'Thu', incidents: 3, alerts: 6 },
  { name: 'Fri', incidents: 6, alerts: 9 },
  { name: 'Sat', incidents: 8, alerts: 12 },
  { name: 'Sun', incidents: 4, alerts: 7 },
];

const monthlyData = [
  { name: 'Week 1', incidents: 24, alerts: 42 },
  { name: 'Week 2', incidents: 18, alerts: 35 },
  { name: 'Week 3', incidents: 29, alerts: 48 },
  { name: 'Week 4', incidents: 22, alerts: 37 },
];

const ActivityChart: React.FC = () => {
  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #eee'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="incidents" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorIncidents)" />
                <Area type="monotone" dataKey="alerts" stroke="#f97316" fillOpacity={1} fill="url(#colorAlerts)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncidentsMonthly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAlertsMonthly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #eee'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="incidents" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorIncidentsMonthly)" />
                <Area type="monotone" dataKey="alerts" stroke="#f97316" fillOpacity={1} fill="url(#colorAlertsMonthly)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
