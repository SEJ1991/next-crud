import { ComponentProps } from 'react';
import { IoMdStar } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export function StarIcon(props: ComponentProps<typeof IoMdStar>) {
  return <IoMdStar {...props} className={twMerge('text-orange-300', props.className)} />;
}
