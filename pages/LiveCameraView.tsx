
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const LiveCameraView: React.FC = () => {
  const { cameraId } = useParams<{ cameraId: string }>();
  
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-riverguard-900 mb-1">Live Camera View</h1>
            <p className="text-gray-500">Camera ID: {cameraId || 'Unknown'}</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/feeds">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Feeds
            </Link>
          </Button>
        </div>
        
        <Card className="border-2 border-riverguard-200/50">
          <CardHeader>
            <CardTitle>Live Stream</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <div className="bg-riverguard-100 p-6 rounded-full mb-4">
              <AlertTriangle className="h-12 w-12 text-riverguard-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stream Currently Unavailable</h3>
            <p className="text-gray-600 text-center mb-4">
              This feature is currently under development or the camera feed is temporarily offline.
            </p>
            <Button variant="outline">Refresh Stream</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LiveCameraView;
