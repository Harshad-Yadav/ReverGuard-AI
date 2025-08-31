import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Camera, CloudRain, MapPin, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { simulateObjectDetection, DetectionType } from '@/lib/aiSimulation';

// Simulated video feeds for demonstration
const videoFeeds = [
  '/img3.jpeg', 
  '/img4.jpeg'
];

// Placeholder image paths
const placeholderImage = '/placeholder.svg';

const LiveFeed: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState(0);
  const [incidentDetected, setIncidentDetected] = useState(false);
  const [detections, setDetections] = useState<DetectionType[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<DetectionType | null>(null);

  useEffect(() => {
    // Start the detection simulation immediately
    startDetection();

    // Simulate a detection event after 8 seconds
    const timer = setTimeout(() => {
      const newDetection = {
        id: 'det-001',
        type: 'Person',
        confidence: 0.87,
        location: activeFeed === 0 ? 'North River Bank' : 'South River Crossing',
        timestamp: new Date(),
        action: 'Suspicious Activity',
        bbox: { x: 45, y: 65, width: 30, height: 20 },
        isThreat: true
      };
      
      setDetections(prev => [...prev, newDetection]);
      setIncidentDetected(true);
      
      toast.error("Alert: Potential dumping detected", {
        description: "Suspicious activity detected at North Bank location",
      });
      
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Function to switch between camera feeds
  const switchFeed = () => {
    setActiveFeed(prevFeed => (prevFeed === 0 ? 1 : 0));
  };

  // Function to start the detection process
  const startDetection = () => {
    setIsDetecting(true);
    
    // Simulate periodic detection updates
    const detectionInterval = setInterval(() => {
      // Only add new detections occasionally to avoid overwhelming the UI
      if (Math.random() > 0.7) {
        const newDetections = simulateObjectDetection(activeFeed);
        if (newDetections.length > 0) {
          setDetections(prev => [...prev, ...newDetections]);
          
          // Check if any are threats
          const threats = newDetections.filter(d => d.isThreat);
          if (threats.length > 0) {
            setIncidentDetected(true);
            
            // Show toast for the first threat
            toast.error(`Alert: ${threats[0].action} detected`, {
              description: `${threats[0].type} detected at ${threats[0].location}`,
            });
          }
        }
      }
    }, 3000);
    
    return () => clearInterval(detectionInterval);
  };

  const handleViewIncidentDetails = (incident: DetectionType) => {
    setSelectedIncident(incident);
    setIsDialogOpen(true);
  };

  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            Live Surveillance Feed
            <div className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={`${isDetecting ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {isDetecting ? 'AI Detection Active' : 'Detection Paused'}
            </Badge>
            <Badge variant="outline" className="bg-riverguard-100 text-riverguard-800">
              Camera {activeFeed + 1}
            </Badge>
            {incidentDetected && (
              <Badge variant="destructive" className="animate-pulse-warning flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Incident Detected
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative">
          <AspectRatio ratio={16/9}>
            <div 
              className="w-full h-full relative bg-riverguard-900/10 rounded-md flex justify-center items-center overflow-hidden"
              style={{
                backgroundImage: `url(${videoFeeds[activeFeed] || placeholderImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay for detection bounding boxes */}
              <div className="absolute top-0 left-0 w-full h-full">
                {detections.filter(d => d.bbox).map((detection) => (
                  <div 
                    key={detection.id}
                    className={`absolute border-2 ${detection.isThreat ? 'border-red-500' : 'border-blue-500'} rounded-sm flex flex-col justify-end items-start`}
                    style={{
                      left: `${detection.bbox.x}%`,
                      top: `${detection.bbox.y}%`,
                      width: `${detection.bbox.width}%`,
                      height: `${detection.bbox.height}%`,
                    }}
                    onClick={() => handleViewIncidentDetails(detection)}
                  >
                    <div className={`text-xs px-1 py-0.5 ${detection.isThreat ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
                      {detection.type} ({Math.round(detection.confidence * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Camera info overlay */}
              <div className="absolute bottom-3 left-3 text-xs text-white bg-black/50 px-2 py-1 rounded flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {activeFeed === 0 ? "Yamuna River - Delhi Region" : "Hooghly River - Kolkata Region"}
              </div>

              {/* AI status indicator */}
              <div className="absolute top-3 left-3 text-xs bg-black/50 px-2 py-1 rounded flex items-center">
                <div className={`w-2 h-2 rounded-full ${isDetecting ? 'bg-green-500' : 'bg-yellow-500'} mr-1.5 animate-pulse`}></div>
                <span className="text-white">YOLO AI {isDetecting ? 'Processing' : 'Paused'}</span>
              </div>
            </div>
          </AspectRatio>
          
          <button
            onClick={switchFeed}
            className="absolute bottom-3 right-3 bg-riverguard-600 text-white rounded-full p-2 hover:bg-riverguard-700 transition-colors"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-3 grid grid-cols-1 gap-2">
          <div className="p-2 rounded bg-riverguard-50 border border-riverguard-100">
            <div className="text-xs font-medium mb-1">AI Detection Log</div>
            <div className="max-h-24 overflow-y-auto text-xs space-y-1">
              {detections.length > 0 ? (
                detections.map((detection) => (
                  <div 
                    key={detection.id}
                    className={`p-1.5 rounded flex items-center justify-between ${detection.isThreat ? 'bg-red-50 border-l-2 border-red-500' : 'bg-blue-50'}`}
                    onClick={() => handleViewIncidentDetails(detection)}
                  >
                    <div className="flex items-center">
                      {detection.isThreat ? (
                        <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                      ) : (
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-1" />
                      )}
                      <span>{detection.type} - {detection.action}</span>
                    </div>
                    <div className="text-gray-500">
                      {detection.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic p-1">No objects detected yet</div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveFeed(0)}
              className={`p-2 rounded ${
                activeFeed === 0 ? 'bg-riverguard-500 text-white' : 'bg-riverguard-100 text-riverguard-700'
              } text-xs font-medium`}
            >
              Yamuna River
            </button>
            <button
              onClick={() => setActiveFeed(1)}
              className={`p-2 rounded ${
                activeFeed === 1 ? 'bg-riverguard-500 text-white' : 'bg-riverguard-100 text-riverguard-700'
              } text-xs font-medium`}
            >
              Hooghly River
            </button>
          </div>
        </div>
      </CardContent>

      {/* Dialog for displaying incident details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Incident Details</DialogTitle>
            <DialogDescription>
              Detection information for this incident
            </DialogDescription>
          </DialogHeader>
          
          {selectedIncident && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Type:</div>
                <div>{selectedIncident.type}</div>
                
                <div className="font-medium">Action:</div>
                <div>{selectedIncident.action}</div>
                
                <div className="font-medium">Confidence:</div>
                <div>{Math.round(selectedIncident.confidence * 100)}%</div>
                
                <div className="font-medium">Location:</div>
                <div>{selectedIncident.location}</div>
                
                <div className="font-medium">Time:</div>
                <div>{selectedIncident.timestamp.toLocaleString()}</div>
                
                <div className="font-medium">Threat Level:</div>
                <div>
                  <Badge variant={selectedIncident.isThreat ? "destructive" : "outline"}>
                    {selectedIncident.isThreat ? "High" : "Low"}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm font-medium mb-1">AI Assessment</div>
                <p className="text-xs">
                  {selectedIncident.isThreat 
                    ? "This detection has been flagged as potentially illegal activity. The system is monitoring the situation and will record further evidence."
                    : "Normal object detected. No action required at this time."}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LiveFeed;
