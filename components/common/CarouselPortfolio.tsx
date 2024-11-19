'use client';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { TitleSection, TypographyH5, TypographyP } from '@/components/ui/typography';
import { Portfolio } from '@/lib/type/portfolio';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const CarouselPortfolio = ({ portfolioChunks }: { portfolioChunks: Array<Portfolio[]> }) => {
  const plugins = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(portfolioChunks.length);

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
    <section className="max-w-screen-lg mx-auto pt-10 md:pt-20">
      <TitleSection>Portfolio</TitleSection>
      <div className="flex flex-col">
        <Carousel
          className="w-full max-w-5xl mx-auto"
          opts={{ loop: true }}
          setApi={setApi}
          plugins={[plugins.current]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent>
            {portfolioChunks.map((chunk, chunkIndex) => (
              <CarouselItem key={chunkIndex} className="w-full">
                <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-4">
                  {chunk.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-2">
                      <div className="flex items-end gap-2 mb-1">
                        <Image
                          src={item.companyLogo as string}
                          alt={item.companyName}
                          loading="lazy"
                          width={40}
                          height={40}
                          className="w-[60px] md:w-[70px] rounded-full shadow-md shadow-slate-300"
                        />
                        {item.software &&
                          item.software
                            .split(',')
                            .map((logo: string, logoIndex: number) => (
                              <Image
                                src={logo}
                                alt={`${logo} + ${item.companyName} + ${logoIndex}`}
                                loading="lazy"
                                width={30}
                                height={30}
                                className="w-[20px] md:w-[30px] rounded-full object-center shadow-sm shadow-slate-300"
                                key={logoIndex}
                              />
                            ))}
                      </div>
                      <div className="mt-2">
                        <TypographyH5 className="font-bold">{item.companyName}</TypographyH5>
                        <TypographyP className="text-gray-600 text-sm md:text-base mb-2">{item.country}</TypographyP>
                        <p className="text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>
                  ))}
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
                current === idx + 1 ? 'bg-gray-950' : 'bg-gray-500'
              } transition-colors duration-300 hover:bg-gray-200`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselPortfolio;
