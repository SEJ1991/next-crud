'use client';
import {
  createProduct,
  getCategories,
  ProductForm,
  ProductFormRequest,
  ProductFormType,
} from '@/domains/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
  returnCategory: string;
  returnPage: string;
}
export function ProductFormCreateContainer({ returnCategory, returnPage }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const { mutate } = useMutation({
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
  });

  const handleClickBack = () => {
    let replacePathname = `/products`;
    if (returnCategory !== 'all') {
      replacePathname += `/${returnCategory}`;
    }
    router.replace(`${replacePathname}?page=${returnPage}`);
    return;
  };

  const handleSubmit = (formData: ProductFormType) => {
    mutate(formData as ProductFormRequest);
  };

  return (
    <ProductForm
      mode='new'
      categories={categories ?? []}
      onClcikBack={handleClickBack}
      onSubmit={handleSubmit}
    />
  );
}
