import { fetchPortfolios } from '@/action/portfolio';
import { Portfolio } from '@/lib/type/portfolio';
import dynamic from 'next/dynamic';

const CarouselPortfolio = dynamic(() => import('./common/CarouselPortfolio'));

const Portfolios = async () => {
  const data = await fetchPortfolios(`page=1`);
  const chunkArray = (array: Portfolio[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  const chunks = chunkArray(data.data || [], 6);
  return <CarouselPortfolio portfolioChunks={chunks} />;
};

export default Portfolios;
