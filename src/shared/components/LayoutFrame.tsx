import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function LayoutFrame(props: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      {...props}
      className={twMerge(
        'w-full max-w-[var(--size-max-contents-width)] min-h-dvh mx-auto',
        props.className
      )}
    >
      {props.children}
    </section>
  );
}
