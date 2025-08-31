import React, { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Camera, ImagePlus, AlertTriangle, Check, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { emitNewIncident, IncidentEventData } from '@/lib/events';

type IncidentType = 'dumping' | 'pollution' | 'vandalism' | 'wildlife' | 'other';
type IncidentSeverity = 'critical' | 'warning' | 'info';

interface IncidentData {
  id: string;
  title: string;
  description: string;
  location: string;
  type: IncidentType;
  severity: IncidentSeverity;
  imageUrl: string;
  timestamp: Date;
}

interface IncidentUploadProps {
  onIncidentSubmitted?: (incident: IncidentData) => void;
}

const IncidentUpload: React.FC<IncidentUploadProps> = ({ onIncidentSubmitted }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<IncidentType>('pollution');
  const [severity, setSeverity] = useState<IncidentSeverity>('warning');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Update selected file
    setSelectedImage(file);
    
    // Create preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast.error('Please upload an image', {
        description: 'An image is required to report an incident'
      });
      return;
    }

    setIsUploading(true);

    try {
      // Here you would normally upload to a server
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a new incident object
      const newIncident: IncidentData = {
        id: Date.now().toString(),
        title,
        description,
        location,
        type,
        severity,
        imageUrl: previewUrl || '',  // In a real app, this would be the URL from the server
        timestamp: new Date()
      };
      
      // Call the callback if provided
      if (onIncidentSubmitted) {
        onIncidentSubmitted(newIncident);
      }
      
      // Emit the event for other components to react
      emitNewIncident({
        id: newIncident.id,
        title: newIncident.title,
        type: newIncident.type,
        severity: newIncident.severity,
        location: newIncident.location,
        imageUrl: newIncident.imageUrl,
        timestamp: newIncident.timestamp
      });
      
      // Show success notification
      toast.success('Incident reported successfully', {
        description: 'Your incident has been logged and will be reviewed'
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setType('pollution');
      setSeverity('warning');
      setSelectedImage(null);
      setPreviewUrl(null);
      
    } catch (error) {
      toast.error('Failed to submit incident', {
        description: 'Please try again later'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Report Incident
        </CardTitle>
        <CardDescription>Upload images and details of environmental incidents</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="incident-title">Incident Title</Label>
            <Input
              id="incident-title"
              placeholder="Brief title describing the incident"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incident-type">Incident Type</Label>
              <Select value={type} onValueChange={(value) => setType(value as IncidentType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dumping">Illegal Dumping</SelectItem>
                  <SelectItem value="pollution">Water Pollution</SelectItem>
                  <SelectItem value="vandalism">Vandalism</SelectItem>
                  <SelectItem value="wildlife">Wildlife Disturbance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="incident-severity">Severity</Label>
              <Select value={severity} onValueChange={(value) => setSeverity(value as IncidentSeverity)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="incident-location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="incident-location"
                placeholder="River location or coordinates"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="incident-description">Description</Label>
            <Textarea
              id="incident-description"
              placeholder="Detailed description of the incident"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="incident-image">Image Evidence</Label>
            <div 
              className={`border-2 border-dashed rounded-md p-4 text-center ${
                previewUrl ? 'border-riverguard-500' : 'border-gray-300'
              } hover:border-riverguard-500 transition-colors cursor-pointer`}
              onClick={triggerFileInput}
            >
              <input
                type="file"
                id="incident-image"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Incident preview"
                    className="max-h-64 mx-auto rounded-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                    <Button type="button" variant="secondary" size="sm" onClick={triggerFileInput}>
                      <ImagePlus className="h-4 w-4 mr-1" />
                      Change Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <ImagePlus className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG or JPEG (max 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-riverguard-600 hover:bg-riverguard-700"
          disabled={isUploading || !selectedImage || !title || !location}
        >
          {isUploading ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Submit Incident Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IncidentUpload; 