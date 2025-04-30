'use client';
import { MovieWidgetSkeleton } from '@/domains/movie';
import { ProductWidget } from '@/domains/product/components/ProductWidget';
import { getAllProducts } from '@/domains/product/services/product';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function ProductWidgetContainer() {
  const router = useRouter();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', 'all', 1],
    queryFn: () => getAllProducts({ skip: 0 }),
    select: data => data.products,
  });

  const handleClick = () => {
    router.push('/products');
  };

  if (isLoading || isError || !products || products.length === 0) {
    return <MovieWidgetSkeleton onClick={handleClick} />;
  }
  return <ProductWidget products={products} onClick={handleClick} />;
}
