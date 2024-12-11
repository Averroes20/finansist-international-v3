import Navbar from '@/components/Navbar';
import { ThemeProviders } from '@/context/ThemeProvider';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer'));

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProviders>
      <Navbar />
      {children}
      <Footer />
    </ThemeProviders>
  );
}
