import { ArrowLeftIcon, ArrowRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@/shared';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'div'> {
  nowPage: number;
  pages: number[];
  lastPage: number;
  onClickPage: (page: number) => () => void;
}
export function Pagination({ nowPage, pages, lastPage, onClickPage, ...props }: Props) {
  const firstPageNumber = pages[0];
  const lastPageNumber = pages[pages.length - 1];

  const isNotFirstOffset = firstPageNumber !== 1;
  const isNotLastOffset = lastPageNumber !== lastPage;

  return (
    <div
      {...props}
      className={twMerge('flex justify-center items-center gap-2.5', props.className)}
    >
      <ArrowButton isActive={isNotFirstOffset} onClick={onClickPage(1)}>
        <DoubleArrowLeftIcon className='size-full' />
      </ArrowButton>
      <ArrowButton isActive={isNotFirstOffset} onClick={onClickPage(firstPageNumber - 1)}>
        <ArrowLeftIcon className='size-full' />
      </ArrowButton>

      <ul className='flex items-center gap-3'>
        {pages.map(page => (
          <li key={`pagination-${page}`}>
            <button
              className={clsx(nowPage === page && 'text-lg text-accent-primary font-semibold')}
              onClick={onClickPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <ArrowButton isActive={isNotLastOffset} onClick={onClickPage(lastPageNumber + 1)}>
        <ArrowRightIcon className='size-full' />
      </ArrowButton>
      <ArrowButton isActive={isNotLastOffset} onClick={onClickPage(lastPage)}>
        <DoubleArrowRightIcon className='size-full' />
      </ArrowButton>
    </div>
  );
}

interface ArrowButtonProps extends ComponentPropsWithoutRef<'button'> {
  isActive: boolean;
}
function ArrowButton({ isActive, ...props }: ArrowButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'size-6 opacity-20 transition-opacity duration-500 cursor-default',
        isActive && 'opacity-100 cursor-pointer'
      )}
      disabled={!isActive}
    >
      {props.children}
    </button>
  );
}
