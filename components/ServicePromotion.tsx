'use client';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import AnimatedComponent from './animation/animation-component';

const ServicePromotion: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { dictionary } = useLanguage();
  const { title, points, description, tagsLine } = dictionary?.financialSupport || {};

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  return (
    <section id="servicePromotion" className="min-h-[90vh] max-w-screen-lg mx-auto px-5 md:px-0 flex items-center overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 pr-6">
          <AnimatedComponent className="pb-4" once={true}>
            <h1 className="font-santaCatalina text-slate-900 dark:text-white text-center leading-[5rem] text-[2.25rem] md:text-[3rem] font-bold">
              {title}
            </h1>
          </AnimatedComponent>
          <AnimatedComponent effect="fade-in-left" once={true} className="flex flex-col space-y-3 py-4">
            <ul>
              {points?.map((item, index) => (
                <li key={`${index + 1}-${item.title}`} className="flex text-sm md:text-base">
                  <span className="mr-2 text-slate-900 dark:text-white">✔</span>
                  <p className="font-libreBaskerville">
                    <b>{item.title}: </b>
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-base font-libreBaskerville">{description}</p>
          </AnimatedComponent>
          <AnimatedComponent effect="fade-in-bottom" once={true}>
            <h2 className="font-santaCatalina text-slate-900 dark:text-white text-right text-[2.25rem] md:text-[3rem] font-bold">{tagsLine}</h2>
          </AnimatedComponent>
        </div>
        <div className="flex justify-center items-center md:col-span-1">
          <AnimatedComponent
            once={true}
            effect="scale"
            className="hidden md:block md:relative md:w-full md:h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={images.Promotion}
              alt="Styled Image"
              className={clsx(
                `w-full h-full absolute object-cover rounded-[30px] transition duration-500 ease-out`,
                isHovered ? 'opacity-0' : 'opacity-1'
              )}
            />
            <Image
              src={images.PromotionSecond}
              alt="Styled Image"
              className={clsx(
                `w-full h-full absolute object-cover rounded-[30px] transition duration-500 ease-in`,
                isHovered ? 'opacity-1' : 'opacity-0'
              )}
            />
          </AnimatedComponent>
        </div>
      </div>
    </section>
  );
};

export default ServicePromotion;
