'use client';
import { TitleSection } from './ui/typography';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageProvider';

const ServiceCard = dynamic(() => import('./common/ServiceCard'), { ssr: true });

const Services = () => {
  const { dictionary } = useLanguage();
  const { items, title } = dictionary.services;
  return (
    <section className="max-w-screen-lg mx-auto min-h-screen pt-20 px-5 md:px-0 md:mt-20">
      <TitleSection>{title}</TitleSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-10 md:gap-x-6 md:gap-y-20">
        {items.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default memo(Services);
