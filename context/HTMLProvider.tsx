'use client';
import { useEffect, useState } from 'react';

export default function HTMLProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('lang');
      setLang(getData);
      console.log(getData);
    }
  }, []);

  console.log(lang);

  return (
    <html lang={lang ?? 'en'} className="!scroll-smooth">
      {children}
    </html>
  );
}
