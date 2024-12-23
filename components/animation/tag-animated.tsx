'use client';

import { getRandomNumber } from '@/utils/getRandomNumber';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface AnimatedTagProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedTag: React.FC<AnimatedTagProps> = ({ children, className, delay = 2 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const randomDuration = 10 + getRandomNumber() * 10; // Random duration between 10-20s

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000); // Delay in milliseconds

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [delay]);

  return (
    <span
      className={clsx(
        className,
        `px-2 py-1 rounded-lg font-semibold text-sm md:text-base text-white bg-[#3A9DA1] motion-safe:animate-randomHover`,
        isVisible ? 'opacity-100 translate-y-0 transition-opacity duration-1000 ease-out' : 'opacity-0 translate-y-4'
      )}
      style={{
        animationDuration: `${randomDuration}s`,
        // animationDelay: '',
      }}
      aria-label="tag"
    >
      {children}
    </span>
  );
};

export default AnimatedTag;
