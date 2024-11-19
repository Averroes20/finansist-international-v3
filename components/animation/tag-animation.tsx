import { motion } from 'framer-motion';

interface AnimatedTagProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedTag: React.FC<AnimatedTagProps> = ({ children, className, delay = 0 }) => {
  return (
    <motion.span
      className={`px-2 py-1 rounded-lg font-semibold text-sm text-white ${className}`}
      aria-label="tag"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
        backgroundColor: ['#3A9DA1'],
      }}
      whileHover={{ scale: 1.1 }}
      transition={{
        opacity: { duration: 0.8, ease: 'easeOut' },
        scale: { duration: 0.8, ease: 'easeOut' },
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        backgroundColor: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        delay,
      }}
    >
      {children}
    </motion.span>
  );
};

export default AnimatedTag;
