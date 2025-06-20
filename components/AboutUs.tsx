'use client';
import { TitleSection } from '@/components/ui/typography';
import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import AnimatedComponent from '@/components/animation/animation-component';

const AboutUs = () => {
  const { dictionary } = useLanguage();
  const { title, aboutCEO } = dictionary?.about || {};

  return (
    <>
      <link rel="preload" href="/images/our-journey.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <link rel="preload" href="/images/image-ceo.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      {/* About us */}
      <section id="about-us" className="scroll-mt-20 bg-white dark:bg-slate-800">
        <div className="h-24 relative" aria-label="wave">
          <Image src="/waves/wave-down.svg" alt="Layer 1" fill className="object-cover" />
        </div>
        <div className="flex flex-col space-y-4 container px-5 md:px-0 mx-auto">
          <TitleSection className="text-center max-w-screen-lg mx-auto">{title}</TitleSection>
          <Image src={images.OurJourney} alt="Our Journey" className="mx-auto aspect-auto w-full md:w-[55%]" loading="lazy" />
          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-flow-row gap-5 md:gap-0 md:px-32">
            <AnimatedComponent threshold={0.5} once={true} effect="fade-in-left" className="md:col-span-5">
              <p data-testid="about-ceo" className="text-center md:text-right text-sm md:text-lg font-facultyGlyphic">
                &quot;{aboutCEO}&quot;
              </p>
            </AnimatedComponent>
            <AnimatedComponent
              threshold={0.5}
              once={true}
              effect="fade-in-right"
              className="flex flex-col md:col-span-1 items-center gap-2 gap-y-2 md:mb-0 md:gap-0 md:justify-self-center md:ml-10"
            >
              <Image
                src={images.ProfileCEO}
                alt="CEO Paksi Boby Haryanto"
                loading="lazy"
                width={300}
                height={300}
                className="mx-auto aspect-auto w-24 md:w-24 mb-2"
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
