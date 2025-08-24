'use client';
import { TitleSection } from '@/components/ui/typography';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import AnimatedComponent from '@/components/animation/animation-component';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

const AboutUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false)
  const { dictionary } = useLanguage();
  const { title, aboutCEO } = dictionary?.about || {};

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setDark(entry.isIntersecting), { rootMargin: '-50% 0px 50% 0px' });
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) observer.observe(currentSectionRef);

    return () => {
      if (currentSectionRef) observer.disconnect();
    };
  }, [setDark]);

  const sectionClasses = useMemo(() => clsx(
    'min-h-[90vh] md:min-h-screen px-5 md:px-0 flex items-center overflow-hidden',
    'transition-colors duration-500 will-change-colors',
    dark ? 'bg-white text-black' : 'bg-[rgb(2,14,22)] text-white'

  ), [dark]);

  return (
    <>
      <link rel="preload" href="/images/our-journey.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <link rel="preload" href="/images/image-ceo.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <section id="about-us" className={sectionClasses} ref={sectionRef}>
        <div className="flex flex-col space-y-4 container px-5 md:px-0 mx-auto">
          <TitleSection className="text-center max-w-screen-lg mx-auto">{title}</TitleSection>
          <Image src={images.OurJourney} alt="Our Journey" className="mx-auto aspect-auto w-full md:w-[55%]" loading="lazy" />
          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-flow-row gap-5 md:gap-0 md:px-32">
            <AnimatedComponent threshold={0.5} once={true} effect="fade-in-left" className="mt-5 md:mt-0 md:col-span-5 md:items-center md:justify-center md:content-center">
              <p data-testid="about-ceo" className="text-left md:text-right text-sm md:text-lg font-facultyGlyphic">
                &quot;{aboutCEO}&quot;
              </p>
            </AnimatedComponent>
            <AnimatedComponent
              threshold={0.5}
              once={true}
              effect="fade-in-right"
              className="flex flex-col md:col-span-1 items-center gap-2 gap-y-2 mt-5 md:mt-0 md:mb-0 md:gap-0 md:justify-self-start md:ml-5"
            >
              <Image
                src={images.ProfileCEO}
                alt="CEO Paksi Boby Haryanto"
                loading="lazy"
                width={300}
                height={300}
                className="mx-auto aspect-auto w-24 md:w-20 mb-2"
                placeholder="blur"
                quality={75}
              />
              <b className='text-base md:text-sm'>Paksi Boby Haryanto</b>
              <p className='text-base md:text-sm'>CEO</p>
            </AnimatedComponent>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
