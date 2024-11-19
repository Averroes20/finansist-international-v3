import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PageReview = dynamic(() => import('./Review'));

export const metadata: Metadata = {
  title: 'Review | Finansist International',
  description: 'Review of Finansist International',
};

const Review = () => {
  return <PageReview />;
};

export default Review;
