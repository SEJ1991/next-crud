import { ComponentProps } from 'react';
import { MdAdd } from 'react-icons/md';

export function PlusIcon(props: ComponentProps<typeof MdAdd>) {
  return <MdAdd {...props} />;
}
