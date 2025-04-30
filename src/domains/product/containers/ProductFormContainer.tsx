'use client';
import { getProduct, useProductFormMutationOptions } from '@/domains/product';
import { useMutation, useQuery } from '@tanstack/react-query';

interface Props {
  id?: string;
  mode?: 'new' | 'edit';
  category?: string;
  returnCategory: string;
  returnPage: string;
}
export function ProductFormContainer({
  id,
  mode = 'new',
  category,
  returnCategory,
  returnPage,
}: Props) {
  const mutationOptions = useProductFormMutationOptions({
    id,
    mode,
    category,
    returnCategory,
    returnPage,
  });

  const { mutate } = useMutation(mutationOptions);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id as string),
    gcTime: 0,
    staleTime: 1000 * 60,
    enabled: mode === 'edit' && !!id,
  });

  if (mode === 'edit' && (!product || isLoading || isError)) return <div>로딩</div>;
  return <div>ProductFormContainer</div>;
}
