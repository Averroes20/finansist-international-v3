'use client';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageProvider';

const Modal = dynamic(() => import('./common/Modal'), { ssr: false });

const ValueCompany = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const { setIsDarkMode } = useTheme();
  const { dictionary } = useLanguage();
  const { items, title } = dictionary.valueCompany;

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (activeCard !== null && !cardRefs.current[activeCard]?.contains(event.target as Node)) {
        setActiveCard(null);
      }
    },
    [activeCard]
  );

  const handleCardToggle = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsDarkMode(entry.isIntersecting), { rootMargin: '0px -100px 0px 0px' });
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) observer.observe(currentSectionRef);

    return () => {
      if (currentSectionRef) observer.disconnect();
    };
  }, [setIsDarkMode]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeCard, handleClickOutside]);

  return (
    <section id="valueCompany" className="min-h-screen bg-[#071620]" ref={sectionRef}>
      <header className="px-5 py-6 md:px-16 md:py-14">
        <h2 className="text-3xl md:text-6xl md:leading-tight font-bold text-white">
          <span className="text-[#84A2B7]">{title.part1}</span>, {title.part2}
        </h2>
      </header>

      <div className="flex flex-col justify-center items-center md:flex-row md:justify-end gap-2 pb-12">
        {items.map((item, index) => (
          <div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`relative w-80 md:h-[570px] bg-[#091f2f] rounded-lg overflow-hidden shadow-lg flex flex-col 
            group transition-all duration-500`}
            onClick={() => handleCardToggle(index)}
            key={index}
          >
            <div className="p-5 mb-10 mt-5">
              <h1 className="text-3xl text-white font-bold leading-tight">{item.title}</h1>
            </div>
            <div className="relative w-full h-full">
              <div
                className={clsx(
                  `flex-1 flex justify-end items-end h-full transition-transform duration-500 
                  group-hover:translate-x-[-100%] group-hover:opacity-50`,
                  activeCard === index ? 'translate-x-[-100%] opacity-50' : 'translate-x-0 opacity-100'
                )}
              >
                <Image src={item.urlImage} alt="Card Image" width={300} height={300} loading="lazy" className="object-cover w-full h-full" />
              </div>

              {/* Description */}
              <div
                className={`absolute w-full h-full bottom-0 p-4 transition-transform duration-500 
                  group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-10 ${
                    activeCard === index ? 'translate-y-0 opacity-100 z-10' : 'translate-y-full opacity-0 z-0'
                  }`}
              >
                <p className="text-base p-5 text-white">{item.description}</p>

                {/* Chevron */}
                <div
                  className={clsx(
                    `absolute bottom-5 right-4 bg-green-500 p-2 rounded-full cursor-pointer transition-transform ease-in delay-300 duration-500 
                    group-hover:translate-y-0`,
                    activeCard === index ? 'translate-y-0' : 'translate-y-[50px]'
                  )}
                >
                  <Modal
                    trigger={<ChevronRight className="w-6 h-6 text-white" />}
                    contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[50vw] md:max-h-[80vh] p-0 border-0 overflow-y-auto"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-1 p-5 bg-[#3A9DA1]">
                        <h1 className="text-center text-lg text-white mb-4">{item.contentModal.title}</h1>
                        <p>{item.contentModal.otherDesc}</p>
                      </div>
                      <div className="col-span-2 p-5 bg-slate-900">
                        <DialogHeader>
                          <DialogTitle className="font-bold text-center">
                            <span className="border-b-4 border-[#3A9DA1] inline-block pb-2 text-white">C02 AI raises 12m USD in seed funding</span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <DialogDescription className="leading-7 text-white text-base">{item.contentModal.description}</DialogDescription>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueCompany;
