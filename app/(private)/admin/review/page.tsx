import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PageReview = dynamic(() => import('@/app/(private)/admin/review/Review'));

export const metadata: Metadata = {
  title: 'Review | Finansist International',
  description: 'Review of Finansist International',
};

const Review = () => {
  return (
    <main>
      <PageReview />
    </main>
  );
};

export default Review;
