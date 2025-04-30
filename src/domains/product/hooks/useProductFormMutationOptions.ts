import { createProduct, ProductUpdateRequest, updateProduct } from '@/domains/product';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { toast } from 'sonner';

interface Props {
  id?: string;
  mode?: 'new' | 'edit';
  category?: string;
  returnCategory: string;
  returnPage: string;
}
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
