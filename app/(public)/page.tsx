import Home from '@/components/Home';
import dynamic from 'next/dynamic';

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  ssr: true,
  loading: () => <p>Loading Portfolio...</p>,
});
const Reviews = dynamic(() => import('@/components/Review'), {
  ssr: true,
  loading: () => <p>Loading Review...</p>,
});

const Blogs = dynamic(() => import('@/components/Blogs'), {
  ssr: true,
  loading: () => <p>Loading Blogs...</p>,
});

const Careers = dynamic(() => import('@/components/Careers'), {
  ssr: true,
  loading: () => <p>Loading Careers...</p>,
});

const ValueCompany = dynamic(() => import('@/components/ValueCompany'), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

const ServicePromotion = dynamic(() => import('@/components/ServicePromotion'), {
  ssr: true,
  loading: () => <p>Loading ...</p>,
});

const ButtonContact = dynamic(() => import('@/components/common/ButtonContact'));

const RootPage = () => {
  return (
    <div className="">
      <Home
        blogs={<Blogs />}
        careers={<Careers />}
        portfolio={<Portfolio />}
        review={<Reviews />}
        valueCompany={<ValueCompany />}
        servicePromotion={<ServicePromotion />}
      />
      <ButtonContact className="fixed bottom-5 right-5 md:hidden" />
    </div>
  );
};

export default RootPage;
