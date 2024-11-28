'use client';
import { DotLottie } from '@lottiefiles/dotlottie-react';
import { useEffect, useMemo, useState } from 'react';
import Dotlottie from './dotlottie';
import AnimatedTag from './tag-animated';

const ProfitAnimated: React.FC = () => {
  const getRandomDelay = useMemo(
    () =>
      (min = 0, max = 1) =>
        Math.random() * (max - min) + min,
    []
  );

  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const dotLottieRefCallback = (instance: DotLottie | null) => {
    setDotLottie(instance);
  };

  useEffect(() => {
    if (!dotLottie) return;

    const handleComplete = () => {
      dotLottie.setSegment(65, 100);
      dotLottie.setLoop(true);
      dotLottie.setSpeed(0.8);
      dotLottie.setMode('bounce');
      dotLottie.play();
    };

    dotLottie.addEventListener('complete', handleComplete);

    return () => {
      dotLottie.removeEventListener('complete', handleComplete);
    };
  }, [dotLottie]);

  return (
    <div className="relative pt-10">
      <Dotlottie src="/animate/profit.lottie" autoplay speed={0.9} segment={[0, 98]} dotLottieRefCallback={dotLottieRefCallback} />
      <AnimatedTag className="absolute top-[9rem] left-[2rem] md:left-[2.5rem]" delay={getRandomDelay()}>
        Audit
      </AnimatedTag>
      <AnimatedTag className="absolute top-[4rem] md:top-[3rem] left-[3.5rem] md:left-[7rem]" delay={getRandomDelay()}>
        Accounting
      </AnimatedTag>
      <AnimatedTag className="absolute top-[2.5rem] left-[20rem] -translate-y-1/3" delay={getRandomDelay()}>
        Payroll
      </AnimatedTag>
      <AnimatedTag className="absolute top-[1.5rem] right-[7rem] md:right-[4rem]" delay={getRandomDelay()}>
        Bookkeeping
      </AnimatedTag>
      <AnimatedTag className="absolute top-[10rem] right-[1.5rem] md:right-[2.5rem]" delay={getRandomDelay()}>
        Tax
      </AnimatedTag>
    </div>
  );
};

export default ProfitAnimated;
