'use client';
import Dotlottie from './dotlottie';

export default function AnimatedBeach() {
  return (
    <div className="w-96 h-80 p-4">
      <Dotlottie src="/animate/beach.lottie" loop autoplay segment={[52, 100]} speed={0.9} />
    </div>
  );
}
