'use client';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Portfolio } from '@/lib/type/portfolio';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { TitleSection } from '@/components/ui/typography';
import { useLanguage } from '@/context/LanguageProvider';
import AnimatedComponent from '../animation/animation-component';
import { software } from '@/lib/data/intro';

type PortfolioCarouselProps = {
  portfolioChunks: Array<Portfolio[]>;
};

const CarouselPortfolio: React.FC<PortfolioCarouselProps> = ({ portfolioChunks }) => {
  const plugins = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState<number>(1);
  const { dictionary } = useLanguage();
  const { title } = dictionary?.portfolio || {};
  const { softwareTitle } = dictionary?.intro || {};

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
      <AnimatedComponent effect="fade-up" once={true} className="flex flex-col">
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
              className={`h-2 w-2 rounded-full ${current === idx + 1 ? 'bg-gray-950' : 'bg-gray-400'
                } transition-colors duration-300 hover:bg-gray-200`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </AnimatedComponent>
      <div className='md:mx-5 md:space-x-2 mt-14'>
        <p className="text-sm md:text-lg font-libreBaskerville text-black text-center mb-4">{softwareTitle}</p>
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-center min-w-fit md:flex-wrap justify-center">
          {software.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex flex-row items-center min-w-fit md:mx-5 space-x-2 p-3">
              <Image src={item.value} alt={item.label} width={1000} height={1000} className="w-[40px] md:w-[50px] border-0 object-contain" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PortfolioCard: React.FC<{ item: Portfolio }> = memo(({ item }) => (
  <article className="p-2">
    <header className="flex items-end gap-2 mb-2">
      <Image
        src={item.companyLogo as string}
        alt={item.companyName}
        loading="lazy"
        width={800}
        height={800}
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
                width={800}
                height={800}
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
));

PortfolioCard.displayName = 'PortfolioCard';

export default memo(CarouselPortfolio);
