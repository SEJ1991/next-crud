import { ComponentProps } from 'react';
import { MdOutlineClose } from 'react-icons/md';

export function XIcon(props: ComponentProps<typeof MdOutlineClose>) {
  return <MdOutlineClose {...props} />;
}
