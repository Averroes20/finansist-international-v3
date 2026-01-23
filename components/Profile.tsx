'use client';
import { useSocialMedia } from '@/context/SocialMediaProvider';
import { lazy, Suspense } from 'react';
import TextScramble from '@/components/common/ScrambleText';
import { useLanguage } from '@/context/LanguageProvider';
import { Droplet, Target, Wallet } from 'lucide-react';
import Image from 'next/image';

const VideoComponent = lazy(() => import('@/components/ui/video'));


const iconMap = {
  target: <Target size={20} />,
  wallet: <Wallet size={20} />,
  droplet: <Droplet size={20} />
};

const Profile = () => {
  const { data } = useSocialMedia();
  const { dictionary} = useLanguage();
  const { description, tagsLine } = dictionary?.whyFinansist || {};
  const linkVideo = data.find((item) => item.id === 1 && item.active);
  return (
    <section className="relative pt-24 pb-28">
      <div className='absolute top-1 left-0 w-full'>
        <div className="h-24 relative border-b border-b-[#113870]" aria-label="wave">
          <Image src="/waves/wave-up.svg" alt="Layer 1" fill className="object-cover absolute bottom-2" />
        </div>
      </div>
      <div className="space-y-2 md:space-y-3 flex justify-center items-center bg-[#113870] -pt-5">
        {linkVideo?.url && <link rel="preconnect" href={linkVideo.url} as="document" />}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto gap-5 md:gap-10">
          <div className="w-full h-full flex justify-center items-center pt-4 md:pt-0">
            <Suspense fallback={<div>Loading video...</div>}>{linkVideo?.url && <VideoComponent link={linkVideo.url} />}</Suspense>
          </div>
          <div className="space-y-2 py-5 md:py-10 md:pr-10 px-5 md:px-0">
            <h1 className="font-dosis text-2xl md:text-5xl text-white font-bold">{tagsLine?.part0}</h1>
            <TextScramble firstWord={tagsLine?.part1 ?? ''} words={tagsLine?.part2 ?? []} />
            <ul>
              {description &&
                description.map((item, index) => (
                  <li key={index} className="text-base font-dosis md:text-lg pt-3 md:pt-4 text-white flex">
                    <span className='mr-2 pt-2'>
                      {iconMap[item.icon as keyof typeof iconMap]}
                    </span>
                    <p>
                      <span className="font-bold text-base md:text-2xl">{item.subtitle}</span>
                      <p>{item.description}</p>
                    </p>
                  </li>
                ))}
            </ul>
            {/* <div className="flex justify-center md:justify-center w-full pt-3"> */}
              {/* <ButtonContact className="text-sm md:text-xl px-10 py-2" title={lang === 'en' ? "Book for Consultation" : "Pesan untuk Konsultasi"} showIcon={false} /> */}
              {/* <ButtonContact title="Book for Consultation" className="items-center font-dosis font-bold" showIcon={false} /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className='absolute bottom-1 left-0 w-full'>
        <div className="h-28 relative border-t border-[#113870]" style={{ background: '#' }} aria-label="wave">
          <Image src="/waves/wave-down.svg" alt="Layer 2" fill loading='lazy' className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Profile;
