import { ComponentProps } from 'react';
import { CiSearch } from 'react-icons/ci';

export function SearchIcon(props: ComponentProps<typeof CiSearch>) {
  return <CiSearch {...props} />;
}
