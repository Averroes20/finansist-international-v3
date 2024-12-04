import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PortfolioAdmin = dynamic(() => import('@/app/(private)/admin/portfolio/Portfolio'));

export const metadata: Metadata = {
  title: 'Portfolio | Finansist International',
  description: 'Portfolio of Finansist International',
};

const Portfolio = () => {
  return (
    <main>
      <PortfolioAdmin />
    </main>
  );
};

export default Portfolio;
