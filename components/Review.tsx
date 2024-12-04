import { getReviews } from '@/lib/action/review';
import dynamic from 'next/dynamic';

const CarouselReviews = dynamic(() => import('@/components/review/CarouselReview'), { ssr: false });

const Reviews = async () => {
  const reviewPromise = getReviews({ page: 1 });
  const [reviews] = await Promise.all([reviewPromise]);
  return (
    <section id="review" className="w-full mt-20 md:mt-0">
      <CarouselReviews data={reviews} />
    </section>
  );
};

export default Reviews;
