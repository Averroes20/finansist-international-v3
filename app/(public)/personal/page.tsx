export const dynamic = 'force-dynamic'
import IntroPersonal from '@/components/IntroPersonal';
import nextDynamic from 'next/dynamic';
import { Suspense } from 'react';

const Profile = nextDynamic(() => import('@/components/Profile'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});

const AboutUs = nextDynamic(() => import('@/components/AboutUs'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});

const Portfolio = nextDynamic(() => import('@/components/Portfolio'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});

const Reviews = nextDynamic(() => import('@/components/Review'), {
  ssr: true,
  loading: () => <p>Loading Review...</p>,
});

const Services = nextDynamic(() => import('@/components/Services'), {
  ssr: false,
  loading: () => <p>Loading Services...</p>,
});

const ValueCompany = nextDynamic(() => import('@/components/ValueCompany'), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

const ServicePromotion = nextDynamic(() => import('@/components/ServicePromotion'), {
  ssr: true,
  loading: () => <p>Loading ...</p>,
});

const Blogs = nextDynamic(() => import('@/components/Blogs'), {
  ssr: true,
  loading: () => <p>Loading Blogs...</p>,
});

const Careers = nextDynamic(() => import('@/components/Careers'), {
  ssr: true,
  loading: () => <p>Loading Careers...</p>,
});

const FAQ = nextDynamic(() => import('@/components/FAQ'), {
  ssr: true,
  loading: () => <p>Loading FAQ...</p>,
});

const ButtonContact = nextDynamic(() => import('@/components/common/ButtonContact'));

const RootPage = () => {
  return (
    <>
      <Suspense fallback={<p>Loading ...</p>}>
        <IntroPersonal />
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
        <Careers />
        <Blogs />
        <FAQ />
      </Suspense>
      <ButtonContact className="fixed bottom-5 right-5 md:hidden z-[999]" title="Free Consultation" />
    </>
  );
};

export default RootPage;
