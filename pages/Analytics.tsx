import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, BarChart, PieChart } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { onNewIncident, IncidentEventData } from '@/lib/events';

// Define a type for our analytics data
interface AnalyticsData {
  incidentsByMonth: {
    name: string;
    value: number;
  }[];
  incidentsByType: {
    name: string;
    value: number;
  }[];
  detectionTrends: {
    date: string;
    detections: number;
    falsepositives: number;
  }[];
  incidentsByLocation: {
    name: string;
    low: number;
    medium: number;
    high: number;
  }[];
  detectionPerformance: {
    date: string;
    accuracy: number;
    recall: number;
  }[];
}

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    incidentsByMonth: [
      { name: 'Jan', value: 12 },
      { name: 'Feb', value: 9 },
      { name: 'Mar', value: 17 },
      { name: 'Apr', value: 23 },
      { name: 'May', value: 14 },
      { name: 'Jun', value: 8 }
    ],
    incidentsByType: [
      { name: 'Dumping', value: 45 },
      { name: 'Pollution', value: 23 },
      { name: 'Vandalism', value: 12 },
      { name: 'Wildlife', value: 20 }
    ],
    detectionTrends: [
      { date: '2024-01-01', detections: 12, falsepositives: 3 },
      { date: '2024-01-02', detections: 8, falsepositives: 1 },
      { date: '2024-01-03', detections: 15, falsepositives: 4 },
      { date: '2024-01-04', detections: 10, falsepositives: 2 },
      { date: '2024-01-05', detections: 7, falsepositives: 0 },
      { date: '2024-01-06', detections: 13, falsepositives: 1 },
      { date: '2024-01-07', detections: 18, falsepositives: 3 },
      { date: '2024-01-08', detections: 14, falsepositives: 2 }
    ],
    incidentsByLocation: [
      { name: 'East River', low: 5, medium: 8, high: 4 },
      { name: 'West Bridge', low: 3, medium: 4, high: 7 },
      { name: 'Downtown', low: 7, medium: 3, high: 2 },
      { name: 'Industrial', low: 2, medium: 6, high: 9 }
    ],
    detectionPerformance: [
      { date: '2024-01-01', accuracy: 0.82, recall: 0.78 },
      { date: '2024-01-08', accuracy: 0.85, recall: 0.80 },
      { date: '2024-01-15', accuracy: 0.84, recall: 0.81 },
      { date: '2024-01-22', accuracy: 0.87, recall: 0.83 },
      { date: '2024-01-29', accuracy: 0.89, recall: 0.85 },
      { date: '2024-02-05', accuracy: 0.88, recall: 0.86 },
      { date: '2024-02-12', accuracy: 0.90, recall: 0.87 }
    ]
  });

  // Function to simulate loading analytics data based on the selected period
  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchAnalyticsData = async () => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Adjust data based on selected period 
      // (this is just a simulation - in a real app, this would come from a backend)
      let updatedData = { ...analyticsData };
      
      // Update incidents by month chart
      if (period === '7days') {
        updatedData.incidentsByMonth = [
          { name: 'Mon', value: 3 },
          { name: 'Tue', value: 5 },
          { name: 'Wed', value: 2 },
          { name: 'Thu', value: 4 },
          { name: 'Fri', value: 6 },
          { name: 'Sat', value: 3 },
          { name: 'Sun', value: 1 }
        ];
      } else if (period === '90days') {
        // For longer periods, we might add more data points
        // This is just a simulation
        const currentData = [...analyticsData.incidentsByMonth];
        updatedData.incidentsByMonth = [...currentData, 
          { name: 'Jul', value: 16 },
          { name: 'Aug', value: 19 },
          { name: 'Sep', value: 11 }
        ];
      }
      
      // Update the state with the "new" data
      setAnalyticsData(updatedData);
    };
    
    fetchAnalyticsData();
  }, [period]);

  // Function to update analytics with new incident data from local uploads
  const updateAnalyticsWithNewIncident = (incident: IncidentEventData) => {
    setAnalyticsData(prev => {
      // Deep copy of current data
      const updatedData = JSON.parse(JSON.stringify(prev));
      
      // Update the incidents by type chart
      const typeIndex = updatedData.incidentsByType.findIndex(
        (item: {name: string}) => item.name.toLowerCase() === incident.type.toLowerCase()
      );
      
      if (typeIndex !== -1) {
        updatedData.incidentsByType[typeIndex].value += 1;
      } else {
        // If it's a new type, we'd add it, but we'll keep it simple for this demo
        updatedData.incidentsByType[3].value += 1; // Add to "Other"
      }
      
      // Update the current month in the monthly chart
      const currentMonth = new Date().toLocaleString('default', { month: 'short' });
      const monthIndex = updatedData.incidentsByMonth.findIndex(
        (item: {name: string}) => item.name === currentMonth
      );
      
      if (monthIndex !== -1) {
        updatedData.incidentsByMonth[monthIndex].value += 1;
      }
      
      // Update detection trends - add a detection for today
      const today = new Date().toISOString().split('T')[0];
      const trendIndex = updatedData.detectionTrends.findIndex(
        (item: {date: string}) => item.date === today
      );
      
      if (trendIndex !== -1) {
        updatedData.detectionTrends[trendIndex].detections += 1;
      } else {
        // Add a new entry for today
        updatedData.detectionTrends.push({
          date: today,
          detections: 1,
          falsepositives: 0
        });
      }
      
      // Update location data based on incident location
      // This would be more sophisticated in a real app
      // For now, let's just increment a random location's count
      const locationKeys = ['East River', 'West Bridge', 'Downtown', 'Industrial'];
      const randomLocation = locationKeys[Math.floor(Math.random() * locationKeys.length)];
      const locationIndex = updatedData.incidentsByLocation.findIndex(
        (item: {name: string}) => item.name === randomLocation
      );
      
      if (locationIndex !== -1) {
        // Determine which severity to increment based on the incident's severity
        if (incident.severity === 'critical') {
          updatedData.incidentsByLocation[locationIndex].high += 1;
        } else if (incident.severity === 'warning') {
          updatedData.incidentsByLocation[locationIndex].medium += 1;
        } else {
          updatedData.incidentsByLocation[locationIndex].low += 1;
        }
      }
      
      return updatedData;
    });
  };

  // Listen for new incidents using the event system
  useEffect(() => {
    const unsubscribe = onNewIncident(updateAnalyticsWithNewIncident);
    
    // Clean up
    return unsubscribe;
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-riverguard-900 mb-1">Analytics</h1>
            <p className="text-gray-500">Insights and trends from monitoring data</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="detection">Detection</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Monthly Incident Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={analyticsData.incidentsByMonth}
                    index="name"
                    categories={['value']}
                    colors={['#8B5CF6']}
                    yAxisWidth={30}
                    className="h-64"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Incident Types Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    data={analyticsData.incidentsByType}
                    index="name"
                    valueFormatter={(number) => `${number}%`}
                    category="value"
                    colors={['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9']}
                    className="h-64"
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Detection Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={analyticsData.detectionTrends}
                  index="date"
                  categories={['detections', 'falsepositives']}
                  colors={['#8B5CF6', '#F97316']}
                  valueFormatter={(number) => `${number}`}
                  className="h-72"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="incidents" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-6">Incident severity by location</p>
                <BarChart
                  data={analyticsData.incidentsByLocation}
                  index="name"
                  categories={['low', 'medium', 'high']}
                  colors={['#22C55E', '#F97316', '#EF4444']}
                  stack
                  className="h-96"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detection" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-6">Detection performance metrics</p>
                <AreaChart
                  data={analyticsData.detectionPerformance}
                  index="date"
                  categories={['accuracy', 'recall']}
                  colors={['#8B5CF6', '#0EA5E9']}
                  valueFormatter={(number) => `${(number * 100).toFixed(0)}%`}
                  className="h-96"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-6">Report data will appear here.</p>
                <div className="h-96 flex items-center justify-center border rounded-lg">
                  <p className="text-gray-400">Reports module coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Analytics;
