import { ComponentProps } from 'react';
import { BiMoon } from 'react-icons/bi';

export function MoonIcon(props: ComponentProps<typeof BiMoon>) {
  return <BiMoon {...props} />;
}
