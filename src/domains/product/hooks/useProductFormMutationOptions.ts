'use client';
import { createProduct, ProductUpdateRequest, updateProduct } from '@/domains/product';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';

interface Props {
  id?: string;
  mode?: 'new' | 'edit';
  category?: string;
  returnCategory: string;
  returnPage: string;
}
/**
 * ProductFormContainer에서 useMutation의 mutation options 객체를 반환하는 훅
 *
 * - 상품 생성/수정 시 공통적으로 사용하는 mutationFn, onMutate, onSettled을 mode에 따라 분기 처리
 * - 성공 시 toast 메시지를 표시하고, 관련 products 캐시를 invalidate
 * - 작업 완료 후에는 알맞은 페이지로 router.replace를 통해 이동
 */
export function useProductFormMutationOptions({
  id,
  mode,
  category,
  returnCategory,
  returnPage,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMemo(() => {
    if (mode === 'new') {
      return {
        mutationFn: createProduct,
        onMutate: () => {
          const loadingId = toast.loading('Creating product...');
          return { loadingId };
        },
        onSettled: (
          _: unknown,
          error: unknown,
          __: unknown,
          context?: { loadingId?: string | number }
        ) => {
          toast.dismiss(context?.loadingId);

          if (error) {
            toast.error('Failed to create product.');
            return;
          }

          toast.success('Product created successfully.');
          queryClient.invalidateQueries({ queryKey: ['products'] });

          let replacePathname = '/products';
          if (returnCategory !== 'all') {
            replacePathname += `/${returnCategory}`;
          }
          router.replace(`${replacePathname}?page=${returnPage}`);
        },
      };
    }

    // update
    return {
      mutationFn: (data: ProductUpdateRequest) => updateProduct(id as string, data),
      onMutate: () => {
        const loadingId = toast.loading('Updating product...');
        return { loadingId };
      },
      onSettled: (
        _: unknown,
        error: unknown,
        __: unknown,
        context?: { loadingId?: string | number }
      ) => {
        toast.dismiss(context?.loadingId);

        if (error) {
          toast.error('Failed to update product.');
          return;
        }

        toast.success('Product updated successfully.');
        queryClient.invalidateQueries({ queryKey: ['products'] });

        router.replace(
          `/products/${category}/${id}?returnCategory=${returnCategory}&returnPage=${returnPage}`
        );
      },
    };
  }, []);
}
