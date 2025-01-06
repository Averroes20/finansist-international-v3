'use client';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageProvider';
import { useTheme } from '@/context/ThemeProvider';
import { splitString } from '@/utils/split-string';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const Modal = dynamic(() => import('@/components/common/Modal'), { ssr: false });

const ValueCompany = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const { setIsDarkMode } = useTheme();
  const { dictionary } = useLanguage();
  const { items, title } = dictionary?.valueCompany || {};

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

  const part1 = title?.part1 ? splitString(title.part1) : [];
  const part2 = title?.part2 ? splitString(title.part2) : [];

  const charVariants: Variants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <section id="valueCompany" className="min-h-screen flex flex-col bg-[#071620]" ref={sectionRef}>
      <header className="px-5 py-6 md:px-16 md:py-14 flex-grow">
        <motion.h2
          initial="hidden"
          whileInView={'reveal'}
          transition={{ staggerChildren: 0.02 }}
          className="text-3xl md:text-6xl md:leading-tight font-bold text-white"
        >
          {part1.map((word, index) => (
            <motion.span key={`${index + 1}-${word}`} transition={{ duration: 0.5 }} variants={charVariants} className="text-[#84A2B7]">
              {word}
            </motion.span>
          ))}
          <br />
          {part2.map((word, index) => (
            <motion.span key={`${index + 1}-${word}`} transition={{ duration: 0.5 }} variants={charVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </header>
      <div className="flex flex-col justify-center max-w-screen overflow-auto items-center md:flex-row md:justify-end md:self-end gap-4 pb-10 md:pb-20">
        {items?.map((item, index) => (
          <div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`relative w-80 md:h-[520px] bg-[#091f2f] rounded-lg overflow-hidden shadow-lg flex flex-col group transition-all duration-500 cursor-default`}
            onClick={() => handleCardToggle(index)}
            aria-pressed={activeCard === index}
            aria-label={`card-${index + 1}`}
            tabIndex={0}
            key={`${index + 1}-${item.title}`}
          >
            <div className="p-5 mb-10">
              <h1 className="text-3xl text-white text-start font-bold leading-tight">{item.title}</h1>
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
                className={clsx(
                  `absolute bottom-0 left-0 w-full h-full transition-all duration-700 ease-out
                  transform group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100`,
                  activeCard === index ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[100%] opacity-0 scale-90'
                )}
                style={{
                  transformOrigin: 'bottom',
                }}
              >
                <div className="p-4 text-white">
                  <p className="text-lg font-medium text-start line-clamp-3 md:line-clamp-4 lg:line-clamp-6">{item.description}</p>
                </div>

                {/* Chevron */}
                <div
                  className={clsx(
                    `absolute bottom-5 right-4 bg-green-500 p-2 rounded-full cursor-pointer transition-transform ease-in delay-300 duration-500 
                    group-hover:translate-y-0`,
                    activeCard === index ? 'translate-y-0' : 'translate-y-[50px]'
                  )}
                >
                  <Modal
                    trigger={<Button className="bg-transparent hover:bg-transparent py-0 text-sm md:text-base">Read more &#8594;</Button>}
                    contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[70vw] md:max-h-[90vh] p-0 border-0 overflow-y-auto border-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-1 p-5 bg-[#3A9DA1]">
                        <h1 className="text-center text-xl text-white mb-4">{item.contentModal.title}</h1>
                        <p className="text-lg">{item.contentModal.otherDesc}</p>
                      </div>
                      <div className="col-span-2 p-5 bg-[#091f2f]">
                        <DialogHeader>
                          <DialogTitle className="font-bold text-center">
                            <span className="border-b-4 border-[#3A9DA1] inline-block pb-2 text-white text-xl">
                              C02 AI raises 12m USD in seed funding
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <DialogDescription className="leading-7 text-white text-lg">{item.contentModal.description}</DialogDescription>
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
