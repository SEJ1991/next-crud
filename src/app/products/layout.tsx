import { ProductSidebar } from '@/domains/product';
import { LayoutFrame } from '@/shared';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
export default function ProductLayout({ children }: Props) {
  return (
    <LayoutFrame className='flex'>
      <ProductSidebar />
      <main>{children}</main>
    </LayoutFrame>
  );
}
