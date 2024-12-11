'use client';
import { TitleSection } from '@/components/ui/typography';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import AnimatedComponent from './animation/animation-component';

const AboutUs = () => {
  const { dictionary } = useLanguage();
  const { title, aboutCEO } = dictionary?.about || {};

  return (
    <>
      <link rel="preload" href="/images/our-journey.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <link rel="preload" href="/images/image-ceo.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      {/* About us */}
      <section id="about-us" className="container min-h-screen px-5 md:px-0 mx-auto pt-8 scroll-mt-20 bg-white dark:bg-slate-800 card">
        <div className="flex flex-col space-y-4">
          <TitleSection>{title}</TitleSection>
          <Image src={images.OurJourney} alt="Our Journey" className="mx-auto aspect-auto w-full md:w-[65%]" loading="lazy" />
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-row place-items-center md:px-32">
            <AnimatedComponent effect="fade-in-left" className="md:col-span-2 order-2 md:order-1">
              <p data-testid="about-ceo" className="text-center md:text-right text-sm md:text-lg">
                &quot;{aboutCEO}&quot;
              </p>
            </AnimatedComponent>
            <AnimatedComponent
              effect="fade-in-right"
              className="flex flex-col md:col-span-1 items-center gap-2 mb-5 md:mb-0 md:gap-0 order-1 md:order-2"
            >
              <Image
                src={images.ProfileCEO}
                alt="CEO Paksi Boby Haryanto"
                loading="lazy"
                width={300}
                height={300}
                className="mx-auto aspect-auto w-24 md:w-32"
                placeholder="blur"
                quality={75}
              />
              <b>Paksi Boby Haryanto</b>
              <p>CEO</p>
            </AnimatedComponent>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
