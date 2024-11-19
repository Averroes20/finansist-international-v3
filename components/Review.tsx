import { Review } from '@/lib/type/review';
import dynamic from 'next/dynamic';

const CarouselReviews = dynamic(() => import('./common/CarouselReview'));

const fetchReviews = async (): Promise<Review[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
      cache: 'force-cache',
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Reviews = async () => {
  const reviews = await fetchReviews();
  return <CarouselReviews reviews={reviews} />;
};

export default Reviews;
