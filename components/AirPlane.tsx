'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const AirPlane = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const planeX = useTransform(scrollYProgress, [0, 1], [0, inView ? 1024 : 0]);

  return (
    <section ref={ref} className="relative w-full h-[20vh]">
      <motion.div
        style={{
          x: planeX,
          top: '10%',
          left: '0%',
        }}
        className="absolute hidden md:block w-[400px]"
        transition={{
          ease: 'easeInOut',
        }}
      >
        <Image
          src={'/images/air-plane.webp'}
          quality={100}
          loading="lazy"
          alt="airplane"
          width={200}
          height={200}
          className="object-contain w-full h-full"
        />
      </motion.div>
    </section>
  );
};

export default AirPlane;
