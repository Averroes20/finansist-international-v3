'use client';
import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import AnimatedComponent from './animation/animation-component';

const ServiceCard = dynamic(() => import('@/components/common/ServiceCard'), { ssr: true });

const Services = () => {
  const { dictionary } = useLanguage();
  const { items, title } = dictionary?.services || {};
  return (
    <section className="max-w-screen-lg mx-auto min-h-screen py-5 px-5 md:px-0 md:my-10">
      <TitleSection>{title}</TitleSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-10 md:gap-x-6 md:gap-y-20 pb-6">
        {items?.map((service, index) => (
          <AnimatedComponent
            key={index + 1}
            id={service.link}
            once={true}
            threshold={0.2}
            className="flex flex-col scroll-mt-20"
            effect="fade-up"
            delay={index * 0.5}
          >
            <ServiceCard service={service} />
          </AnimatedComponent>
        ))}
      </div>
    </section>
  );
};

export default memo(Services);
