'use client';
import { lazy, Suspense } from 'react';
import { TitleSection } from '@/components/ui/typography';

const VideoComponent = lazy(() => import('@/components/ui/video'));
const Profile = () => {
  return (
    <section id="profile" className="flex flex-col space-y-3 md:space-y-4 max-w-screen-xl mx-auto md:min-h-screen card">
      <link rel="preconnect" href="https://www.youtube.com/embed/Fo93nnxN8EA?si=jAb9GEe7ziWzw6Z5" as="document" />
      <TitleSection>Profile Company</TitleSection>
      <div className="flex justify-center md:h-[90vh]">
        <Suspense fallback={<div>Loading video...</div>}>
          <VideoComponent />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
