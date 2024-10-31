import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
