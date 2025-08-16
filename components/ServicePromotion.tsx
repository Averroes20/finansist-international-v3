'use client';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import AnimatedComponent from './animation/animation-component';
import { useEffect, useRef, useState, useMemo } from 'react';
import clsx from 'clsx';

const ServicePromotion: React.FC = () => {
  const [dark, setDark] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { dictionary } = useLanguage();
  const { description = '', title1 = '', title2 = '', title3 = '' } = dictionary?.customerType || {};

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setDark(entry.isIntersecting), { rootMargin: '50% 0px -50% 0px' });
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) observer.observe(currentSectionRef);

    return () => {
      if (currentSectionRef) observer.disconnect();
    };
  }, [setDark]);

  const sectionClasses = useMemo(() => clsx(
    'min-h-[90vh] px-5 md:px-0 flex items-center overflow-hidden',
    'transition-colors duration-500 will-change-colors',
    dark
      ? 'bg-white text-black'
      : 'bg-[rgb(2,14,22)] text-white'
  ), [dark]);

  return (
    <section
      className={sectionClasses}
      ref={sectionRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        <AnimatedComponent
          threshold={0.5}
          once={true}
          effect="fade-in-left"
          className="md:col-span-2 pr-6"
        >
          <Image
            src={images.CustomerType}
            alt="Customer Type Promotion"
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </AnimatedComponent>

        <AnimatedComponent
          threshold={0.5}
          once={true}
          effect="fade-in-right"
          className="flex flex-col justify-center items-center md:col-span-2"
        >
          <h1 className='font-santaCatalina text-center leading-10 md:leading-[5.5rem] text-3xl md:text-5xl font-bold mb-4'>
            {title1} <br /> {title2} <br /> {title3}
          </h1>
          <p className='text-center text-base md:text-lg'>
            {description}
          </p>
        </AnimatedComponent>
      </div>
    </section>
  );
};

export default ServicePromotion;