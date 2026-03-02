import { PIXEL_ID } from '@/constants/env';
import { LanguageProviders } from '@/context/LanguageProvider';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google'
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
export const metadata = {
  title: 'Finansist International | Konsultan Akuntan dan Perpajakan Terpercaya',
  description: 'Layanan konsultan akuntan dan perpajakan di berbagai sektor bisnis dengan dukungan tim ahli yang berpengalaman sesuai kebutuhan spesifik di setiap industri dan telah bersertifikasi international.',
  keywords: ['Konsultan Pajak Indonesia', 'Konsultan Akuntan Indonesia', 'Konsultan Pajak Jakarta', 'Konsultan Akuntan Jakarta', 'Konsultan Bisnis Indonesia', 'Konsultan Akuntan Perusahaan', 'Konsultan Pajak Perusahaan',
  'Finansist International', 'Finansist', 'Konsul Pajak', 'Konsul Akuntansi'],
  alternates: {
    canonical: 'https://finansistinternational.com',
  },
  verification: {
    google: "rgLDNSdeUKDSsl15iB0-PYAAh4Uxp9dLdph6p6obSuA",
  },
  robots: {
    index: true,
    follow: true,
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    'name': 'Finansist International',
    'image': 'https://finansistinternational.com/images/logo-large.webp',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Jl. Mars Bar. VI No.5, Manjahlega, Kec. Rancasari',
      'addressLocality': 'Kota Bandung',
      'addressRegion': 'Jawa Barat',
      'postalCode': '40295',
      'addressCountry': 'ID'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -6.946750,
      'longitude': 107.664111
    },
    'url': 'https://finansistinternational.com',
    'telephone': '+628121114994',
    'openingHours': 'Mo-Fr 08:00-18:00',
    'priceRange': '$$'
  };
  return (
    <html lang="en" className="!scroll-smooth">
    <head>
      <link rel="icon" href="/favicon.ico" />
      <GoogleTagManager gtmId="GTM-WJ9R9CTB" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
      <body className={`${inter.className} antialiased bg-white transition-colors duration-500 ease-in-out dark:text-white dark:bg-[#020e16]`}>
        <LanguageProviders>{children}</LanguageProviders>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
        </Script>
        <Script id="set-language" strategy="afterInteractive">
          {`
          (function() {
            function setLanguage() {
              const lang = window.localStorage.getItem('lang');
              document.documentElement.lang = lang || 'en';
            }
            window.addEventListener('storage', (event) => {
              if (event.key === 'lang') {
                setLanguage();
              }
            });
            setLanguage();
          })();
          `}
        </Script>
        <noscript>
          <Image height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
        </noscript>
      </body>
    </html>
  );
}
