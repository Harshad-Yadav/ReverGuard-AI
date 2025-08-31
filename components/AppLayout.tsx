import React, { useState } from 'react';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Upload, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ChatComponent from './ChatComponent';
import IncidentUpload from './IncidentUpload';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
            <h2 className="text-xl font-semibold text-riverguard-900">RiverGuard AI Dashboard</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChatDialogOpen(true)}
                className="flex gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                Chat Assistant
              </Button>
              <Button 
                size="sm" 
                onClick={() => setIsUploadDialogOpen(true)}
                className="bg-riverguard-600 hover:bg-riverguard-700"
              >
                <Upload className="mr-2 h-4 w-4" />
                Report Incident
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen}>
        <DialogContent className="sm:max-w-[450px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>RiverGuard Chat Assistant</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <ChatComponent />
          </div>
        </DialogContent>
      </Dialog>

      {/* Incident Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Report Incident</DialogTitle>
          </DialogHeader>
          <IncidentUpload onIncidentSubmitted={() => setIsUploadDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default AppLayout;
