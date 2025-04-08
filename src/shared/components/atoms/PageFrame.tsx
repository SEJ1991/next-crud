import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function PageFrame(props: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      {...props}
      className={twMerge(
        'min-h-dvh px-page-frame-x pt-top-with-header-h pb-page-frame-y',
        props.className
      )}
    >
      {props.children}
    </section>
  );
}
