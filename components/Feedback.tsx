'use client';
import { feedbacks } from '@/lib/data/feedback';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { TypographyH4, TypographyH5, TypographyP } from './ui/typography';

const Feedback = () => {
  const plugins = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

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
    <section className="w-full">
      <div className="flex flex-col justify-end h-[80vh] md:h-[90vh] bg-cover bg-center bg-[url('/images/cover-feedback.jpg')] relative">
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
            {feedbacks.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="items-center justify-center text-white ">
                    <TypographyH4 className="text-center font-normal mb-3">{item.message}</TypographyH4>
                    <TypographyH5 className="text-center">{item.name}</TypographyH5>
                    <TypographyP className="text-center">{item.agency}</TypographyP>
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
    </section>
  );
};

export default Feedback;
