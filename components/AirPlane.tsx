'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const AirPlane = () => {
  const ref = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('js-enabled');
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ref.current || !planeRef.current) return;

      const sectionTop = ref.current.getBoundingClientRect().top;
      const sectionHeight = ref.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const progress = Math.min(Math.max((windowHeight - sectionTop) / (sectionHeight + windowHeight), 0), 1);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (planeRef.current) {
            planeRef.current.style.transform = `translateX(${progress * 1024}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Logika tambahan jika diperlukan saat elemen terlihat
        }
      },
      { threshold: 0 }
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

  return (
    <section ref={ref} className="relative w-full h-[20vh] overflow-hidden">
      <div
        ref={planeRef}
        className={`absolute hidden md:block w-[400px]`}
        style={{
          top: '10%',
          left: '0%',
        }}
      >
        <Image
          src={'/images/air-plane.webp'}
          quality={100}
          loading="lazy"
          alt="airplane"
          width={1000}
          height={1000}
          className={`object-contain w-full h-full`}
        />
      </div>
    </section>
  );
};

export default AirPlane;
