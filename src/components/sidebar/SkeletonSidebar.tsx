import React  from 'react';

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

  SidebarRail,

} from "@/components/ui/sidebar"

export const SkeletonSidebar = () => (
    <SidebarComponent collapsible="icon" className="bg-gray-100">
      <SidebarHeader>
        <div className="h-12 bg-gray-200 rounded-md animate-pulse" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
          </SidebarGroupLabel>
          <SidebarMenu>
            {[1, 2, 3, 4].map((item) => (
              <SidebarMenuItem key={item}>
                <SidebarMenuButton>
                  <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="h-12 bg-gray-200 rounded-md animate-pulse" />
      </SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  );