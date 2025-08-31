
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  Camera, 
  Database, 
  Bell, 
  Settings, 
  ChartBar, 
  MapPin,
  CloudRain
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AppSidebar: React.FC = () => {
  const menuItems = [
    { title: 'Dashboard', icon: ChartBar, path: '/' },
    { title: 'Camera Feeds', icon: Camera, path: '/feeds' },
    { title: 'Incidents', icon: Bell, path: '/incidents' },
    { title: 'Analytics', icon: Database, path: '/analytics' },
    { title: 'Locations', icon: MapPin, path: '/locations' },
    { title: 'Weather', icon: CloudRain, path: '/weather' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-4">
        <div className="flex items-center">
          <CloudRain className="h-8 w-8 text-white mr-2" />
          <span className="text-white font-bold text-xl">RiverGuard AI</span>
        </div>
        <SidebarTrigger className="ml-auto text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-white/70">
          Version 1.0.0 • RiverGuard AI © 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
