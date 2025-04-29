'use client';
import { HomeIcon } from '@/shared/components/icons/HomeIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { SpinnerIcon } from '@/shared/components/icons/SpinnerIcon';

export function HomeButton(props: HTMLMotionProps<'button'>) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <motion.button
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      {...props}
      onClick={handleClick}
    >
      <AnimatePresence>
        {mounted ? (
          <HomeIcon className='size-full' />
        ) : (
          <SpinnerIcon className='size-full animate-spin' />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
