import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Header(props: ComponentPropsWithoutRef<'header'>) {
  return (
    <header
      {...props}
      className={twMerge(
        'w-full max-content-width h-header-h fixed px-page-frame-x border-b border-border-primary bg-theme-primary z-20',
        props.className
      )}
    >
      {props.children}
    </header>
  );
}
