'use client';
import { ProductGridList } from '@/domains/product/components/ProductGridList';
import { getAllProducts } from '@/domains/product/services/product';
import { useQuery } from '@tanstack/react-query';

interface Props {
  category?: string;
  skip: number;
}
export function ProductGridListContainer({ category = 'all', skip }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category, skip],
    queryFn: () => getAllProducts({ skip }),
  });

  const products = data?.products ?? [];
  return <ProductGridList products={products} />;
}
