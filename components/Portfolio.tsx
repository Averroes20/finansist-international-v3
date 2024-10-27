'use client';

import { portfolio, PortfolioItem } from '@/lib/data/portfolio';
import Image, { StaticImageData } from 'next/image';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { TypographyH2, TypographyH5, TypographyP } from './ui/typography';
import { useCallback, useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const chunkArray = (array: PortfolioItem[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const Portfolio = () => {
  const plugins = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const portfolioChunks = chunkArray(portfolio, 6);

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
      <TypographyH2 className="text-center font-bold mb-5 md:mb-10">Portfolio</TypographyH2>
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
                      <div className="flex items-end gap-1 mb-1">
                        <Image
                          src={item.logoCompany}
                          alt={item.title}
                          loading="lazy"
                          className="w-[70px] md:w-[90px] object-cover rounded-full shadow-md shadow-slate-300"
                        />
                        {item.subLogoCompany &&
                          item.subLogoCompany.map((logo: StaticImageData, logoIndex: number) => (
                            <Image
                              src={logo}
                              alt={item.title}
                              loading="lazy"
                              className="w-[30px] md:w-[40px] object-cover rounded-full shadow-sm shadow-slate-300"
                              key={logoIndex}
                            />
                          ))}
                      </div>
                      <div>
                        <TypographyH5 className="font-bold">{item.title}</TypographyH5>
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
                current === idx + 1 ? 'bg-black' : 'bg-gray-800'
              } transition-colors duration-300 hover:bg-gray-200`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
