import Navbar from '@/components/Navbar';
import { DOMAIN_WEB } from '@/constants/env';
import { ThemeProviders } from '@/context/ThemeProvider';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_WEB as string),
  title: {
    default: 'Finansist International',
    template: '%s | Finansist International',
  },
  description:
    'Provides expert solutions for helping hundreds of businesses increase productivity and profitability by making IT a streamlined part of operations.',
  openGraph: {
    title: 'Finansist International',
    description:
      'Provides expert solutions for helping hundreds of businesses increase productivity and profitability by making IT a streamlined part of operations.',
    type: 'website',
    locale: 'id_ID',
    url: DOMAIN_WEB,
    siteName: 'Finansist International',
    images: [
      {
        url: `./opengraph-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

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
