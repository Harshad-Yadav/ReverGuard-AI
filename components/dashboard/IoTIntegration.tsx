import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Wifi, WifiOff, CloudUpload, CloudDownload, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// Mock IoT sensor data
const sensors = [
  { id: 'ws-001', name: 'Water Quality Sensor 1', type: 'water', status: 'online', battery: 82, location: 'North River Bank', lastReading: '12 mins ago' },
  { id: 'ws-002', name: 'Water Quality Sensor 2', type: 'water', status: 'online', battery: 67, location: 'South Crossing', lastReading: '5 mins ago' },
  { id: 'ms-001', name: 'Motion Sensor 1', type: 'motion', status: 'offline', battery: 15, location: 'East Waterfront', lastReading: '3 hours ago' },
  { id: 'ds-001', name: 'Drone Station 1', type: 'drone', status: 'online', battery: 91, location: 'Central Monitoring', lastReading: '1 min ago' },
  { id: 'cs-001', name: 'Camera Sensor 1', type: 'camera', status: 'online', battery: 78, location: 'West Bridge', lastReading: '8 mins ago' },
];

// Mock water quality data
const waterQualityData = [
  { parameter: 'pH Level', value: 7.2, unit: 'pH', status: 'normal' },
  { parameter: 'Dissolved Oxygen', value: 8.5, unit: 'mg/L', status: 'normal' },
  { parameter: 'Turbidity', value: 12.8, unit: 'NTU', status: 'warning' },
  { parameter: 'Temperature', value: 22.4, unit: '°C', status: 'normal' },
  { parameter: 'Conductivity', value: 450, unit: 'µS/cm', status: 'normal' },
];

const IoTIntegration: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [autoPatrol, setAutoPatrol] = useState(true);
  const [patrolFrequency, setPatrolFrequency] = useState(60);
  const [droneStatus, setDroneStatus] = useState('docked'); // docked, patrolling, returning

  const handleSensorSelect = (sensorId: string) => {
    setSelectedSensor(sensorId);
    toast.info(`Connected to ${sensors.find(s => s.id === sensorId)?.name}`);
  };

  const handleDroneAction = (action: string) => {
    if (action === 'launch') {
      setDroneStatus('patrolling');
      toast.info('Drone launched for patrol mission');
      
      // Simulate drone returning after 5 seconds
      setTimeout(() => {
        setDroneStatus('returning');
        toast.info('Drone completing patrol, returning to base');
        
        // Simulate drone docking after 3 more seconds
        setTimeout(() => {
          setDroneStatus('docked');
          toast.success('Drone returned and docked successfully');
        }, 3000);
      }, 5000);
    }
  };

  const getSensorStatusColor = (status: string) => {
    return status === 'online' ? 'text-green-500' : 'text-red-500';
  };
  
  const getSensorBatteryColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getParameterStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Wifi className="h-5 w-5 mr-2" />
          IoT Sensor Network
        </CardTitle>
        <CardDescription>
          Monitoring and control of connected IoT devices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="dashboard">Sensor Network</TabsTrigger>
            <TabsTrigger value="drones">Drone Control</TabsTrigger>
            <TabsTrigger value="water">Water Quality</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Connected Sensors</h4>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  4/5 Online
                </Badge>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {sensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    className={`p-2 rounded border ${
                      selectedSensor === sensor.id 
                        ? 'bg-riverguard-100 border-riverguard-300' 
                        : 'bg-white border-gray-200'
                    } flex items-center justify-between cursor-pointer hover:bg-riverguard-50`}
                    onClick={() => handleSensorSelect(sensor.id)}
                  >
                    <div className="flex items-center">
                      {sensor.status === 'online' ? (
                        <Wifi className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <div>
                        <div className="text-sm font-medium">{sensor.name}</div>
                        <div className="text-xs text-gray-500">{sensor.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-xs flex flex-col items-end">
                        <span className={getSensorStatusColor(sensor.status)}>
                          {sensor.status}
                        </span>
                        <span className="text-gray-500">{sensor.lastReading}</span>
                      </div>
                      <div className="w-8 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getSensorBatteryColor(sensor.battery)} h-2 rounded-full`}
                          style={{ width: `${sensor.battery}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedSensor && (
              <div className="bg-white p-3 rounded-md border">
                <h4 className="font-medium mb-3">Sensor Details</h4>
                
                {/* Display selected sensor's details */}
                {(() => {
                  const sensor = sensors.find(s => s.id === selectedSensor);
                  if (!sensor) return null;
                  
                  return (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Sensor ID</div>
                          <div>{sensor.id}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Type</div>
                          <div className="capitalize">{sensor.type} Sensor</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Location</div>
                          <div>{sensor.location}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Battery</div>
                          <div>{sensor.battery}%</div>
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => toast.info('Sensor data refreshed')}
                        >
                          <CloudDownload className="h-3 w-3 mr-1" />
                          Refresh Data
                        </Button>
                        
                        <Button 
                          size="sm"
                          className="text-xs"
                          onClick={() => toast.success('Configuration updated')}
                        >
                          <CloudUpload className="h-3 w-3 mr-1" />
                          Update Config
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="drones">
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-md border">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Drone Station Status</h4>
                  <Badge variant={droneStatus === 'docked' ? 'outline' : 'default'} className={
                    droneStatus === 'docked' ? 'bg-green-100 text-green-800' : 
                    droneStatus === 'patrolling' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {droneStatus === 'docked' ? 'Ready for Deployment' : 
                     droneStatus === 'patrolling' ? 'On Patrol Mission' : 
                     'Returning to Base'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="aspect-square bg-riverguard-50 rounded-md border border-riverguard-100 flex items-center justify-center">
                    {/* Drone image placeholder */}
                    <div className="text-center">
                      <div className="text-3xl mb-2">🛸</div>
                      <div className="text-sm font-medium">River Patrol Drone</div>
                      <div className="text-xs text-gray-500">Model RG-540 QuadCopter</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Battery Level</Label>
                      <div className="flex items-center mt-1">
                        <Progress value={91} className="flex-1 h-2" />
                        <span className="ml-2 text-xs">91%</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Signal Strength</Label>
                      <div className="flex items-center mt-1">
                        <Progress value={85} className="flex-1 h-2" />
                        <span className="ml-2 text-xs">85%</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Storage Capacity</Label>
                      <div className="flex items-center mt-1">
                        <Progress value={32} className="flex-1 h-2" />
                        <span className="ml-2 text-xs">32%</span>
                      </div>
                    </div>
                    
                    <div className="pt-1">
                      <Label className="text-xs">Status</Label>
                      <div className="text-sm mt-1 font-medium">
                        {droneStatus === 'docked' ? 'Docked & Charging' : 
                         droneStatus === 'patrolling' ? 'Active Patrol Mission' : 
                         'Returning to Base Station'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-patrol">Automatic Patrol</Label>
                    <Switch 
                      id="auto-patrol" 
                      checked={autoPatrol}
                      onCheckedChange={setAutoPatrol}
                    />
                  </div>
                  
                  {autoPatrol && (
                    <div className="pl-5 space-y-2">
                      <Label htmlFor="patrol-frequency" className="text-xs">Patrol Frequency (minutes)</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="patrol-frequency"
                          type="number"
                          min="10"
                          max="240"
                          value={patrolFrequency}
                          onChange={(e) => setPatrolFrequency(Number(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-xs text-gray-500">minutes</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Next patrol in 47 minutes
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 flex gap-3">
                  <Button 
                    className="flex-1"
                    disabled={droneStatus !== 'docked'}
                    onClick={() => handleDroneAction('launch')}
                  >
                    Launch Drone
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex-1"
                    disabled={droneStatus === 'docked'}
                    onClick={() => toast.info('Emergency recall signal sent')}
                  >
                    Recall Drone
                  </Button>
                </div>
              </div>
              
              <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100">
                <h4 className="font-medium mb-2">Patrol Route Configuration</h4>
                
                <div className="relative h-48 bg-white border rounded overflow-hidden">
                  {/* Simple map placeholder */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url(/img2.jpg)' }}
                  >
                  </div>
                  
                  {/* Path indicators */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="stroke-riverguard-600">
                      <path 
                        d="M10,50 C20,20 40,30 50,50 C60,70 80,80 90,50" 
                        fill="none" 
                        strokeWidth="2" 
                        strokeDasharray="5,5"
                      />
                      <circle cx="10" cy="50" r="3" fill="#10B981" />
                      <circle cx="50" cy="50" r="3" fill="#3B82F6" />
                      <circle cx="90" cy="50" r="3" fill="#EF4444" />
                    </svg>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-white p-1 rounded shadow text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Start</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Checkpoint</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span>End</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit Route
                  </Button>
                  <Button size="sm" className="text-xs">
                    Save Configuration
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="water">
            <div className="space-y-4">
              <div className="bg-riverguard-50 p-3 rounded-md border border-riverguard-100">
                <h4 className="font-medium mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1.5" />
                  Water Quality Parameters
                </h4>
                
                <div className="space-y-2">
                  {waterQualityData.map((param, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-white p-2 rounded border"
                    >
                      <div>
                        <div className="text-sm font-medium">{param.parameter}</div>
                        <div className="text-xs text-gray-500">Last updated 12 mins ago</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-3">
                          <div className="text-sm font-medium">{param.value} {param.unit}</div>
                          <Badge 
                            variant="outline" 
                            className={getParameterStatusColor(param.status)}
                          >
                            {param.status}
                          </Badge>
                        </div>
                        <div className="h-8 w-1 rounded-full bg-gray-200 relative">
                          <div 
                            className={`absolute bottom-0 w-1 rounded-full ${
                              param.status === 'normal' ? 'bg-green-500' : 
                              param.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ 
                              height: param.status === 'normal' ? '70%' : 
                                      param.status === 'warning' ? '40%' : '20%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-xs text-gray-600">
                  <div className="flex items-center text-yellow-600">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>Turbidity levels are higher than normal. This could indicate increased sediment from recent rainfall or potential pollution events.</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-md border">
                <h4 className="font-medium mb-2">Alert Thresholds</h4>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="ph-threshold" className="text-xs">pH (6-9)</Label>
                      <div className="flex items-center mt-1">
                        <Input 
                          id="ph-threshold"
                          type="number" 
                          min="0" 
                          max="14" 
                          step="0.1"
                          defaultValue="6.5"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="do-threshold" className="text-xs">Dissolved Oxygen (mg/L)</Label>
                      <div className="flex items-center mt-1">
                        <Input 
                          id="do-threshold"
                          type="number" 
                          min="0" 
                          max="20" 
                          step="0.1"
                          defaultValue="5.0"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="turb-threshold" className="text-xs">Turbidity (NTU)</Label>
                      <div className="flex items-center mt-1">
                        <Input 
                          id="turb-threshold"
                          type="number" 
                          min="0" 
                          max="100" 
                          step="0.1"
                          defaultValue="10.0"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-2"
                    onClick={() => toast.success('Alert thresholds updated')}
                  >
                    Save Thresholds
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IoTIntegration;
