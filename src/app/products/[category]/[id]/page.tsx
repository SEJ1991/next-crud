import { getProduct, ProductDetailContainer } from '@/domains/product';
import { PageFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
interface Props {
  params: Promise<{ id: string }>;
}
export default async function ProductPage({ params }: Props) {
  const id = (await params).id;
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
          <ProductDetailContainer id={id} />
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
