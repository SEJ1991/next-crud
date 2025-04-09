import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
interface Props extends ComponentPropsWithoutRef<'section'> {
  title?: string;
}
export function ContentsRow({ title, ...props }: Props) {
  return (
    <section {...props} className={twMerge('flex flex-col gap-3', props.className)}>
      <h2 className='text-2xl text-accent-primary'>{title}</h2>
      <hr className='text-border-primary' />
      {props.children}
    </section>
  );
}
