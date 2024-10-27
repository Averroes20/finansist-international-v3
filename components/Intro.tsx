'use client';
import { images } from '@/constants/images';
import Image from 'next/image';
import { memo } from 'react';
import Achievements from './common/AchievementCard';
import ClientSlider from './common/ClientSlide';
import { Whatsapp } from './icons/social-media';
import { TypographyH2, TypographyP } from './ui/typography';
import { Button } from './ui/button';

const Intro = () => {
  return (
    <section id="home" className="pt-3 container max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Image src={images.ImageIntro} alt="intro" width={600} loading="lazy" className="aspect-auto rounded-lg" />
          <div>
            <TypographyP className="font-bold">Certified of :</TypographyP>
            <Image src={images.Certifications} alt="certifications" width={300} loading="lazy" className="aspect-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div>
              <TypographyH2 className="text-4xl font-bold">Don{`'`}t waste your money on extra staff </TypographyH2>
              <TypographyH2 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
                Invest in professional and experts
              </TypographyH2>
            </div>
            <TypographyP className="mt-7">
              <b className="font-bold text-lg">FINANSIST INTERNATIONAL</b> <br /> We save you from hiring extra staff by offering expert financial
              services. Our international certified professionals will handle your bookkeeping, tax compliance, and reporting with precision, ensuring
              cost-effective and seamless results. Invest in expertise, not overhead.
            </TypographyP>
          </div>
          <Achievements />
          <Button className="mt-4 px-4 py-2 flex items-center gap-2 text-sm self-start bg-green-500 text-white hover:bg-green-600 rounded-full">
            <Whatsapp />
            Consult With Us
          </Button>
        </div>
      </div>
      <div className="p-6">
        <TypographyP className="text-sm text-gray-500 text-center leading-5">
          What software that you use? <br />
          We can operate them all!
        </TypographyP>
      </div>
      <div className="overflow-hidden relative">
        <ClientSlider />
      </div>
    </section>
  );
};

export default memo(Intro);
