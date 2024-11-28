'use client';
import { useLanguage } from '@/context/LanguageProvider';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo } from 'react';

const ProfitAnimated = dynamic(() => import('./animation/profit-animated'), { ssr: false });
const Achievements = dynamic(() => import('./common/AchievementCard'), { ssr: false });
const SoftwareSlider = dynamic(() => import('./common/SoftwareSlider'), { ssr: false });

const Intro = () => {
  const { dictionary } = useLanguage();
  const { achievements, certifiedOf, description, softwareTitle, title, subtitle } = dictionary.intro;
  return (
    <section id="home" className="pt-5 px-5 max-w-screen-xl mx-auto my-auto min-h-screen scroll-mt-20 md:px-0 md:pt-8">
      <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-libreBaskerville text-4xl md:leading-tight md:text-5xl text-slate-800">
            <span>{title.part1}</span> <span className="font-bold">{title.part2}</span> <span>{title.part3}</span>
          </h1>
          <span className="font-santaCatalina font-normal py-4 text-slate-800 text-4xl md:text-6xl">{subtitle}</span>
          <div className="mt-3 space-y-2">
            <p className="font-bold font-libreBaskerville text-base">{certifiedOf} :</p>
            <div className="w-[60%] md:w-[80%]">
              <Image
                src={'/images/certifications.webp'}
                alt="certifications"
                width={1000}
                height={1000}
                className="w-full h-full object-contain motion-scale-in-[0.26] motion-blur-in-[30px]"
                priority
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <ProfitAnimated />
          <p className="font-libreBaskerville font-bold text-xl md:text-2xl text-center tracking-wide text-[#10376E]">{description}</p>
          <div className="flex flex-row gap-1 justify-center mt-4 sm:gap-4 md:gap-7">
            <Achievements data={achievements} />
          </div>
        </div>
      </div>
      <div className="py-6 space-y-4">
        <h6 className="text-sm text-gray-500 text-center font-libreBaskerville">{softwareTitle}</h6>
        <SoftwareSlider />
      </div>
    </section>
  );
};

export default memo(Intro);
