import { getProduct } from '@/domains/product';
import { PageFrame } from '@/shared';
import { QueryClient } from '@tanstack/react-query';
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

  return <PageFrame>{id}</PageFrame>;
}

export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const product = await getProduct(id);

  if (!product) notFound();

  const title = `${product.title} | NEXT-CRUD`;
  const description = product.description;
  const image = product.thumbnail;

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
          alt: product.title,
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
