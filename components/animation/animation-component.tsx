'use client';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import { memo, useMemo } from 'react';

type EffectOptions = 'fade-in-right' | 'fade-in-left' | 'fade-in-top' | 'fade-in-bottom' | 'scale' | 'fade-up';

interface AnimatedComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  once?: boolean;
  effect?: EffectOptions;
  className?: string;
  threshold?: number;
  delay?: number;
  children: React.ReactNode;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  once = false,
  effect = 'fade-in-right',
  delay = 0,
  threshold,
  children,
  className,
  ...props
}) => {
  const { elementRef, isInView } = useInView(once, threshold);

  const animation = useMemo(() => {
    switch (effect) {
      case 'fade-in-right':
        return 'motion-translate-x-in-[100%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-duration-[1.50s] motion-duration-[2.00s]/translate motion-duration-[2.00s]/opacity';
      case 'fade-in-left':
        return 'motion-translate-x-in-[-100%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-duration-[1.50s] motion-duration-[2.00s]/translate motion-duration-[2.00s]/opacity';
      case 'fade-in-top':
        return 'motion-translate-x-in-[0%] motion-translate-y-in-[-100%] motion-opacity-in-[0%] motion-duration-[1.50s] motion-duration-[2.00s]/translate motion-duration-[2.00s]/opacity';
      case 'fade-in-bottom':
        return 'motion-translate-x-in-[0%] motion-translate-y-in-[100%] motion-opacity-in-[0%] motion-duration-[1.50s] motion-duration-[2.00s]/translate motion-duration-[2.00s]/opacity';
      case 'scale':
        return 'motion-scale-in-[0] motion-opacity-in-[0%] motion-duration-[2.00s]';
      case 'fade-up':
        return 'motion-translate-x-in-[0%] motion-translate-y-in-[100%] motion-opacity-in-[0%] motion-duration-[1.00s]/translate motion-duration-[0.70s]/opacity motion-delay-[0.30s]/opacity motion-ease-spring-bouncy';
      default:
        return '';
    }
  }, [effect]);

  return (
    <div ref={elementRef} {...props} className={cn(className, `${isInView ? animation : 'opacity-0'}`)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

export default memo(AnimatedComponent);
