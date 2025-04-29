'use client';
import { SearchIcon } from '@/shared';
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function Searchbar(props: ComponentPropsWithoutRef<'form'>) {
  const [input, setInput] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <form
      {...props}
      className={twMerge(
        'inline-flex border border-border-primary rounded-md overflow-hidden',
        props.className
      )}
    >
      <input type='text' className='p-2' onChange={handleChange} value={input} />
      <button type='submit' className='size-10 p-2 border-l border-border-primary'>
        <SearchIcon className='size-full' />
      </button>
    </form>
  );
}
