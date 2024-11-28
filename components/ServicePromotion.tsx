'use client';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const ServicePromotion: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { dictionary } = useLanguage();
  const { title, points, description, tagsLine } = dictionary.financialSupport;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  return (
    <section id="servicePromotion" className="min-h-screen max-w-screen-lg mx-auto px-5 md:px-0 flex items-center relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 pr-6">
          <h1 className="font-santaCatalina text-slate-900 dark:text-white text-center leading-[5rem] text-[2.25rem] md:text-[3rem] ">{title}</h1>
          <ul className="flex flex-col space-y-3 py-4">
            {points.map((item, index) => (
              <li key={index} className="flex text-sm md:text-base">
                <span className="mr-2 text-slate-900 font-bold">✔</span>
                <p className="font-libreBaskerville">
                  <b>{item.title}: </b>
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-base font-libreBaskerville">{description}</p>
          <h2 className="font-santaCatalina text-slate-900 dark:text-white text-right text-[2rem] md:text-[2.25rem]">{tagsLine}</h2>
        </div>
        <div className="flex justify-center items-center md:col-span-1">
          <div className="hidden md:block md:relative md:w-full md:h-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Image
              src={images.Promotion}
              alt="Styled Image"
              className={`w-full h-full absolute object-cover rounded-[30px] transition duration-500 ease-out ${
                isHovered ? 'opacity-0' : 'opacity-1'
              }`}
            />
            <Image
              src={images.PromotionSecond}
              alt="Styled Image"
              className={`w-full h-full absolute object-cover rounded-[30px] transition duration-500 ease-in ${
                isHovered ? 'opacity-1' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePromotion;
