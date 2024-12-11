'use client';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

type EffectOptions = 'fade-in-right' | 'fade-in-left' | 'fade-in-top' | 'fade-in-bottom' | 'scale';

interface AnimatedComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  once?: boolean; // Properti untuk menjalankan animasi hanya sekali
  effect?: EffectOptions; // Jenis efek animasi
  className?: string;
  threshold?: number;
  children: React.ReactNode;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ once = false, effect = 'fade-in-right', threshold, children, className }) => {
  const { elementRef, isInView } = useInView(once, threshold);

  const getAnimationClasses = (): string => {
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
      default:
        return '';
    }
  };

  const animation = getAnimationClasses();

  return (
    <div ref={elementRef} className={cn(className, `${isInView ? animation : 'opacity-0'}`)}>
      {children}
    </div>
  );
};

export default AnimatedComponent;
