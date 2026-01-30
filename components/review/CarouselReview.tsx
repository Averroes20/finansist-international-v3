'use client';
import { Quote } from '@/components/icons/social-media';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ReviewListResponse } from '@/lib/type/review';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  data: ReviewListResponse;
};

const CarouselReviews: React.FC<Props> = ({ data }: Props) => {
  const plugins = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(data.meta.totalCount);

  const handleMouseEnter = useCallback(() => {plugins.current?.stop();}, []);
  const handleMouseLeave = useCallback(() => {plugins.current?.play();}, []);

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
    <div className="flex flex-col justify-end h-[50vh] bg-cover bg-center relative">
      <link rel="preload" href="/images/cover-review.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <Image
        src="/images/cover-review.webp"
        alt="Cover Review"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full object-cover "
      />
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
          {data.data.map((item) => (
            <CarouselItem key={item.id}>
              <div className="p-1">
                <div className="items-center justify-center text-white">
                  <span className="flex justify-center">
                    <Quote className="text-blue-400" />
                  </span>
                  <p className="text-lg tracking-tight text-center font-normal md:text-xl">{item.review}</p>
                  <div className="py-4 space-y-1">
                    <h1 className="text-base font-semibold tracking-tight text-center md:text-lg">{item.name}</h1>
                    <h5 className="text-lg text-center">{item.company}</h5>
                    <h6 className="text-base text-center">{item.country}</h6>
                  </div>
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
          <button
            key={`dot-${idx + 1}`}
            onClick={() => api?.scrollTo(idx)}
            className={clsx(
              `h-2 w-2 rounded-full cursor-pointer `,
              current === idx + 1 ? 'bg-white' : 'bg-gray-400',
              ` transition-colors duration-300 hover:bg-gray-200`
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(CarouselReviews);
