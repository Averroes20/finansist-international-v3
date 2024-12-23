import Navbar from '@/components/Navbar';
import { DOMAIN_WEB } from '@/constants/env';
import { SocialMediaProviders } from '@/context/SocialMediaProvider';
import { ThemeProviders } from '@/context/ThemeProvider';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Dosis, Libre_Baskerville } from 'next/font/google';

const Footer = dynamic(() => import('@/components/Footer'));

const libre_baskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  display: 'swap',
  preload: true,
  weight: ['400', '700'],
});

const dosis = Dosis({
  subsets: ['latin'],
  variable: '--font-dosis',
  display: 'swap',
  preload: true,
  weight: ['400', '700', '800', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_WEB as string),
  title: {
    default: 'Finansist International',
    template: '%s | Finansist International',
  },
  description:
    'Finansist International provides expert IT solutions to help businesses increase productivity and profitability by streamlining IT operations.',
  openGraph: {
    title: 'Finansist International',
    description:
      'Finansist International provides expert IT solutions to help businesses increase productivity and profitability by streamlining IT operations.',
    type: 'website',
    locale: 'id_ID',
    url: DOMAIN_WEB,
    siteName: 'Finansist International',
    images: [
      {
        url: `${DOMAIN_WEB}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Finansist International',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FinansistIntl',
    title: 'Finansist International',
    description:
      'Finansist International provides expert IT solutions to help businesses increase productivity and profitability by streamlining IT operations.',
    images: [
      {
        url: `${DOMAIN_WEB}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Finansist International',
      },
    ],
  },
  robots: 'index, follow',
  keywords: ['IT solutions', 'business productivity', 'profitability', 'IT operations', 'Finansist International'],
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProviders>
      <SocialMediaProviders>
        <Navbar />
        <main className={`${libre_baskerville.variable} ${dosis.variable} `}>{children}</main>
        <Footer />
      </SocialMediaProviders>
    </ThemeProviders>
  );
}
