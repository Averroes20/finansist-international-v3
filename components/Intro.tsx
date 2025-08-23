'use client';
import ProfitAnimated from '@/components/animation/profit-animated';
import SoftwareSlider from '@/components/common/SoftwareSlider';
import { useLanguage } from '@/context/LanguageProvider';
import { BadgeDollarSign, BookText, Gem, LaptopMinimal, Lightbulb, ShieldCheck, ShieldQuestion, UserCheck2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { createElement } from 'react';

const Achievements = dynamic(() => import('@/components/common/AchievementCard'), { ssr: false });

const iconServices = [BookText, BadgeDollarSign, Gem, ShieldCheck, UserCheck2, ShieldQuestion, Lightbulb, LaptopMinimal];

const Intro = () => {
  const { dictionary } = useLanguage();
  const { achievements, certifiedOf, description, softwareTitle, title, subtitle, tagsLine } = dictionary?.intro || {};
  const { items, title: serviceTitle } = dictionary?.services || {};

  return (
    <section>
      <link rel="preload" href="/images/certifications.webp" as="image" type="image/webp" fetchPriority="high" media="(min-width: 1px)" />
      <link rel="preload" href="/animate/profit.lottie" as="fetch" type="application/octet-stream" crossOrigin="anonymous" />
      <div className="flex flex-col px-5 max-w-screen-xl overflow-x-hidden mx-auto my-auto scroll-mt-24 md:px-0 pt-32">
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
              <p className="font-facultyGlyphic font-extrabold text-base md:text-2xl text-[#002654] motion-translate-x-in-[0%] motion-translate-y-in-[50%] motion-opacity-in-[0%] motion-duration-[1.04s] motion-delay-[0.70s]/translate motion-delay-[0.70s]/opacity motion-ease-spring-smooth">
                {description}
              </p>
            </div>
            <div className="space-y-2 mt-4">
              <p className="font-bold font-libreBaskerville text-lg">{certifiedOf} :</p>
              <div className="w-[60%] mx-auto md:mx-0 md:w-[70%] ">
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

          <div className="hidden md:flex md:flex-col my-auto gap-y-4 overflow-hidden motion-translate-x-in-[100%] motion-translate-y-in-[0%] motion-duration-[1.13s] motion-duration-[1.50s]/translate motion-ease-spring-bouncy">
            <ProfitAnimated tagsLine={tagsLine ?? []} />
            <div className="flex flex-row gap-1 justify-center sm:gap-4 md:gap-7">
              <Achievements data={achievements ?? []} />
            </div>
          </div>
          <div className="md:hidden pt-2 pb-4 md:pt-0 md:pb-0">
            <div className="flex flex-col w-full gap-3">
              <p className="font-bold font-libreBaskerville text-lg">{serviceTitle?.split('&')[0]} :</p>
              {items?.map((item, index) => (
                <Link href={`#${item.link}`} key={`${index + 1}-${item.link}`} className="rounded-2xl bg-[#002654]">
                  <div className="flex flex-row p-4 gap-3">
                    <div className="text-sm text-[#ffffff]">
                      {iconServices[index] && createElement(iconServices[index], {
                        className: 'w-5 h-5 text-white text-center'
                      })}
                    </div>
                    <div className="text-sm font-bold text-[#ffffff]">
                      {item.title}
                    </div>
                    <div className="text-sm font-bold text-[#FFFF]">
                      {item.newService ? <span className="px-2 py-1 bg-[#FFD700] rounded-lg">New</span> : ''}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4  mt-auto">
          <p className="text-sm md:text-lg font-libreBaskerville text-black opacity-60 text-center">{softwareTitle}</p>
          <SoftwareSlider />
        </div>
      </div>
    </section>
  );
};

export default Intro;
