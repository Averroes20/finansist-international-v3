import { images } from '@/constants/images';
import Image from 'next/image';
import { TitleSection } from './ui/typography';

const AboutUs = () => {
  return (
    <section id="about-us" className="container max-w-screen-xl mx-auto pt-8 scroll-mt-20">
      <div className="flex flex-col gap-4">
        <TitleSection className="text-center font-dosis text-5xl uppercase tracking-normal">We handle clients from many countries</TitleSection>
        <Image src={images.OurJourney} alt="Our Journey" className="mx-auto aspect-auto" loading="lazy" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-row gap-4 items-center md:px-32 py-10 ">
          <p className="md:col-span-2 text-center md:text-right text-lg order-2 md:order-1  ">
            &quot;For over 10 years, Finansist has grown from a local to an international service company with worldwide clients. We are experts at
            international regulations and utilize technology to offer smooth bookkeeping and tax preparation from anywhere. Our Indonesia-based
            service makes the cost more affordable than other countries with more satisfying results.&quot;
          </p>
          <div className="flex flex-col md:col-span-1 items-center order-1 md:order-2  ">
            <Image
              src={images.ProfileCEO}
              alt="CEO Paksi Boby Haryanto"
              loading="lazy"
              width={300}
              height={300}
              className="mx-auto aspect-auto w-32"
            />
            <b>Paksi Boby Haryanto</b>
            <p>CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
