import { lazy, Suspense } from 'react';
import { TitleSection } from './ui/typography';

const VideoComponent = lazy(() => import('./ui/video'));

const Profile = () => {
  return (
    <section className="flex flex-col gap-4 container max-w-screen-xl mx-auto">
      <TitleSection className="text-center font-dosis text-5xl uppercase tracking-normal">Profile Company</TitleSection>
      <div className="flex justify-center w-full">
        <Suspense fallback={<div>Loading video...</div>}>
          <VideoComponent />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
