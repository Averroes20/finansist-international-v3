import AboutUs from '@/components/AboutUs';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Intro = dynamic(() => import('@/components/Intro'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});

const Profile = dynamic(() => import('@/components/Profile'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});

const Reviews = dynamic(() => import('@/components/Review'), {
  ssr: true,
  loading: () => <p>Loading Review...</p>,
});

const Services = dynamic(() => import('@/components/Services'), {
  ssr: false,
  loading: () => <p>Loading Services...</p>,
});

const Blogs = dynamic(() => import('@/components/Blogs'), {
  ssr: true,
  loading: () => <p>Loading Blogs...</p>,
});

const Careers = dynamic(() => import('@/components/Careers'), {
  ssr: false,
  loading: () => <p>Loading Careers...</p>,
});

const ValueCompany = dynamic(() => import('@/components/ValueCompany'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const ServicePromotion = dynamic(() => import('@/components/ServicePromotion'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const ButtonContact = dynamic(() => import('@/components/common/ButtonContact'));

const RootPage = () => {
  return (
    <main>
      <Suspense fallback={<p>Loading ...</p>}>
        <Intro />
        <Profile />
        <AboutUs />
      </Suspense>

      <Suspense fallback={<p>Loading ...</p>}>
        <ServicePromotion />
        <ValueCompany />
        <Services />
      </Suspense>

      <Suspense fallback={<p>Loading ...</p>}>
        <Portfolio />
        <Reviews />
        <Blogs />
        <Careers />
      </Suspense>
      <ButtonContact className="fixed bottom-5 right-5 md:hidden" title="Free Consultation" />
    </main>
  );
};

export default RootPage;
