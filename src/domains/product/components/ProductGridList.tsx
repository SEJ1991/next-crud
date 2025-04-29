import { Product } from '@/domains/product';
import { ImageWithSkeleton, StarIcon } from '@/shared';
import clsx from 'clsx';

interface Props {
  products: Product[];
}
export function ProductGridList({ products }: Props) {
  return (
    <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6'>
      {products.map(({ id, title, price, discountPercentage, thumbnail, stock, rating }) => (
        <li
          key={`grid-products-${id}`}
          className='p-2 rounded-md cursor-pointer shadow-secondary overflow-hidden'
        >
          <div className='relative aspect-square rounded-md overflow-hidden'>
            <div className='absolute top-0 right-0 flex justify-center items-center gap-1 px-2 py-0.5 bg-gray-800/80 text-white-primary rounded-md z-1'>
              <StarIcon className='size-4 text-amber-200' />
              {rating}
            </div>
            <ImageWithSkeleton src={thumbnail} alt={`${title}'s thumbnail`} />
          </div>
          <dl className='text-center'>
            <dt className='line-clamp-2'>{title}</dt>
            <dd>
              <p className={clsx(discountPercentage > 0 && 'text-gray-500 line-through')}>
                ${price.toLocaleString()}
              </p>
              {discountPercentage > 0 && (
                <span className='text-red-500'>
                  <strong>${getDiscountPrice(price, discountPercentage).toLocaleString()}</strong>(
                  {discountPercentage}%)
                </span>
              )}
            </dd>
            <dd>stock: {stock.toLocaleString()}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

function getDiscountPrice(price: number, discountPercentage: number) {
  const discount = price * (discountPercentage / 100);
  return Math.floor((price - discount) * 100) / 100;
}
