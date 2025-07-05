import { getPortfolio } from '@/lib/action/portfolio';
import { Portfolio } from '@/lib/type/portfolio';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';

const CarouselPortfolio = dynamic(() => import('@/components/portfolio/PortfolioCarousel'), { ssr: false, loading: () => <p>Loading...</p> });

const chunkArray = (array: Portfolio[], size: number) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) => array.slice(index * size, index * size + size));
};

const Portfolios = async () => {
  const headerlist = headers();
  const userAgent = headerlist.get('user-agent');
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent ?? '');
  const chunk = isMobile ? 4 : 6;
  const portfolio = getPortfolio({ page: 1 });

  const [portfolios] = await Promise.all([portfolio]);

  const chunks = chunkArray(portfolios.data || [], chunk);
  return (
    <section className="max-w-screen-xl min-h-screen mx-auto px-5 md:mt-14 md:px-0">
      <CarouselPortfolio portfolioChunks={chunks} />
    </section>
  );
};

export default Portfolios;
