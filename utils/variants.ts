type direction = 'up' | 'down' | 'left' | 'right';

export const fadeId = (direction: direction, delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      opacity: 0, // Tambahkan opacity di state 'hidden'
      transition: {
        type: 'tween',
        duration: 0.5, // Sedikit lebih cepat untuk efek keluar
        ease: [0.25, 0.25, 0.75, 0.75],
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.25, 0.75, 0.75],
        opacity: { duration: 1 }, // Transisi khusus untuk opacity
      },
    },
  };
};

export const bounceFade = (
  delay: number = 0,
  duration: number = 0.6,
  bounceIntensity: number = 1.5,
  easing: [number, number, number, number] = [0.42, 0, 0.58, 1]
) => {
  return {
    hidden: {
      opacity: 0,
      y: 50,
    },
    show: {
      opacity: 1,
      y: [50, -20 * bounceIntensity, 0],
      transition: {
        duration: duration,
        delay: delay,
        ease: easing,
      },
    },
  };
};
