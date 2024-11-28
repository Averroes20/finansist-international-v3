import { lazy, Suspense } from 'react';
import { TitleSection } from './ui/typography';

const VideoComponent = lazy(() => import('./ui/video'));

const Profile = () => {
  return (
    <section className="flex flex-col gap-y-3 md:gap-y-4 container max-w-screen-xl min-h-screen mx-auto">
      <TitleSection>Profile Company</TitleSection>
      <div className="flex justify-center w-full min-h-[75vh] ">
        <Suspense fallback={<div>Loading video...</div>}>
          <VideoComponent />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
