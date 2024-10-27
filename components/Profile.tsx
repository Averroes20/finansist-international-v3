import React, { lazy, Suspense } from 'react';
import { TypographyH2 } from './ui/typography';

const VideoComponent = lazy(() => import('./ui/video'));

const Profile = () => {
  return (
    <section className="flex flex-col p-10 gap-4 container max-w-screen-xl mx-auto">
      <TypographyH2 className="font-bold text-center">Profile Company</TypographyH2>
      <div className="flex justify-center w-full">
        <Suspense fallback={<div>Loading video...</div>}>
          <VideoComponent />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
