import { fetchReviews } from '@/action/review';
import dynamic from 'next/dynamic';

const CarouselReviews = dynamic(() => import('./common/CarouselReview'));

const Reviews = async () => {
  const data = await fetchReviews(`page=1`);
  return <CarouselReviews data={data || { data: [], meta: { page: 0, limit: 0, totalPages: 0, totalCount: 0 } }} />;
};

export default Reviews;
