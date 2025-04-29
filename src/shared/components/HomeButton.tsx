'use client';
import { HomeIcon } from '@/shared/components/icons/HomeIcon';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';

export function HomeButton(props: ComponentPropsWithoutRef<'button'>) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button {...props} onClick={handleClick}>
      <HomeIcon className='size-full' />
    </button>
  );
}
