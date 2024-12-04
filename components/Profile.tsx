'use client';
import { lazy, Suspense } from 'react';
import { TitleSection } from '@/components/ui/typography';

const VideoComponent = lazy(() => import('@/components/ui/video'));
const Profile = () => {
  return (
    <section className="flex flex-col space-y-3 md:space-y-4 max-w-screen-xl mx-auto">
      <TitleSection>Profile Company</TitleSection>
      <div className="flex justify-center  ">
        <Suspense fallback={<div>Loading video...</div>}>
          <VideoComponent />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
