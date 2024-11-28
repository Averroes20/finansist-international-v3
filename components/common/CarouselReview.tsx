'use client';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ReviewListResponse } from '@/lib/type/review';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Quote } from '../icons/social-media';

type Props = {
  data: ReviewListResponse;
};

const CarouselReviews: React.FC<Props> = ({ data }: Props) => {
  const plugins = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(data.meta.totalCount);

  const handleMouseEnter = useCallback(() => {
    plugins.current?.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    plugins.current?.play();
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col justify-end h-[50vh] md:h-[50vh] bg-cover bg-center bg-[url('/images/cover-review.webp')] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
      <Carousel
        className="w-full max-w-5xl mx-auto"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[plugins.current]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselContent>
          {data.data.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="items-center justify-center text-white ">
                  <span className="flex justify-center">
                    <Quote className="text-blue-900" />
                  </span>
                  <h4 className="text-base tracking-tight text-center font-normal mb-3 md:text-xl">{item.review}</h4>
                  <h5 className="text-sm font-semibold tracking-tight text-center md:text-lg">{item.name}</h5>
                  <p className="text-center">{item.company}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex " />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      <div className="w-full flex justify-center space-x-2 mb-10 md:mb-16 z-10">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              current === idx + 1 ? 'bg-white' : 'bg-gray-400'
            } transition-colors duration-300 hover:bg-gray-200`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselReviews;
