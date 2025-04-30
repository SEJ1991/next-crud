import {
  getCategories,
  getProductsByCategory,
  getSkip,
  ProductCreateButton,
  ProductGridListContainer,
} from '@/domains/product';
import { PageFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function ProductsByCategoryPage({ params, searchParams }: Props) {
  const category = (await params).category;
  const page = getPageParam((await searchParams).page);

  const categories = await getCategories();
  if (!categories.map(item => item.slug).includes(category)) {
    notFound();
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', category, page],
    queryFn: () => getProductsByCategory({ skip: getSkip(page) }, category),
    gcTime: 0,
    staleTime: 0,
  });

  return (
    <PageFrame className='flex flex-col gap-8 pt-page-frame-with-header-height md:!pt-[var(--size-page-frame-padding-y)]'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section className='flex flex-col gap-6'>
          <h1 className='text-4xl font-semibold'>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <ProductGridListContainer page={page} category={category} />
        </section>
      </HydrationBoundary>
      <ProductCreateButton />
    </PageFrame>
  );
}

function getPageParam(pageParam?: string) {
  if (!pageParam || isNaN(Number(pageParam))) return 1;
  return Number(pageParam);
}

export async function generateMetadata({ params }: Props) {
  const category = (await params).category;
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} products | NEXT-CRUD`;
  const description = `Browse products by ${category}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // url: '',
    },
    twitter: {
      title,
      description,
      // card: ''
    },
  };
}
