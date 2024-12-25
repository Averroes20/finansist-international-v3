import { DOMAIN_WEB, PIXEL_ID } from '@/constants/env';
import { LanguageProviders } from '@/context/LanguageProvider';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Script from 'next/script';
import './globals.css';
import HTMLProvider from '@/context/HTMLProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HTMLProvider>
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={DOMAIN_WEB} />
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
        <noscript>
          <Image height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
        </noscript>
      </body>
    </HTMLProvider>
  );
}
