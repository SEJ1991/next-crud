import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Sidebar(props: ComponentPropsWithoutRef<'aside'>) {
  return (
    <aside
      {...props}
      className={twMerge(
        'sticky top-0 border-r border-border-primary h-dvh pt-top-with-header-h',
        props.className
      )}
    >
      {props.children}
    </aside>
  );
}
