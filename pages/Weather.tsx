
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudRain, Droplets, Thermometer, Wind, CloudSun, CloudLightning, CloudSnow, Sunrise, Sunset } from 'lucide-react';
import { AreaChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Weather: React.FC = () => {
  const weatherForecast = [
    { 
      day: 'Today',
      date: 'Apr 5',
      condition: 'Partly Cloudy',
      icon: CloudSun,
      tempHigh: 38,
      tempLow: 24,
      precipitation: 10,
      humidity: 65,
      windSpeed: 8
    },
    { 
      day: 'Tomorrow',
      date: 'Apr 6',
      condition: 'Rain',
      icon: CloudRain,
      tempHigh: 36,
      tempLow: 23,
      precipitation: 80,
      humidity: 85,
      windSpeed: 12
    },
    { 
      day: 'Monday',
      date: 'Apr 7',
      condition: 'Thunderstorms',
      icon: CloudLightning,
      tempHigh: 35,
      tempLow: 24,
      precipitation: 90,
      humidity: 90,
      windSpeed: 15
    },
    { 
      day: 'Tuesday',
      date: 'Apr 8',
      condition: 'Partly Cloudy',
      icon: CloudSun,
      tempHigh: 37,
      tempLow: 25,
      precipitation: 20,
      humidity: 70,
      windSpeed: 7
    },
    { 
      day: 'Wednesday',
      date: 'Apr 9',
      condition: 'Light Rain',
      icon: CloudRain,
      tempHigh: 34,
      tempLow: 23,
      precipitation: 40,
      humidity: 75,
      windSpeed: 9
    }
  ];

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-riverguard-900 mb-1">Weather Monitoring</h1>
          <p className="text-gray-500">Local weather conditions and forecasts for Indian rivers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Current Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <CloudSun className="h-16 w-16 text-riverguard-600 mr-4" />
                  <div>
                    <div className="text-4xl font-semibold">38°C</div>
                    <div className="text-gray-500">Delhi, Partly Cloudy</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Feels like 41°C</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Wind 8 km/h</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Humidity 65%</span>
                  </div>
                  <div className="flex items-center">
                    <CloudRain className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Precipitation 10%</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center">
                  <Sunrise className="h-4 w-4 mr-1" />
                  <span>5:45 AM</span>
                </div>
                <div className="h-1 w-full max-w-[200px] bg-gradient-to-r from-yellow-300 to-orange-400 rounded mx-4"></div>
                <div className="flex items-center">
                  <Sunset className="h-4 w-4 mr-1" />
                  <span>6:38 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">River Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Water Level</span>
                  <span className="font-medium">3.2 m</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">Flow Rate</span>
                  <span className="font-medium">1,250 cumecs</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600">Water Temp</span>
                  <span className="font-medium">28°C</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="text-gray-600">Last Updated</span>
                  <span>Today 10:30 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weatherForecast.map((day, index) => {
                const Icon = day.icon;
                return (
                  <div key={index} className="flex flex-col items-center p-4 border rounded-lg">
                    <div className="font-medium">{day.day}</div>
                    <div className="text-sm text-gray-500">{day.date}</div>
                    <Icon className="h-10 w-10 my-2 text-riverguard-600" />
                    <div className="text-sm">{day.condition}</div>
                    <div className="flex justify-between w-full mt-2">
                      <span className="font-medium">{day.tempHigh}°</span>
                      <span className="text-gray-500">{day.tempLow}°</span>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <CloudRain className="h-3 w-3 mr-1" />
                      <span>{day.precipitation}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="precipitation">
          <TabsList>
            <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="wind">Wind</TabsTrigger>
          </TabsList>
          <TabsContent value="precipitation">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Precipitation Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={[
                    { hour: '12 AM', rainfall: 0 },
                    { hour: '2 AM', rainfall: 0 },
                    { hour: '4 AM', rainfall: 0 },
                    { hour: '6 AM', rainfall: 0.1 },
                    { hour: '8 AM', rainfall: 0.2 },
                    { hour: '10 AM', rainfall: 0.4 },
                    { hour: '12 PM', rainfall: 0.6 },
                    { hour: '2 PM', rainfall: 0.3 },
                    { hour: '4 PM', rainfall: 0.2 },
                    { hour: '6 PM', rainfall: 0.1 },
                    { hour: '8 PM', rainfall: 0 },
                    { hour: '10 PM', rainfall: 0 }
                  ]}
                  index="hour"
                  categories={['rainfall']}
                  colors={['#0EA5E9']}
                  valueFormatter={(value) => `${value} in`}
                  className="h-64"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="temperature">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Temperature Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={[
                    { hour: '12 AM', temp: 60 },
                    { hour: '2 AM', temp: 58 },
                    { hour: '4 AM', temp: 56 },
                    { hour: '6 AM', temp: 55 },
                    { hour: '8 AM', temp: 58 },
                    { hour: '10 AM', temp: 63 },
                    { hour: '12 PM', temp: 68 },
                    { hour: '2 PM', temp: 72 },
                    { hour: '4 PM', temp: 70 },
                    { hour: '6 PM', temp: 68 },
                    { hour: '8 PM', temp: 65 },
                    { hour: '10 PM', temp: 62 }
                  ]}
                  index="hour"
                  categories={['temp']}
                  colors={['#F97316']}
                  valueFormatter={(value) => `${value}°F`}
                  className="h-64"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="wind">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Wind Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={[
                    { hour: '12 AM', wind: 5 },
                    { hour: '2 AM', wind: 6 },
                    { hour: '4 AM', wind: 7 },
                    { hour: '6 AM', wind: 8 },
                    { hour: '8 AM', wind: 9 },
                    { hour: '10 AM', wind: 10 },
                    { hour: '12 PM', wind: 12 },
                    { hour: '2 PM', wind: 14 },
                    { hour: '4 PM', wind: 12 },
                    { hour: '6 PM', wind: 10 },
                    { hour: '8 PM', wind: 8 },
                    { hour: '10 PM', wind: 7 }
                  ]}
                  index="hour"
                  categories={['wind']}
                  colors={['#8B5CF6']}
                  valueFormatter={(value) => `${value} mph`}
                  className="h-64"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Weather;
