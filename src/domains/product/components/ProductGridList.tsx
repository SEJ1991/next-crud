import { getDiscountPrice, Product, ProductRatingBadge } from '@/domains/product';
import { ImageWithSkeleton } from '@/shared';
import clsx from 'clsx';

interface Props {
  products: Product[];
  onClickCard: (id: number, category: string) => () => void;
}
export function ProductGridList({ products, onClickCard }: Props) {
  if (products.length === 0) return <h2>No products available.</h2>;
  return (
    <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6'>
      {products.map(
        ({ id, title, price, discountPercentage, thumbnail, stock, rating, category }) => (
          <li
            key={`grid-products-${id}`}
            className='p-2 rounded-md cursor-pointer shadow-secondary overflow-hidden'
            onClick={onClickCard(id, category)}
          >
            <div className='relative aspect-square rounded-md overflow-hidden'>
              <ProductRatingBadge rating={rating} />
              <ImageWithSkeleton
                src={thumbnail}
                alt={`${title}'s thumbnail`}
                sizes={`
              (min-width: 1024px) 15vw,
              (min-width: 768px) 18vw,
              (min-width: 480px) 30vw,
              43vw
          `}
              />
            </div>
            <dl className='text-center'>
              <dt className='line-clamp-2'>{title}</dt>
              <dd>
                <p className={clsx(discountPercentage > 0 && 'text-gray-500 line-through')}>
                  ${price.toLocaleString()}
                </p>
                {discountPercentage > 0 && (
                  <span className='text-red-500'>
                    <strong>${getDiscountPrice(price, discountPercentage).toLocaleString()}</strong>
                    ({discountPercentage}%)
                  </span>
                )}
              </dd>
              <dd>stock: {stock.toLocaleString()}</dd>
            </dl>
          </li>
        )
      )}
    </ul>
  );
}
