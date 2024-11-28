'use client';

import clsx from 'clsx';

interface AnimatedTagProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedTag: React.FC<AnimatedTagProps> = ({ children, className, delay = 0 }) => {
  return (
    <span
      className={clsx(
        className,
        `px-2 py-1 rounded-lg font-semibold text-sm text-white bg-[#3A9DA1]
        motion-safe:animate-randomHover`
      )}
      style={{
        animationDelay: `${delay}s`,
      }}
      aria-label="tag"
    >
      {children}
    </span>
  );
};

export default AnimatedTag;
