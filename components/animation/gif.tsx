'use client';
import Dotlottie from './dotlottie';

const Gif = ({ src }: { src: string }) => {
  return <Dotlottie src={src} loop autoplay speed={0.9} />;
};

export default Gif;
