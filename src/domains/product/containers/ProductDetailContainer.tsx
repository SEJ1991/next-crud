'use client';
import { getProduct } from '@/domains/product';
import { useQuery } from '@tanstack/react-query';

interface Props {
  id: string;
}
export function ProductDetailContainer({ id }: Props) {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    gcTime: 0,
    staleTime: 1000 * 60,
  });

  console.log(product);
  if (isLoading || isError || !product) return <div>로딩</div>;
  return <div>ProductDetailContainer</div>;
}
