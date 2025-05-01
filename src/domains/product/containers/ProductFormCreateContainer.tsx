'use client';
import {
  createProduct,
  fakeUploadImagesToLikeS3,
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

  const { data: categories } = useQuery({
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

  const handleSubmit = async (formData: ProductFormType) => {
    const data: ProductFormRequest = {
      ...formData,
      title: formData.title as string,
      thumbnail: '',
      images: [],
    };

    const formCategory = formData.category;
    if (formData.thumbnail) {
      const dataThumbnail = await fakeUploadImagesToLikeS3([formData.thumbnail], formCategory);

      // return; 업로드 에러 발생시

      if (dataThumbnail[0]) {
        data.thumbnail = dataThumbnail[0];
      }
    }
    if (formData.images) {
      const dataImages = await fakeUploadImagesToLikeS3(formData.images, formCategory);

      // return; 업로드 에러 발생시

      data.images = dataImages.filter(img => img) as string[];
    }

    mutate(data);
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
