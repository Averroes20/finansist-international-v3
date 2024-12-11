import { Handshake, LibraryBig, Star } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';
import ToggleSidebar from './ToggleSidebar';
import Image from 'next/image';
import Link from 'next/link';

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
  {
    title: 'Review',
    url: '/admin/review',
    icon: Star,
  },
];

const AppSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar variant="floating" className="h-screen" collapsible="icon">
      <ToggleSidebar className="absolute bottom-1/2  left-1/2 -translate-x-1/2 hidden md:block" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className={`p-5 ${open ? 'block' : 'hidden'}`}>
              <Link href={'/'}>
                <Image width={1028} height={1028} quality={100} src="/images/logo-large.webp" alt="logo" className="w-full" />
              </Link>
            </div>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`${item.url === window.location.pathname ? 'bg-slate-800 hover:bg-slate-950' : ''}`}>
                    <a href={item.url}>
                      <item.icon className={`w-5 h-5 ${item.url === window.location.pathname ? 'text-white' : ''}`} />
                      <span className={`ml-4 ${item.url === window.location.pathname ? 'text-white' : ''}`}>{item.title}</span>
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
