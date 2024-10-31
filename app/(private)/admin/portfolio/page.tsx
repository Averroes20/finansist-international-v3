import PortfolioAdmin from '@/pages/admin/Portfolio';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Portfolio | Finansist International',
  description: 'Portfolio of Finansist International',
};

const Portfolio = () => {
  return <PortfolioAdmin />;
};

export default Portfolio;
