'use client';
import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

const CYCLES_PER_DIGIT = 20;
const SHUFFLE_TIME = 75;
const DIGITS = '0123456789';

type Props = {
  children: string;
};

const ScrambleNumber: React.FC<Props> = ({ children }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const TARGET_NUMBER = children;

  const [text, setText] = useState(TARGET_NUMBER);

  const stopScramble = useCallback(() => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setText(TARGET_NUMBER);
  }, [TARGET_NUMBER]);

  const scramble = useCallback(() => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_NUMBER.split('')
        .map((digit, index) => {
          if (pos / CYCLES_PER_DIGIT > index) {
            return digit;
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
  }, [TARGET_NUMBER, stopScramble]);

  useEffect(() => {
    scramble();
    return () => {
      stopScramble();
    };
  }, [scramble, stopScramble]);

  return (
    <motion.h1
      whileTap={{
        scale: 0.975,
      }}
      onMouseLeave={stopScramble}
      className="cursor-default text-3xl font-bold dark:text-white md:text-[2.5rem] md:leading-[2.5rem]"
    >
      {text}
    </motion.h1>
  );
};

export default memo(ScrambleNumber);
