import { ComponentProps } from 'react';
import { IoMdTrophy } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

export function TrophyIcon(props: ComponentProps<typeof IoMdTrophy>) {
  return <IoMdTrophy {...props} className={twMerge('text-amber-300', props.className)} />;
}
