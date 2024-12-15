'use client';
import { useEffect, useRef, useState } from 'react';

export const useInView = (once: boolean, threshold?: number) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (once && !hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
          } else if (!once) {
            setIsInView(true);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold: threshold ?? 0.5 }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [once, hasAnimated, threshold]);

  return { elementRef, isInView };
};
