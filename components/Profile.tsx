'use client';
import { useSocialMedia } from '@/context/SocialMediaProvider';
import { lazy, Suspense } from 'react';
import TextScramble from '@/components/common/ScrambleText';
import { useLanguage } from '@/context/LanguageProvider';
import ButtonContact from '@/components/common/ButtonContact';

const VideoComponent = lazy(() => import('@/components/ui/video'));

const Profile = () => {
  const { data } = useSocialMedia();
  const { dictionary } = useLanguage();
  const { description, tagsLine } = dictionary?.whyFinansist || {};
  const linkVideo = data.find((item) => item.id === 1 && item.active);
  return (
    <section id="why-finansist" className="space-y-2 md:space-y-3 flex justify-center items-center bg-[#113870]">
      {linkVideo?.url && <link rel="preconnect" href={linkVideo.url} as="document" />}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto gap-5 md:gap-10">
        <div className="w-full h-full flex justify-center items-center">
          <Suspense fallback={<div>Loading video...</div>}>{linkVideo?.url && <VideoComponent link={linkVideo.url} />}</Suspense>
        </div>
        <div className="space-y-2 py-5 md:py-10 md:pr-10 px-5 md:px-0">
          <h1 className="text-3xl md:text-5xl text-white font-bold">Finansist International</h1>
          <TextScramble words={tagsLine?.part2 ?? []} />
          <ul>
            {description &&
              description.map((item, index) => (
                <li key={index} className="text-base md:text-lg pt-3 md:pt-4 text-white">
                  <span className="font-bold text-base md:text-lg">✦ {item.subtitle}</span>
                  <p>{item.description}</p>
                </li>
              ))}
          </ul>
          <div className="flex justify-center md:justify-center w-full pt-3">
            <ButtonContact title="Book for Consultation" className="items-center" showIcon={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
