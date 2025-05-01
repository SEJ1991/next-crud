'use client';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { createContext, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const HoverContext = createContext({ isHover: false });

interface Props extends HTMLMotionProps<'div'> {
  onChangeHover?: (param: boolean) => void;
}
/**
 * 마우스 hover 상태를 감지하여, 해당 상태를 context로 자식 컴포넌트에 전달하는 카드 컴포넌트
 * hover 상태에 따라 overlay 콘텐츠를 자연스럽게 표시할 수 있으며,
 * 외부에서도 상태 변화를 감지할 수 있도록 콜백(onChangeHover)을 제공
 *
 * @property {(param: boolean) => void | undefined} onChangeHover
 */
export function HoverOverlayCard({ onChangeHover, ...props }: Props) {
  const [isHover, setIsHover] = useState(false);

  const handleHoverStart = () => {
    setIsHover(true);
  };

  const handleHoverEnd = () => {
    setIsHover(false);
  };

  useEffect(() => {
    if (!onChangeHover) return;
    onChangeHover(isHover);
  }, [isHover]);

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

HoverOverlayCard.HoverContents = HoverContents;
