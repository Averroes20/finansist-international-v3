import dynamic from 'next/dynamic';
import { memo } from 'react';

const ScrambleNumber = dynamic(() => import('./ScrambleNumber'), { ssr: false });

type Props = {
  data: Array<{ count: string; description: string }>;
};

const Achievements: React.FC<Props> = ({ data }) => {
  return data.map((achievement, index) => (
    <div key={index}>
      <div className="text-3xl md:text-4xl font-bold flex justify-center items-end md:gap-1">
        <ScrambleNumber>{achievement.count}</ScrambleNumber>+
      </div>
      <p className="text-sm leading-4">{achievement.description}</p>
    </div>
  ));
};

export default memo(Achievements);
