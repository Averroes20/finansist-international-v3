import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

type Props = {
  src: string;
  loop?: boolean;
  autoplay: boolean;
  segment?: [number, number];
  speed: number;
  dotLottieRefCallback?: (instance: DotLottie | null) => void;
  className?: string;
};

const Dotlottie: React.FC<Props> = ({ src, loop, autoplay, segment, speed, dotLottieRefCallback, className }) => {
  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay}
      segment={segment}
      speed={speed}
      dotLottieRefCallback={dotLottieRefCallback}
      className={className}
    />
  );
};

export default Dotlottie;
