'use client';
import { ProductNav } from '@/domains/product';
import { getCategories } from '@/domains/product';
import { useQuery } from '@tanstack/react-query';

export function ProductNavContainer() {
  const {
    data: categories,
    isLoading,
    isError,
    isRefetching,
    isRefetchError,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    select: data => data.map(({ slug, name }) => ({ href: `/products/${slug}`, label: name })),
  });

  const handleClickRefresh = () => {
    refetch();
  };

  if (isLoading || isError || isRefetching || isRefetchError || !categories) return <div>로딩</div>;
  return (
    <ProductNav
      links={[{ href: '/products', label: 'All' }].concat(categories)}
      onClickRefresh={handleClickRefresh}
    />
  );
}
