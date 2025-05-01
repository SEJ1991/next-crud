import { getProduct, ProductDetailContainer } from '@/domains/product';
import { PageFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
interface Props {
  params: Promise<{ id: string; category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function ProductPage({ params, searchParams }: Props) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const id = awaitedParams.id;
  const category = awaitedParams.category;

  const returnCategory = awaitedSearchParams.returnCategory;
  const returnPage = awaitedSearchParams.returnPage ?? '1';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    staleTime: 0,
    gcTime: 0,
  });

  if (!queryClient.getQueryData(['products', id])) {
    notFound();
  }

  return (
    <PageFrame className='flex flex-col gap-8 pt-page-frame-with-header-height md:!pt-[var(--size-page-frame-padding-y)]'>
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductDetailContainer
            id={id}
            returnCategory={category === returnCategory ? category : 'all'}
            returnPage={returnPage}
          />
        </HydrationBoundary>
      </section>
    </PageFrame>
  );
}

export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const product = await getProduct(id);

  if (!product) notFound();
  const { description, thumbnail, title: productTitle } = product;
  const title = `${product.title} | NEXT-CRUD`;
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
