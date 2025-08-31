
// AI Detection Simulation

export type BoundingBox = {
  x: number;      // Percentage from left
  y: number;      // Percentage from top
  width: number;  // Percentage of width
  height: number; // Percentage of height
};

export type DetectionType = {
  id: string;
  type: string;          // Person, Vehicle, Debris, etc.
  confidence: number;    // Range 0-1
  location: string;      // Camera location name
  timestamp: Date;
  action?: string;       // What's being done
  bbox: BoundingBox;
  isThreat: boolean;     // Whether this is flagged as suspicious
};

// Object types that can be detected (simulating YOLOv8 classes)
const objectTypes = ['Person', 'Vehicle', 'Debris', 'Animal', 'Boat'];

// Possible actions
const actions = {
  'Person': ['Walking', 'Suspicious Activity', 'Dumping Trash', 'Standing'],
  'Vehicle': ['Parked', 'Moving', 'Dumping Materials'],
  'Debris': ['Floating', 'Submerged'],
  'Animal': ['Moving', 'Standing'],
  'Boat': ['Moving', 'Anchored', 'Dumping Materials']
};

// Generate random position and size for bounding box
const generateBoundingBox = (): BoundingBox => {
  return {
    x: Math.floor(Math.random() * 70), // Keep within frame
    y: Math.floor(Math.random() * 70),
    width: 10 + Math.floor(Math.random() * 20),
    height: 10 + Math.floor(Math.random() * 20)
  };
};

// Generate a unique ID for detections
const generateDetectionId = (): string => {
  return 'det-' + Math.random().toString(36).substring(2, 8);
};

// Determine if an action is suspicious/illegal
const isSuspiciousAction = (type: string, action: string): boolean => {
  const suspiciousActions = [
    'Dumping Trash',
    'Dumping Materials',
    'Suspicious Activity'
  ];
  
  return suspiciousActions.includes(action);
};

/**
 * Simulate object detection results
 * @param cameraIndex The index of the camera feed
 * @returns Array of detected objects
 */
export const simulateObjectDetection = (cameraIndex: number): DetectionType[] => {
  // Determine how many objects to detect (0-3)
  const numObjects = Math.floor(Math.random() * 3);
  if (numObjects === 0) return [];
  
  const detections: DetectionType[] = [];
  const locationName = cameraIndex === 0 ? 'Yamuna River, Delhi' : 'Hooghly River, Kolkata';
  
  for (let i = 0; i < numObjects; i++) {
    // Pick a random object type
    const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
    
    // Pick a random action for this type
    const possibleActions = actions[type as keyof typeof actions] || ['Unknown'];
    const action = possibleActions[Math.floor(Math.random() * possibleActions.length)];
    
    // Generate detection with random confidence score
    const detection: DetectionType = {
      id: generateDetectionId(),
      type,
      confidence: 0.70 + (Math.random() * 0.29), // 70%-99%
      location: locationName,
      timestamp: new Date(),
      action,
      bbox: generateBoundingBox(),
      isThreat: isSuspiciousAction(type, action)
    };
    
    detections.push(detection);
  }
  
  return detections;
};

// Function to simulate YOLO confidence scores
export const simulateConfidence = () => {
  return {
    personConfidence: 0.85 + (Math.random() * 0.14),
    vehicleConfidence: 0.80 + (Math.random() * 0.19),
    debrisConfidence: 0.75 + (Math.random() * 0.20)
  };
};

/**
 * Simulates YOLOv8 detection on an image or video frame
 * This is a placeholder for real YOLOv8 integration that would use ONNX runtime
 */
export class YOLOv8Detector {
  private isInitialized: boolean = false;
  private modelLoading: boolean = false;
  
  constructor() {
    console.log("YOLOv8 detector initialized in simulation mode");
  }

  // Simulate model loading
  public async loadModel(): Promise<boolean> {
    if (this.isInitialized) return true;
    if (this.modelLoading) return false;
    
    this.modelLoading = true;
    console.log("Loading simulated YOLOv8 model...");
    
    // Simulate loading delay
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isInitialized = true;
        this.modelLoading = false;
        console.log("Simulated YOLOv8 model loaded successfully");
        resolve(true);
      }, 2000); // Simulate 2 second loading time
    });
  }
  
  // Detect objects in image/video frame
  public async detectFrame(
    imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
  ): Promise<DetectionType[]> {
    if (!this.isInitialized) {
      console.warn("YOLOv8 model not initialized, attempting to load");
      await this.loadModel();
    }
    
    // Get dimensions for realistic bbox calculation
    const width = imageElement.width || 640;
    const height = imageElement.height || 480;
    
    // Generate 0-4 detections
    const numDetections = Math.floor(Math.random() * 5);
    const detections: DetectionType[] = [];
    
    for (let i = 0; i < numDetections; i++) {
      // Generate more realistic bounding boxes based on the actual image dimensions
      const x = Math.floor(Math.random() * (width * 0.7)) / width * 100;
      const y = Math.floor(Math.random() * (height * 0.7)) / height * 100;
      const boxWidth = (10 + Math.floor(Math.random() * 20)) * (width / 100);
      const boxHeight = (10 + Math.floor(Math.random() * 20)) * (height / 100);
      
      const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
      const possibleActions = actions[type as keyof typeof actions] || ['Unknown'];
      const action = possibleActions[Math.floor(Math.random() * possibleActions.length)];
      
      detections.push({
        id: generateDetectionId(),
        type,
        confidence: 0.70 + (Math.random() * 0.29),
        location: 'Camera Feed',
        timestamp: new Date(),
        action,
        bbox: {
          x,
          y,
          width: boxWidth / width * 100,
          height: boxHeight / height * 100
        },
        isThreat: isSuspiciousAction(type, action)
      });
    }
    
    return detections;
  }
  
  // Check if model is ready
  public isModelReady(): boolean {
    return this.isInitialized;
  }
}

// Export a singleton instance
export const yoloDetector = new YOLOv8Detector();
