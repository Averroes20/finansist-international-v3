import Intro from '@/components/Intro';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Profile = dynamic(() => import('@/components/Profile'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});

const AboutUs = dynamic(() => import('@/components/AboutUs'), {
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
  ssr: true,
  loading: () => <p>Loading Services...</p>,
});

const ValueCompany = dynamic(() => import('@/components/ValueCompany'), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

const ServicePromotion = dynamic(() => import('@/components/ServicePromotion'), {
  ssr: true,
  loading: () => <p>Loading ...</p>,
});

const Blogs = dynamic(() => import('@/components/Blogs'), {
  ssr: true,
  loading: () => <p>Loading Blogs...</p>,
});

const Careers = dynamic(() => import('@/components/Careers'), {
  ssr: true,
  loading: () => <p>Loading Careers...</p>,
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  ssr: true,
  loading: () => <p>Loading FAQ...</p>,
});

const ButtonContact = dynamic(() => import('@/components/common/ButtonContact'));

const RootPage = () => {
  return (
    <>
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
        <Reviews />
        <Portfolio />
        <Blogs />
        <Careers />
        <FAQ />
      </Suspense>
      <ButtonContact className="fixed bottom-5 right-5 md:hidden" title="Free Consultation" />
    </>
  );
};

export default RootPage;
