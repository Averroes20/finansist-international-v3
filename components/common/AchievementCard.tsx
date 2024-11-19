import { achievements } from '@/lib/data/intro';
import { memo } from 'react';
import ScrambleNumber from './ScrambleNumber';
import { TypographyP } from '../ui/typography';

const Achievements = () => {
  return (
    <div className="flex flex-row gap-1 sm:gap-4 md:gap-7">
      {achievements.map((achievement, index) => (
        <div key={index}>
          <div className="text-3xl md:text-4xl font-bold flex items-end md:gap-2">
            <ScrambleNumber>{achievement.count}</ScrambleNumber>+
          </div>
          <TypographyP className="text-sm md:text-base leading-4">{achievement.description}</TypographyP>
        </div>
      ))}
    </div>
  );
};

export default memo(Achievements);
