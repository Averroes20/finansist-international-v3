'use client';
import { useLanguage } from '@/context/LanguageProvider';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo } from 'react';
import SoftwareSlider from '@/components/common/SoftwareSlider';
import ProfitAnimated from '@/components/animation/profit-animated';

const Achievements = dynamic(() => import('@/components/common/AchievementCard'), { ssr: false });

const Intro = () => {
  const { dictionary } = useLanguage();
  const { achievements, certifiedOf, description, softwareTitle, title, subtitle } = dictionary?.intro || {};

  return (
    <section>
      <link rel="preload" href="/images/certifications.webp" as="image" type="image/webp" fetchPriority="high" media="(min-width: 1px)" />
      <link rel="preload" href="/animate/profit.lottie" as="fetch" type="application/octet-stream" crossOrigin="anonymous" />
      <div className="flex flex-col px-5 max-w-screen-xl overflow-x-hidden mx-auto my-auto scroll-mt-24 md:px-0 pt-36">
        <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2 overflow-hidden">
          <div className="">
            <div className="space-y-4">
              <h1 className="font-libreBaskerville text-4xl md:leading-tight md:text-5xl text-[#002654] motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-opacity-in-[50%] motion-duration-[1.50s] motion-duration-[2.00s]/translate motion-duration-[1.98s]/opacity motion-ease-spring-bouncier">
                <span>{title?.part1}</span> <span className="font-bold">{title?.part2}</span> <span>{title?.part3}</span>
              </h1>
              <h1>
                <span className="font-santaCatalina font-normal block py-6 text-[#002654] text-4xl md:text-6xl motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-opacity-in-[0%] motion-duration-[1.04s] motion-delay-[0.50s]/translate motion-delay-[0.50s]/opacity motion-ease-spring-smooth">
                  {subtitle}
                </span>
              </h1>
              <p className="font-facultyGlyphic font-extrabold text-lg md:text-2xl text-[#002654] motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-opacity-in-[0%] motion-duration-[1.04s] motion-delay-[0.70s]/translate motion-delay-[0.70s]/opacity motion-ease-spring-smooth">
                {description}
              </p>
            </div>
            <div className="space-y-2 mt-4">
              <p className="font-bold font-libreBaskerville text-lg">{certifiedOf} :</p>
              <div className="w-[60%] md:w-[70%] ">
                <Image
                  src="/images/certifications.webp"
                  alt="certifications"
                  width={1000}
                  height={1000}
                  blurDataURL="/images/certifications.webp"
                  placeholder="blur"
                  className="w-full h-full object-contain motion-preset-pop "
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col my-auto gap-y-4 overflow-hidden motion-translate-x-in-[100%] motion-translate-y-in-[0%] motion-duration-[1.13s] motion-duration-[1.50s]/translate motion-ease-spring-bouncy">
            <ProfitAnimated />
            <div className="flex flex-row gap-1 justify-center sm:gap-4 md:gap-7">
              <Achievements data={achievements || []} />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 pt-8 mt-auto">
          <p className="text-base font-libreBaskerville text-black opacity-60 text-center">{softwareTitle}</p>
          <SoftwareSlider />
        </div>
      </div>
      <div className="h-24 relative" aria-label="wave">
        <Image src="/waves/wave-up.svg" alt="Layer 1" fill priority className="object-cover absolute bottom-2" />
      </div>
    </section>
  );
};

export default memo(Intro);
