'use client';
import { images } from '@/constants/images';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { TitleSection } from './ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import { fadeId } from '@/utils/variants';

const AboutUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { dictionary } = useLanguage();
  const { title, aboutCEO } = dictionary.about;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const planeX = useTransform(scrollYProgress, [0, 1], [0, 1280]);

  return (
    <section ref={ref} id="about-us" className="container min-h-screen mx-auto pt-8 scroll-mt-20 relative">
      <link rel="preload" href="/images/our-journey.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <link rel="preload" href="/images/image-ceo.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <div className="flex flex-col space-y-4">
        <TitleSection>{title}</TitleSection>
        <div
          className="mx-auto w-full md:w-full h-[300px] lg:h-[500px] bg-cover bg-center bg-fixed bg-no-repeat"
          style={{ backgroundImage: `url(/images/our-journey.webp)`, backgroundSize: '55%' }}
        ></div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-row place-items-center md:px-32">
          <motion.p
            variants={fadeId('right', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.2 }}
            className="md:col-span-2 text-center md:text-right text-sm md:text-lg order-2 md:order-1"
          >
            &quot;{aboutCEO}&quot;
          </motion.p>
          <motion.div
            variants={fadeId('left', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col md:col-span-1 items-center gap-2 md:gap-0 order-1 md:order-2"
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
          </motion.div>
        </div>
      </div>
      <motion.div
        style={{
          x: planeX,
          top: '95%',
          left: '0%',
        }}
        className="absolute hidden md:block w-[200px]"
        transition={{
          ease: 'easeInOut',
        }}
      >
        <Image src={'/images/air-plane.webp'} loading="lazy" alt="airplane" width={200} height={200} className="object-contain w-full h-full" />
      </motion.div>
    </section>
  );
};

export default AboutUs;
