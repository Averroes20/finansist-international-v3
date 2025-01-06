'use client';
import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const ServiceCard = dynamic(() => import('@/components/common/ServiceCard'), { ssr: true });
const AnimatedComponent = dynamic(() => import('@/components/animation/animation-component'), { ssr: false });

const Services = () => {
  const { dictionary } = useLanguage();
  const { items, title } = dictionary?.services || {};
  return (
    <section className="max-w-screen-xl mx-auto min-h-screen py-5 px-5 md:px-0 md:my-10">
      <TitleSection>{title}</TitleSection>
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-10 md:gap-x-6 md:gap-y-20 pb-6">
          {items?.slice(0, 3).map((service, index) => (
            <AnimatedComponent
              key={`${service.link}-${index + 1}`}
              id={service.link}
              once={true}
              threshold={0.4}
              className="flex flex-col scroll-mt-24"
              effect="fade-up"
              delay={index * 0.5}
            >
              <ServiceCard service={service} />
            </AnimatedComponent>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-0 gap-y-10 md:gap-x-6 md:gap-y-20 pb-6">
          {items?.slice(3, 7).map((service, index) => (
            <div key={`${service.link}-${index + 1}`} id={service.link} className={`flex flex-col scroll-mt-28`}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
