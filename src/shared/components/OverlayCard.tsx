'use client';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { createContext, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const HoverContext = createContext({ isHover: false });

export function OverlayCard(props: HTMLMotionProps<'div'>) {
  const [isHover, setIsHover] = useState(false);

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
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {props.children}
      </motion.div>
    </HoverContext.Provider>
  );
}

function HoverContents(props: HTMLMotionProps<'div'>) {
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

OverlayCard.HoverContents = HoverContents;
