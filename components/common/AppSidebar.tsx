import { Handshake, LibraryBig } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import ToggleSidebar from './ToggleSidebar';

const items = [
  {
    title: 'Blogs',
    url: '/admin/blogs',
    icon: LibraryBig,
  },
  {
    title: 'Portfolio',
    url: '/admin/portfolio',
    icon: Handshake,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar variant="floating" className="md:h-[calc(100vh-80px)] h-full mt-[75px]" collapsible="icon">
      <ToggleSidebar className="absolute bottom-1/2  left-1/2 -translate-x-1/2 hidden md:block" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
