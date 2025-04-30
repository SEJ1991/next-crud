'use client';
import { PlusIcon } from '@/shared';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function ProductCreateButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const returnCategory = pathname.split('/').at(-1);
    const returnPage = searchParams.get('page') ?? '1';

    router.push(
      `/products/new?returnCategory=${
        returnCategory === 'products' ? 'all' : returnCategory
      }&returnPage=${returnPage}`
    );
  };
  return (
    <motion.button
      className='fixed bottom-27 right-5 flex justify-center items-center size-10 rounded-full bg-theme-primary shadow-primary text-sm font-semibold cursor-pointer z-35 md:size-12 md:text-lg md:bottom-10'
      whileTap={{ scale: 1.1, y: -5 }}
      whileHover={{ scale: 1.1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
      onClick={handleClick}
    >
      <PlusIcon />
    </motion.button>
  );
}
