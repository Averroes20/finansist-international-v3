import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PortfolioAdmin = dynamic(() => import('./Portfolio'));

export const metadata: Metadata = {
  title: 'Portfolio | Finansist International',
  description: 'Portfolio of Finansist International',
};

const Portfolio = () => {
  return <PortfolioAdmin />;
};

export default Portfolio;
