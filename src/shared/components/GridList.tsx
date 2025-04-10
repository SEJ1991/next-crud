import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function GridList(props: ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul
      {...props}
      className={twMerge(
        'grid auto-cols-auto gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3',
        props.className
      )}
    >
      {props.children}
    </ul>
  );
}
