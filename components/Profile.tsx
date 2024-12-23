'use client';
import { useSocialMedia } from '@/context/SocialMediaProvider';
import { lazy, Suspense } from 'react';
import TextScramble from './common/ScrambleText';

const VideoComponent = lazy(() => import('@/components/ui/video'));

const Profile = () => {
  const { data } = useSocialMedia();

  if (!data) {
    return <div>Loading ...</div>;
  }
  return (
    <section id="profile" className="space-y-2 md:space-y-3 min-h-[90vh] flex justify-center items-center bg-[#113870] card">
      {data[6]?.url && <link rel="preconnect" href={data[6]?.url} as="document" />}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto gap-5 md:gap-10">
        <div className="w-full h-full">
          <Suspense fallback={<div>Loading video...</div>}>{data[6]?.url && <VideoComponent link={data[6]?.url} />}</Suspense>
        </div>
        <div className="space-y-2 py-5 md:py-10 md:pr-10 px-5 md:px-0">
          <h1 className="text-3xl md:text-4xl font-santaCatalina text-white">Finansist International</h1>
          <TextScramble />
          <p className="text-base md:text-lg pt-3 md:pt-6 text-white">
            Save your hiring costs with our expert financial services. Our international certified professionals will handle your bookkeeping, tax
            preparation, and reporting with precision for seamless and cost-effective results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
