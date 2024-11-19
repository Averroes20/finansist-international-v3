'use client';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import AnimatedTag from './tag-animation';

const getRandomDelay = (min = 0, max = 1) => Math.random() * (max - min) + min;

const ProfitAnimated: React.FC = () => {
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
      <DotLottieReact src="/animate/profit.lottie" autoplay speed={0.9} segment={[0, 98]} dotLottieRefCallback={dotLottieRefCallback} />
      <AnimatedTag className="absolute top-[4rem] left-[5.5rem]" delay={getRandomDelay()}>
        Audit
      </AnimatedTag>
      <AnimatedTag className="absolute top-[1.5rem] left-[9rem]" delay={getRandomDelay()}>
        Accounting
      </AnimatedTag>
      <AnimatedTag className="absolute top-[20%] left-[49%] -translate-x-1/4 -translate-y-1/3" delay={getRandomDelay()}>
        Payroll
      </AnimatedTag>
      <AnimatedTag className="absolute top-[1.5rem] right-[6rem]" delay={getRandomDelay()}>
        Bookkeeping
      </AnimatedTag>
      <AnimatedTag className="absolute top-[4rem] right-[4rem]" delay={getRandomDelay()}>
        Tax
      </AnimatedTag>
    </div>
  );
};

export default ProfitAnimated;
