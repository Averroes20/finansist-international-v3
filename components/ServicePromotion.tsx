'use client';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import AnimatedComponent from './animation/animation-component';

const ServicePromotion: React.FC = () => {
  const { dictionary } = useLanguage();
  const { description, title } = dictionary?.customerType || {};
  return (
    <>
      <div className='h-10 bg-gradient-to-b from-white to-slate-100 dark:from-[rgb(2,14,22)] dark:to-[rgb(2,14,22)]' />
      <section className="min-h-[90vh] px-5 md:px-0 flex items-center overflow-hidden bg-slate-100 dark:bg-[rgb(2,14,22)] dark:text-white dark:transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
          <AnimatedComponent threshold={0.5} once={true} effect="fade-in-left" className="md:col-span-2 pr-6">
            <Image src={images.CustomerType} alt="Promotion" className="w-full h-full object-cover" loading="lazy" />
          </AnimatedComponent>
          <AnimatedComponent threshold={0.5} once={true} effect="fade-in-right" className="flex flex-col justify-center items-center md:col-span-2">
            <h1 className='font-santaCatalina text-slate-900 dark:text-white text-center leading-10 md:leading-[5.5rem] text-3xl md:text-5xl font-bold mb-4'>{title}</h1>
            <p className='text-center text-base md:text-lg'>
              {description}
            </p>
          </AnimatedComponent>
        </div>
      </section>
    </>
  );
};

export default ServicePromotion;
