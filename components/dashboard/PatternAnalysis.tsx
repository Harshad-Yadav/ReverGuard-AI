import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, TrendingDown, FileText, Clock, MapPin } from 'lucide-react';

// Mock data for the charts
const weeklyIncidentData = [
  { day: 'Mon', incidents: 4, threats: 2 },
  { day: 'Tue', incidents: 6, threats: 3 },
  { day: 'Wed', incidents: 5, threats: 2 },
  { day: 'Thu', incidents: 8, threats: 5 },
  { day: 'Fri', incidents: 9, threats: 4 },
  { day: 'Sat', incidents: 11, threats: 7 },
  { day: 'Sun', incidents: 7, threats: 3 }
];

const timeOfDayData = [
  { time: '00:00', count: 2 },
  { time: '03:00', count: 1 },
  { time: '06:00', count: 3 },
  { time: '09:00', count: 5 },
  { time: '12:00', count: 6 },
  { time: '15:00', count: 8 },
  { time: '18:00', count: 10 },
  { time: '21:00', count: 7 }
];

const locationData = [
  { location: 'Yamuna River', incidents: 28, threats: 15 },
  { location: 'Hooghly River', incidents: 22, threats: 12 },
  { location: 'Marine Drive', incidents: 18, threats: 9 },
  { location: 'Howrah Bridge', incidents: 25, threats: 14 },
  { location: 'Ganga Ghats', incidents: 15, threats: 7 }
];

const hotspotData = [
  { x: 10, y: 20, value: 15, label: 'Hotspot 1' },
  { x: 35, y: 45, value: 28, label: 'Hotspot 2' },
  { x: 65, y: 15, value: 12, label: 'Hotspot 3' },
  { x: 80, y: 60, value: 22, label: 'Hotspot 4' },
  { x: 25, y: 75, value: 9, label: 'Hotspot 5' }
];

const PatternAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const totalIncidents = weeklyIncidentData.reduce((sum, day) => sum + day.incidents, 0);
  const totalThreats = weeklyIncidentData.reduce((sum, day) => sum + day.threats, 0);
  const percentageThreats = Math.round((totalThreats / totalIncidents) * 100);
  
  // Calculate trend (mock data for demonstration)
  const trend = 12; // percentage increase
  const isTrendUp = trend > 0;

  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          AI Pattern Analysis
        </CardTitle>
        <CardDescription>
          Incident patterns and predictive analysis for Indian rivers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="trends">Incident Trends</TabsTrigger>
            <TabsTrigger value="hotspots">Hotspot Map</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100 flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Total Incidents</span>
                <span className="text-2xl font-bold">{totalIncidents}</span>
                <div className="flex items-center mt-1 text-xs">
                  {isTrendUp ? (
                    <>
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">{trend}% increase</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500">{Math.abs(trend)}% decrease</span>
                    </>
                  )}
                  <span className="text-gray-500 ml-1">vs. last period</span>
                </div>
              </div>
              
              <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100 flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Confirmed Threats</span>
                <span className="text-2xl font-bold">{totalThreats}</span>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{percentageThreats}% of total incidents</span>
                </div>
              </div>
              
              <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100 flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Top Location</span>
                <span className="text-xl font-bold">Yamuna River</span>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>28 incidents detected</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-md border space-y-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Weekly Incident Distribution</h4>
                <div className="flex space-x-2 text-xs">
                  <button 
                    className={`px-2 py-1 rounded ${selectedPeriod === 'week' ? 'bg-riverguard-100' : 'bg-gray-100'}`}
                    onClick={() => setSelectedPeriod('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${selectedPeriod === 'month' ? 'bg-riverguard-100' : 'bg-gray-100'}`}
                    onClick={() => setSelectedPeriod('month')}
                  >
                    Month
                  </button>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyIncidentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="incidents" 
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="#8884d8"
                      name="All Incidents" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="threats" 
                      stackId="2" 
                      stroke="#ff7300" 
                      fill="#ff7300"
                      name="Confirmed Threats" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md border">
                <h4 className="font-medium mb-2 text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Time of Day Analysis
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeOfDayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" name="Incidents" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Peak activity detected between 15:00-21:00
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-md border">
                <h4 className="font-medium mb-2 text-sm flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location Distribution
                </h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="location" tick={{fontSize: 10}} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="incidents" name="All Incidents" fill="#8884d8" />
                      <Bar dataKey="threats" name="Threats" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hotspots">
            <div className="bg-white p-3 rounded-md border">
              <h4 className="font-medium mb-3">Dumping Hotspot Map</h4>
              <div className="relative h-80 bg-riverguard-50 border border-riverguard-100 rounded overflow-hidden">
                {/* Simplified map visualization */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: 'url(/img3.jpeg)' }}
                >
                </div>
                
                {/* Hotspot markers */}
                {hotspotData.map((spot, index) => (
                  <div
                    key={index}
                    className="absolute rounded-full bg-red-500 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold"
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      width: `${Math.max(20, spot.value)}px`,
                      height: `${Math.max(20, spot.value)}px`,
                      opacity: 0.8
                    }}
                    title={`${spot.label}: ${spot.value} incidents`}
                  >
                    {spot.value}
                  </div>
                ))}
                
                {/* Legend */}
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow text-xs">
                  <div className="font-medium mb-1">Incident Density</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                    <span>High (15+)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500 opacity-80"></div>
                    <span>Medium (5-15)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                    <span>Low (1-5)</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <p className="font-medium">AI Recommendation</p>
                <p className="text-xs text-gray-600 mt-1">
                  Based on historical data, we recommend deploying additional cameras at Hotspot 2 (Yamuna River, Delhi) 
                  and Hotspot 4 (Howrah Bridge, Kolkata) to improve surveillance coverage in high-risk areas.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="predictions">
            <div className="space-y-4">
              <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100">
                <h4 className="font-medium mb-2">Predictive Incident Analysis</h4>
                <p className="text-sm text-gray-600">
                  Our ML algorithm predicts the following high-risk periods for illegal dumping activities:
                </p>
                
                <div className="mt-3 space-y-2">
                  <div className="bg-white p-2 rounded border border-riverguard-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Festival Evenings</div>
                        <div className="text-xs text-gray-500">18:00 - 22:00, During festivals</div>
                      </div>
                    </div>
                    <div className="bg-red-100 text-red-800 text-xs py-1 px-2 rounded">
                      High Risk
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded border border-riverguard-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Early Morning</div>
                        <div className="text-xs text-gray-500">04:00 - 07:00, All Days</div>
                      </div>
                    </div>
                    <div className="bg-orange-100 text-orange-800 text-xs py-1 px-2 rounded">
                      Medium Risk
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded border border-riverguard-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Business Hours</div>
                        <div className="text-xs text-gray-500">09:00 - 17:00, Mon-Fri</div>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded">
                      Low Risk
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-md border space-y-2">
                <h4 className="font-medium">Recommended Actions</h4>
                
                <div className="space-y-3 mt-2">
                  <div className="flex items-start space-x-2">
                    <div className="bg-riverguard-100 p-1 rounded">
                      <TrendingUp className="h-4 w-4 text-riverguard-800" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Increase Surveillance</p>
                      <p className="text-xs text-gray-600">
                        Focus resources during high-risk periods (18:00-22:00 on festival days)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-riverguard-100 p-1 rounded">
                      <MapPin className="h-4 w-4 text-riverguard-800" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Deploy Mobile Cameras</p>
                      <p className="text-xs text-gray-600">
                        Add temporary cameras at Yamuna River (Delhi) and Howrah Bridge (Kolkata) locations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-riverguard-100 p-1 rounded">
                      <Bell className="h-4 w-4 text-riverguard-800" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Notify CPCB & NGT</p>
                      <p className="text-xs text-gray-600">
                        Configure real-time alerts to Central Pollution Control Board and National Green Tribunal
                      </p>
                    </div>
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

export default PatternAnalysis;

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
