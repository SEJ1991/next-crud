'use client';
import { ComponentPropsWithoutRef, createContext, useContext, useEffect } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { PortalRoot, XIcon } from '@/shared';

interface ModalContextType {
  onClickClose: () => void;
}
const ModalContext = createContext<ModalContextType | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal subcomponents must be used within Modal.');
  }
  return context;
}

interface Props extends HTMLMotionProps<'div'> {
  onClickClose: () => void;
}
export function Modal({ onClickClose, ...props }: Props) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <PortalRoot>
      <ModalContext.Provider value={{ onClickClose }}>
        <motion.div
          {...props}
          className={twMerge(
            'fixed inset-0 z-40 flex items-center justify-center',
            props.className
          )}
        >
          {props.children}
        </motion.div>
      </ModalContext.Provider>
    </PortalRoot>
  );
}

function Dim(props: HTMLMotionProps<'div'>) {
  const { onClickClose } = useModalContext();

  return (
    <motion.div
      onClick={onClickClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
      className={twMerge('absolute inset-0 bg-black/50 z-40', props.className)}
    />
  );
}

function Contens(props: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      {...props}
      className={twMerge('relative rounded-md bg-theme-primary z-41', props.className)}
    >
      {props.children}
    </motion.div>
  );
}

function CloseButton(props: ComponentPropsWithoutRef<'button'>) {
  const { onClickClose } = useModalContext();

  return (
    <button
      onClick={onClickClose}
      {...props}
      className={twMerge('absolute right-4 top-4 size-8 rounded-md', props.className)}
    >
      {props.children ?? <XIcon className='size-6' />}
    </button>
  );
}

Modal.Dim = Dim;
Modal.Contens = Contens;
Modal.CloseButton = CloseButton;
