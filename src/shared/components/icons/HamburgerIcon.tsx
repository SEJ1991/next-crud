import { ComponentPropsWithRef } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

export function HamburgerIcon(props: ComponentPropsWithRef<typeof RxHamburgerMenu>) {
  return <RxHamburgerMenu {...props} />;
}
