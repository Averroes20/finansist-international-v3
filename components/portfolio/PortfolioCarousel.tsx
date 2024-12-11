'use client';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Portfolio } from '@/lib/type/portfolio';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import AnimatedComponent from '../animation/animation-component';

const CarouselPortfolio = ({ portfolioChunks }: { portfolioChunks: Array<Portfolio[]> }) => {
  const plugins = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(1);
  const { dictionary } = useLanguage();
  const { title } = dictionary?.portfolio || {};

  const handleMouseEnter = useCallback(() => plugins.current?.stop(), []);
  const handleMouseLeave = useCallback(() => plugins.current?.play(), []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div>
      <TitleSection className="mb-5">{title}</TitleSection>
      <AnimatedComponent effect="scale" className="flex flex-col">
        <Carousel
          className="w-full max-w-5xl mx-auto"
          opts={{ loop: true }}
          setApi={setApi}
          plugins={[plugins.current]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Portfolio Carousel"
        >
          <CarouselContent>
            {portfolioChunks.map((chunk, chunkIndex) => (
              <CarouselItem key={`portfolio-${chunkIndex + 1}`} className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {chunk.map((item) => (
                    <PortfolioCard key={`portfolio-${item.id}`} item={item} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Previous Slide" className="hidden md:flex" />
          <CarouselNext aria-label="Next Slide" className="hidden md:flex" />
        </Carousel>
        <div className="w-full flex justify-center space-x-2 mt-4">
          {Array.from({ length: portfolioChunks.length }).map((_, idx) => (
            <button
              key={`dot-${idx + 1}`}
              onClick={() => api?.scrollTo(idx)}
              className={`h-2 w-2 rounded-full ${
                current === idx + 1 ? 'bg-gray-950' : 'bg-gray-400'
              } transition-colors duration-300 hover:bg-gray-200`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </AnimatedComponent>
    </div>
  );
};

const PortfolioCard = ({ item }: { item: Portfolio }) => (
  <article className="p-2">
    <header className="flex items-end gap-2 mb-2">
      <Image
        src={item.companyLogo as string}
        alt={item.companyName}
        loading="lazy"
        width={1000}
        height={1000}
        className="w-[60px] md:w-[70px] rounded-full shadow-md"
      />
      <div className="flex gap-1 items-center">
        {item.software
          ? item.software
              ?.split(',')
              .map((logo: string, logoIndex: number) => (
                <Image
                  src={logo}
                  alt={`${item.companyName} Software Logo ${logoIndex}`}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="w-[20px] md:w-[30px] rounded-full shadow-sm"
                  key={`logo-${logoIndex + 1}`}
                />
              ))
          : null}
      </div>
    </header>
    <div>
      <h3 className="font-bold text-lg">{item.companyName}</h3>
      <p className="text-gray-600 text-sm md:text-base mb-2">{item.country}</p>
      <p className="text-sm">{item.description}</p>
    </div>
  </article>
);

export default CarouselPortfolio;
