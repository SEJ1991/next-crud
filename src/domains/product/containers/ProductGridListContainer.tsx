'use client';
import {
  ProductGridList,
  ProductGridListSkeleton,
  ProductPagination,
  ProductsResponse,
  getAllProducts,
  getProductsByCategory,
  getSkip,
} from '@/domains/product';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  category?: string;
  page: number;
}
export function ProductGridListContainer({ category = 'all', page }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category, page],
    queryFn: () => getProducts(category, page),
    gcTime: 0,
    staleTime: 0,
  });

  const handleClickPage = (page: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading || isError || !data) return <ProductGridListSkeleton />;
  return (
    <>
      <ProductGridList products={data.products} />
      {data.products.length > 0 && (
        <ProductPagination
          skip={data?.skip ?? 0}
          total={data?.total ?? 0}
          onClickPage={handleClickPage}
        />
      )}
    </>
  );
}

function getProducts(category: string, page: number): Promise<ProductsResponse> {
  const skip = getSkip(page);
  if (category === 'all') {
    return getAllProducts({ skip });
  }

  return getProductsByCategory({ skip }, category);
}
