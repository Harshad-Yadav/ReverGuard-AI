import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Camera, MapPin, AlertTriangle, Video } from 'lucide-react';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { yoloDetector, DetectionType, simulateObjectDetection } from '@/lib/aiSimulation';

const WebcamFeed: React.FC = () => {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<DetectionType[]>([]);
  const [incidentDetected, setIncidentDetected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<DetectionType | null>(null);
  const [useSimulation, setUseSimulation] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionInterval = useRef<number | null>(null);
  
  // Start webcam stream
  const startWebcam = async () => {
    if (!videoRef.current) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      videoRef.current.srcObject = stream;
      setIsWebcamActive(true);
      setUseSimulation(false);
      toast.success("Webcam activated successfully");
      
      // Start model loading in background
      yoloDetector.loadModel().then(() => {
        toast.success("YOLOv8 model loaded and ready");
      });
      
    } catch (error) {
      console.error("Error accessing webcam:", error);
      
      const errorMessage = error instanceof DOMException ? error.name : 'Unknown Error';
      
      if (errorMessage === 'NotAllowedError') {
        toast.error("Camera access denied", {
          description: "Please allow camera access in your browser permissions"
        });
      } else if (errorMessage === 'NotFoundError') {
        toast.error("No camera found", {
          description: "Please connect a camera and try again"
        });
      } else if (errorMessage === 'NotReadableError') {
        toast.error("Camera is in use by another application", {
          description: "Please close other apps using your camera"
        });
      } else {
        toast.error("Could not access webcam", {
          description: "Please check camera permissions and try again"
        });
      }
    }
  };

  // Start simulation mode (no webcam required)
  const startSimulation = () => {
    setUseSimulation(true);
    setIsWebcamActive(true);
    toast.success("Simulation mode activated", {
      description: "Using AI-generated data for demonstration"
    });
    
    // Start model loading in background
    yoloDetector.loadModel().then(() => {
      toast.success("YOLOv8 model loaded and ready for simulation");
    });
  };
  
  // Stop webcam stream
  const stopWebcam = () => {
    if (!useSimulation && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setIsWebcamActive(false);
    setUseSimulation(false);
    stopDetection();
  };
  
  // Toggle detection on/off
  const toggleDetection = () => {
    if (isDetecting) {
      stopDetection();
    } else {
      startDetection();
    }
  };
  
  // Start real-time detection
  const startDetection = () => {
    if (!isWebcamActive) {
      toast.error("Please activate webcam or simulation first");
      return;
    }
    
    setIsDetecting(true);
    toast.info("AI detection started");
    
    // Run detection every 1 second
    detectionInterval.current = window.setInterval(async () => {
      if (!canvasRef.current) return;
      
      try {
        let newDetections: DetectionType[] = [];
        
        if (useSimulation) {
          // Use simulated data in simulation mode
          newDetections = simulateObjectDetection(0);
        } else if (videoRef.current) {
          // Get detections using our simulated YOLOv8 model on webcam feed
          newDetections = await yoloDetector.detectFrame(videoRef.current);
        }
        
        if (newDetections.length > 0) {
          // Add location information to the detections
          const detectionsWithLocation = newDetections.map(d => ({
            ...d, 
            location: useSimulation ? 'Simulation Feed' : 'Live Webcam Feed'
          }));
          
          setDetections(prev => [...prev, ...detectionsWithLocation]);
          
          // Check for threats
          const threats = detectionsWithLocation.filter(d => d.isThreat);
          if (threats.length > 0) {
            setIncidentDetected(true);
            
            toast.error(`Alert: ${threats[0].action} detected`, {
              description: `${threats[0].type} detected on ${useSimulation ? 'simulation' : 'live'} feed`,
            });
          }
        }
      } catch (error) {
        console.error("Detection error:", error);
      }
    }, 1000);
  };
  
  // Stop real-time detection
  const stopDetection = () => {
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
      detectionInterval.current = null;
    }
    setIsDetecting(false);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, []);
  
  // Handle opening incident details
  const handleViewIncidentDetails = (incident: DetectionType) => {
    setSelectedIncident(incident);
    setIsDialogOpen(true);
  };

  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            {useSimulation ? 'Simulation Feed' : 'Live Webcam Feed'}
            <div className={`ml-2 w-2 h-2 rounded-full ${isWebcamActive ? 'bg-green-500' : 'bg-gray-300'} ${isWebcamActive ? 'animate-pulse' : ''}`}></div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {isWebcamActive && (
              <Badge variant="outline" className={`${isDetecting ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {isDetecting ? 'YOLOv8 Active' : 'Detection Paused'}
              </Badge>
            )}
            {useSimulation && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Simulation Mode
              </Badge>
            )}
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
            <div className="w-full h-full relative bg-riverguard-900/10 rounded-md flex justify-center items-center overflow-hidden">
              {/* Video element for webcam */}
              <video 
                ref={videoRef}
                autoPlay 
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ display: isWebcamActive && !useSimulation ? 'block' : 'none' }}
              />
              
              {/* Simulation background */}
              {useSimulation && (
                <div className="w-full h-full bg-riverguard-900/20">
                  <img 
                    src="/img1.jpeg" 
                    alt="River pollution simulation" 
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              )}
              
              {/* Fallback when no feed is active */}
              {!isWebcamActive && (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Camera className="h-12 w-12 text-riverguard-400 mb-2" />
                  <p className="text-riverguard-500">No active feed</p>
                  <p className="text-xs text-riverguard-400 mb-2">Choose an option below to continue</p>
                  <p className="text-xs text-riverguard-400 mb-4">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    Make sure to allow camera permissions when prompted
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={startWebcam} variant="default">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Webcam
                    </Button>
                    <Button onClick={startSimulation} variant="outline">
                      <Video className="h-4 w-4 mr-2" />
                      Use Simulation
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Canvas overlay for rendering detections */}
              <canvas 
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />
              
              {/* Detection boxes overlay */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {isWebcamActive && detections.slice(-5).map((detection) => (
                  <div 
                    key={detection.id}
                    className={`absolute border-2 ${detection.isThreat ? 'border-red-500' : 'border-blue-500'} rounded-sm flex flex-col justify-end items-start pointer-events-auto`}
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
              
              {/* Location info overlay */}
              {isWebcamActive && (
                <div className="absolute bottom-3 left-3 text-xs text-white bg-black/50 px-2 py-1 rounded flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {useSimulation ? 'Simulation Feed' : 'Live Webcam Feed'}
                </div>
              )}

              {/* AI status indicator */}
              {isWebcamActive && (
                <div className="absolute top-3 left-3 text-xs bg-black/50 px-2 py-1 rounded flex items-center">
                  <div className={`w-2 h-2 rounded-full ${isDetecting ? 'bg-green-500' : 'bg-yellow-500'} mr-1.5 animate-pulse`}></div>
                  <span className="text-white">YOLOv8 {isDetecting ? 'Processing' : 'Paused'}</span>
                </div>
              )}
            </div>
          </AspectRatio>
          
          {isWebcamActive && (
            <div className="absolute bottom-3 right-3 flex space-x-2">
              <Button
                onClick={toggleDetection}
                variant={isDetecting ? "destructive" : "default"}
                size="sm"
                className="rounded-full"
              >
                {isDetecting ? 'Stop Detection' : 'Start Detection'}
              </Button>
              
              <Button
                onClick={stopWebcam}
                variant="outline"
                size="sm"
                className="rounded-full bg-white/80"
              >
                Stop Feed
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-3 grid grid-cols-1 gap-2">
          <div className="p-2 rounded bg-riverguard-50 border border-riverguard-100">
            <div className="text-xs font-medium mb-1">YOLOv8 Detection Log</div>
            <div className="max-h-24 overflow-y-auto text-xs space-y-1">
              {detections.length > 0 ? (
                detections.slice(-10).map((detection) => (
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
                      <span>{detection.type} - {detection.action || 'Detected'}</span>
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
                <div>{selectedIncident.action || 'Unknown'}</div>
                
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

export default WebcamFeed;
