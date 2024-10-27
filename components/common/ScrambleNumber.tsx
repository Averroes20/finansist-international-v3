import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CYCLES_PER_DIGIT = 15;
const SHUFFLE_TIME = 75;
const DIGITS = '0123456789';

type Props = {
  children: string;
};

const ScrambleNumber: React.FC<Props> = ({ children }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const TARGET_NUMBER = children;

  const [text, setText] = useState(TARGET_NUMBER);

  useEffect(() => {
    scramble();
    return () => {
      stopScramble();
    };
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_NUMBER.split('')
        .map((digit, index) => {
          if (pos / CYCLES_PER_DIGIT > index) {
            return digit; // Gunakan digit asli jika pos telah melewati indeks ini
          }

          const randomDigitIndex = Math.floor(Math.random() * DIGITS.length);
          const randomDigit = DIGITS[randomDigitIndex];

          return randomDigit;
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= TARGET_NUMBER.length * CYCLES_PER_DIGIT) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setText(TARGET_NUMBER);
  };

  return (
    <motion.h1
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="cursor-default text-3xl font-bold dark:text-white sm:text-4xl md:text-5xl"
    >
      {text}
    </motion.h1>
  );
};

export default ScrambleNumber;
