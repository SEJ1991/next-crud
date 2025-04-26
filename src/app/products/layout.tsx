import { LayoutFrame } from '@/shared';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
export default function ProductLayout({ children }: Props) {
  return (
    <LayoutFrame>
      <main>{children}</main>
    </LayoutFrame>
  );
}
