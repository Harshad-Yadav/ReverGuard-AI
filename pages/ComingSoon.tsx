
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="p-6 bg-riverguard-50 rounded-full mb-6">
          <Clock className="h-16 w-16 text-riverguard-600" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">Coming Soon</h1>
        <p className="text-xl text-gray-600 text-center mb-8 max-w-md">
          This feature is currently being developed and will be available soon.
        </p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </AppLayout>
  );
};

export default ComingSoon;
