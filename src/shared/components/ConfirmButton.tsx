import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactElement } from 'react';
import { toast } from 'sonner';

interface Props extends HTMLMotionProps<'button'> {
  onConfirm: () => void;
  onCancel?: () => void;
  customUI?: ({
    onPositive,
    onNegative,
  }: {
    onPositive: () => void;
    onNegative: () => void;
  }) => ReactElement;
}
export function ConfirmButton({ onConfirm, onCancel, customUI, ...props }: Props) {
  const handleClick = async () => {
    toast.dismiss();

    const confirmed = await new Promise(resolve => {
      toast.custom(id => {
        const handlePositive = () => {
          resolve(true);
          toast.dismiss(id);
        };

        const handleNegative = () => {
          resolve(false);
          toast.dismiss(id);
        };

        if (customUI) {
          return customUI({ onPositive: handlePositive, onNegative: handleNegative });
        }

        return (
          <div className='flex flex-col items-center gap-2 px-8 py-4 shadow-primary bg-theme-primary rounded-md z-50'>
            <span className='font-semibold'>Are you sure?</span>
            <div className='flex gap-4 mt-2'>
              <button
                className='px-4 py-2 bg-accent-primary text-white-primary font-semibold rounded-md'
                onClick={handlePositive}
              >
                Yes
              </button>
              <button
                className='px-4 py-2 border border-opposite-theme-primary font-semibold rounded-md'
                onClick={handleNegative}
              >
                No
              </button>
            </div>
          </div>
        );
      });
    });

    if (confirmed) {
      onConfirm();
    } else {
      onCancel?.();
    }
  };
  return (
    <motion.button {...props} onClick={handleClick}>
      {props.children}
    </motion.button>
  );
}
