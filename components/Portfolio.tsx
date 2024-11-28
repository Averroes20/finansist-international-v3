import { fetchPortfolios } from '@/action/portfolio';
import { Portfolio } from '@/lib/type/portfolio';
import dynamic from 'next/dynamic';

const CarouselPortfolio = dynamic(() => import('./common/CarouselPortfolio'), { ssr: false, loading: () => <p>Loading...</p> });

const chunkArray = (array: Portfolio[], size: number) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) => array.slice(index * size, index * size + size));
};

const Portfolios = async () => {
  const portfolio = fetchPortfolios(`page=1`);

  const [portfolios] = await Promise.all([portfolio]);

  const chunks = chunkArray(portfolios.data || [], 6);
  return (
    <section className="max-w-screen-lg min-h-screen grid place-items-center mx-auto px-5 mt-20 md:mt-0 md:px-0">
      <CarouselPortfolio portfolioChunks={chunks} />
    </section>
  );
};

export default Portfolios;
