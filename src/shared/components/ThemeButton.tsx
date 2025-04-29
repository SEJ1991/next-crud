'use client';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTheme } from 'next-themes';
import { MoonIcon, SpinnerIcon, SunIcon } from '@/shared';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';

export function ThemeButton(props: HTMLMotionProps<'button'>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.onClick) {
      props.onClick(e);
      return;
    }

    e.stopPropagation();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const Icon = () => {
    if (!mounted) {
      return <SpinnerIcon className='size-full animate-spin duration-800' />;
    }

    if (theme === 'dark')
      return (
        <MotionMoonIcon
          variants={ICON_VARIANTS}
          initial='initial'
          animate='animate'
          exit='exit'
          className='size-full'
        />
      );
    return (
      <MotionSunIcon
        variants={ICON_VARIANTS}
        initial='initial'
        animate='animate'
        exit='exit'
        className='size-full'
      />
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.button
      whileHover={{
        rotate: 40,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      {...props}
      className={twMerge('size-6 md:size-8', props.className)}
      onClick={handleClick}
    >
      <AnimatePresence>
        <Icon />
      </AnimatePresence>
    </motion.button>
  );
}

const MotionMoonIcon = motion.create(MoonIcon);
const MotionSunIcon = motion.create(SunIcon);

const ICON_VARIANTS = {
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.3,
  },
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 10,
    duration: 0.3,
  },
};
