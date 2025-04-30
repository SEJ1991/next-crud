'use client';
import { Product } from '@/domains/product';
import { ImageWithSkeleton, HoverOverlayCard } from '@/shared';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props {
  products: Product[];
  onClick: () => void;
}
export function ProductWidget({ products, onClick }: Props) {
  const [isHover, setIsHover] = useState(false);

  const handleChangeHover = (param: boolean) => {
    setIsHover(param);
  };
  return (
    <HoverOverlayCard
      className='relative w-50 aspect-[2/3] rounded-md shadow-primary'
      whileTap={{ scale: 0.95, zIndex: 1 }}
      whileHover={{ scale: 1.2, zIndex: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.8 }}
      onClick={onClick}
      onChangeHover={handleChangeHover}
    >
      <AnimatePresence>
        {!isHover && (
          <motion.h2
            className='absolute bottom-8 -left-16 rotate-270 text-2xl'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            /products
          </motion.h2>
        )}
      </AnimatePresence>
      <ul className='grid grid-cols-4 items-center size-full p-4 gap-4'>
        {products.map(({ id, title, thumbnail }, index) => (
          <motion.li
            key={id}
            className='relative aspect-square'
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 50,
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <ImageWithSkeleton
              className='size-full rounded-md'
              src={thumbnail}
              alt={`${title}'s thumbnail image`}
              sizes='2vw'
              fill
            />
          </motion.li>
        ))}
      </ul>

      <HoverOverlayCard.HoverContents className='absolute bottom-0 w-full p-2 bg-gradient-to-t from-theme-primary/80 to-transparent backdrop-blur-md rounded-b-md'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-semibold'>Products</h2>
          <p className='text-sm'>Explore a variety of products.</p>
        </div>
      </HoverOverlayCard.HoverContents>
    </HoverOverlayCard>
  );
}
