'use client';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const HoverContext = createContext({ isHover: false });

interface Props extends HTMLMotionProps<'div'> {
  href: string;
}
export function WidgetLink({ href, ...props }: Props) {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    router.push(href);
  };
  const handleHoverStart = () => {
    setIsHover(true);
  };

  const handleHoverEnd = () => {
    setIsHover(false);
  };

  return (
    <HoverContext.Provider value={{ isHover }}>
      <motion.div
        {...props}
        className={twMerge('relative cursor-pointer', props.className)}
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {props.children}
      </motion.div>
    </HoverContext.Provider>
  );
}

function HoverInfo(props: HTMLMotionProps<'div'>) {
  const { isHover } = useContext(HoverContext);

  return (
    <AnimatePresence>
      {isHover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...props}
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

WidgetLink.HoverInfo = HoverInfo;
