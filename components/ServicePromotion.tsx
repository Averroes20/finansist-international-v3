'use client';
import { images } from '@/constants/images';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const ServicePromotion: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-60% 0px -60% 0px' });

  const planeAnimation = {
    x: isInView ? 1000 : 0,
    y: isInView ? -400 : 0,
    rotate: isInView ? 180 : 0,
  };

  return (
    <section ref={ref} id="servicePromotion" className="min-h-screen max-w-screen-lg mx-auto flex items-center relative">
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div className="md:col-span-2">
          <p className="leading-7">
            Save your precious time and hiring costs, and just focus on growing your sales strategy. We will handle your bookkeeping, tax compliance,
            and reporting with precision for seamless and cost-effective results.
          </p>
        </div>
        <div className="flex justify-center items-center md:col-span-1 ">
          <div className="bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)] group w-[300px] h-[400px] inline-flex transition-all duration-300 overflow-visible p-1 rounded-[30px]">
            <div className="w-full h-full bg-[linear-gradient(to_top,#ececec,#fff)] overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] p-1 rounded-[30px] duration-300">
              <div className="w-full h-full bg-[linear-gradient(#f4f4f4,#fefefe)] rounded-[30px] overflow-hidden">
                <Image src={images.Promotion} alt="Styled Image" className="w-full h-full object-cover rounded-[30px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        animate={planeAnimation}
        transition={{
          duration: 3,
          ease: 'easeInOut',
        }}
        className="absolute"
        style={{ top: '60%', left: '0%' }}
      >
        <Image src={'/images/air-plane.png'} alt="airplane" width={150} height={150} />
      </motion.div>
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: -50 - index * 10,
            y: index * 10,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            delay: index * 0.2,
            duration: 2,
            ease: 'easeOut',
          }}
          className="absolute w-4 h-4 bg-gray-400 rounded-full opacity-50"
          style={{
            top: '60%',
            left: `${5 + index}%`,
          }}
        />
      ))}
    </section>
  );
};

export default ServicePromotion;
