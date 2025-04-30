import { getCategories, getProduct, ProductFormContainer } from '@/domains/product';
import { PageFrame } from '@/shared';
import { QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string; category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function ProductEditPage({ params, searchParams }: Props) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const id = awaitedParams.id;
  const category = awaitedParams.category;

  const returnCategory = awaitedSearchParams.returnCategory;
  const returnPage = awaitedSearchParams.returnPage ?? '1';

  const queryClient = new QueryClient();
  const [productResult, categoriesResult] = await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['products', id],
      queryFn: () => getProduct(id),
      staleTime: 0,
      gcTime: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: () => getCategories(),
    }),
  ]);

  if (productResult.status === 'rejected' || categoriesResult.status === 'rejected') {
    notFound();
  }

  return (
    <PageFrame className='flex flex-col gap-8 pt-page-frame-with-header-height md:!pt-[var(--size-page-frame-padding-y)]'>
      <section className='flex flex-col gap-6'>
        <h1 className='text-4xl font-semibold'>Edit Product</h1>
        <ProductFormContainer
          id={id}
          mode='edit'
          category={category}
          returnCategory={category === returnCategory ? category : 'all'}
          returnPage={returnPage}
        />
      </section>
    </PageFrame>
  );
}

export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const product = await getProduct(id);

  if (!product) notFound();
  const { description, thumbnail, title: productTitle } = product;
  const title = `${product.title} Edit | NEXT-CRUD`;
  const image = thumbnail;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: productTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
