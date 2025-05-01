import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function PageFrame(props: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={twMerge(
        'w-full min-h-dvh px-[var(--size-page-frame-padding-x)] py-[var(--size-page-frame-padding-y)]',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
