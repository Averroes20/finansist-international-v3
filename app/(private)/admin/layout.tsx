'use client';
import AppSidebar from '@/components/common/AppSidebar';
import ToggleSidebar from '@/components/common/ToggleSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Fragment } from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <SidebarProvider>
        <AppSidebar />
        <main className='main className="min-h-[90vh] w-full mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-4"'>
          <ToggleSidebar className="absolute top-28 right-7 text-lg md:hidden" />
          {children}
        </main>
      </SidebarProvider>
    </Fragment>
  );
}
