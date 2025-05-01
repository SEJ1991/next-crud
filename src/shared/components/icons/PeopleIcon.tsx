import React, { ComponentProps } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

export function PeopleIcon(props: ComponentProps<typeof FaPeopleGroup>) {
  return <FaPeopleGroup {...props} className={twMerge('text-gray-300', props.className)} />;
}
