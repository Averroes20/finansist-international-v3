import { feedbacks } from '@/lib/data/feedback';
import dynamic from 'next/dynamic';

const CarouselReviews = dynamic(() => import('./common/CarouselReview'));

const Reviews = async () => {
  return <CarouselReviews reviews={feedbacks} />;
};

export default Reviews;
