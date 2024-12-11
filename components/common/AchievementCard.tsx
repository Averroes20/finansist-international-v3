// import dynamic from 'next/dynamic';
import { memo } from 'react';

// const ScrambleNumber = dynamic(() => import('./ScrambleNumber'), { ssr: false });

type Props = {
  data: Array<{ count: string; description: string }>;
};

const Achievements: React.FC<Props> = ({ data }) => {
  return data.map((achievement, index) => {
    // Tentukan animasi berdasarkan index
    const animationDirection =
      index === 1
        ? 'motion-translate-y-in-[100%]' // Dari bawah
        : 'motion-translate-x-in-[100%]';

    const animationClass =
      index === 0
        ? 'motion-translate-x-in-[-100%]' // Dari kiri
        : animationDirection;

    return (
      <div
        key={`achievement-${index + 1}`}
        className={`${animationClass} motion-opacity-in-[0%] motion-duration-[3s] motion-delay-[${0.5 * index}s] motion-ease-spring-smooth`}
      >
        <div className="text-3xl md:text-4xl font-bold flex justify-center items-end md:gap-1">
          <p>{achievement.count}</p>+
        </div>
        <p className="text-sm leading-4">{achievement.description}</p>
      </div>
    );
  });
};

export default memo(Achievements);
