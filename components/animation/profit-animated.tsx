'use client';
import { DotLottie } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import Dotlottie from '@/components/animation/dotlottie';
import AnimatedTag from '@/components/animation/tag-animated';
import { getRandomNumber } from '@/utils/getRandomNumber';

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
      <Dotlottie src="/animate/profit.lottie" autoplay speed={0.9} segment={[0, 98]} dotLottieRefCallback={dotLottieRefCallback} />
      <AnimatedTag className="absolute top-[9rem] left-[2rem] md:left-[2.5rem]" delay={getRandomNumber()}>
        Audit
      </AnimatedTag>
      <AnimatedTag className="absolute top-[4rem] md:top-[3rem] left-[3.5rem] md:left-[7rem]" delay={getRandomNumber()}>
        Accounting
      </AnimatedTag>
      <AnimatedTag className="absolute top-[2.5rem] left-[20rem] -translate-y-1/3" delay={getRandomNumber()}>
        Payroll
      </AnimatedTag>
      <AnimatedTag className="absolute top-[1.5rem] right-[7rem] md:right-[4rem]" delay={getRandomNumber()}>
        Bookkeeping
      </AnimatedTag>
      <AnimatedTag className="absolute top-[10rem] right-[1.5rem] md:right-[2.5rem]" delay={getRandomNumber()}>
        Tax
      </AnimatedTag>
    </div>
  );
};

export default ProfitAnimated;
