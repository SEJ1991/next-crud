import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Header(props: ComponentPropsWithoutRef<'header'>) {
  return (
    <header
      {...props}
      className={twMerge(
        'w-full h-header-h fixed shadow-shadow-primary shadow-md backdrop-blur-sm z-20',
        props.className
      )}
    >
      {props.children}
    </header>
  );
}
