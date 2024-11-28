import { fetchReviews } from '@/action/review';
import dynamic from 'next/dynamic';

const CarouselReviews = dynamic(() => import('./common/CarouselReview'), { ssr: false });

const Reviews = async () => {
  const reviewPromise = fetchReviews(`page=1`);
  const [reviews] = await Promise.all([reviewPromise]);
  return (
    <section id="review" className="w-full mt-20 md:mt-0">
      <CarouselReviews data={reviews} />
    </section>
  );
};

export default Reviews;
