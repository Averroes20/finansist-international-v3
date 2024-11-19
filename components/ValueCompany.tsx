'use client';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from './common/Modal';
import { useTheme } from '@/context/ThemeProvider';
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

const ValueCompany = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '0px -100px 0px 0px' });
  const { setIsDarkMode } = useTheme();

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
    if (isInView) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    console.log('dark mode', isInView);
  }, [isInView, setIsDarkMode]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeCard, handleClickOutside]);

  const imageVariants = {
    initial: { x: 0, opacity: 2, transition: { duration: 0.5 } },
    hover: { x: '-100%', opacity: 0.5, transition: { duration: 0.5 } },
  };

  const descriptionVariants = {
    initial: { y: '100%', opacity: 0, zIndex: 0 },
    hover: {
      y: 0,
      opacity: 1,
      zIndex: 1,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  const indicatorVariants = {
    initial: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="valueCompany" className="min-h-screen bg-[#071620]" ref={sectionRef}>
      <header className="px-5 py-6 md:px-16 md:py-14">
        <h2 className="text-2xl md:text-6xl md:leading-tight font-bold text-white">
          <span className="text-[#84A2B7]">Visual excellence is only our starting point</span>, delivering measurable results is our promise.
        </h2>
      </header>

      <div className="flex flex-col justify-center items-center md:flex-row md:justify-end gap-2 pb-12">
        {[1, 2, 3].map((item, index) => (
          <motion.div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`relative w-80 h-[570px] bg-[#091f2f] rounded-lg overflow-hidden shadow-lg flex flex-col 
            ${activeCard === index ? '' : 'group'}`}
            initial="initial"
            animate={activeCard === index ? 'hover' : 'initial'}
            whileHover="hover"
            onClick={() => handleCardToggle(index)}
            key={index}
          >
            <div className="p-5 mb-10 mt-5">
              <h1 className="text-3xl text-white font-bold leading-tight">C02 AI raises 12m USD in seed funding</h1>
            </div>
            <div className="relative w-full h-full">
              <motion.div
                className="flex-1 flex justify-end items-end h-full "
                variants={imageVariants}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Image src={'/images/earth.png'} alt="Card Image" width={300} height={300} loading="lazy" className="object-cover w-full h-full" />
              </motion.div>
              <motion.div
                className="absolute w-full h-full bottom-0 p-4"
                variants={descriptionVariants}
                transition={{ duration: 0.5, ease: 'easeIn' }}
              >
                <p className="text-base p-5 text-white">
                  This investment enables CO2 AI to expand their footprint across Europe and North America, helping enterprises measure, reduce, and
                  manage their carbon emissions effectively, positioning themselves as leaders in sustainability management.
                </p>
                <motion.div
                  className="absolute bottom-5 right-4 bg-green-500 p-2 rounded-full z-10 cursor-pointer"
                  variants={{
                    initial: { y: 50 },
                    hover: {
                      y: 0,
                      transition: {
                        delay: 0.5,
                        duration: 0.3,
                        ease: 'easeInOut',
                      },
                    },
                  }}
                >
                  <Modal
                    trigger={<ChevronRight className="w-6 h-6 text-white" />}
                    contentStyle="max-w-[90vw] max-h-[90vh] md:max-w-[80vw] md:max-h-[80vh] p-0 border-0 overflow-y-auto"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 ">
                      <div className="col-span-1 p-5 bg-[#3A9DA1]">
                        <h1 className="text-center font-dosis text-lg text-white">What you will get</h1>
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, voluptates. Sint, similique doloribus sequi ullam at
                          provident. Minus, alias dolorem.
                        </p>
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, voluptates. Sint, similique doloribus sequi ullam at
                          provident. Minus, alias dolorem.
                        </p>
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, voluptates. Sint, similique doloribus sequi ullam at
                          provident. Minus, alias dolorem.
                        </p>
                      </div>
                      <div className="col-span-2 p-5 bg-slate-900">
                        <DialogHeader>
                          <DialogTitle className="font-bold text-center">
                            <span className="border-b-4 border-[#3A9DA1] inline-block pb-2 text-white">C02 AI raises 12m USD in seed funding</span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <DialogDescription className="leading-7 text-white text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi pariatur provident ea quis expedita at iste? Quisquam
                            porro, cumque sit incidunt itaque nisi officia cupiditate repellat, nobis enim animi nostrum aliquid error quis, soluta
                            veritatis praesentium distinctio eius? Optio aspernatur rerum beatae quam amet labore ipsum unde similique nihil dolore
                            sunt eos tempore harum fugiat a quisquam minus ullam rem, temporibus minima vitae. Nemo quia provident aliquam, placeat
                            expedita itaque doloribus fugit consequatur quisquam quos, deserunt, earum recusandae veritatis perferendis alias iste
                            accusantium rem temporibus. Iste ratione corrupti ad minus quidem totam amet voluptatibus, eveniet incidunt laborum sed,
                            illum deserunt?
                          </DialogDescription>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </motion.div>
              </motion.div>
            </div>
            <motion.div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm md:hidden" variants={indicatorVariants}>
              Tap to view details
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValueCompany;
