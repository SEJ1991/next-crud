import { ProductRatingBadge, ProductInfo } from '@/domains/product';
import { motion } from 'framer-motion';

interface Props {
  reviews: ProductInfo['reviews'];
}
export function ProductDetailReviewSection({ reviews }: Props) {
  return (
    <section className='flex flex-col items-center gap-8'>
      <h2 className='text-2xl font-semibold'>User Reviews ({reviews.length})</h2>
      <ul>
        {reviews.map(
          ({ reviewerName, reviewerEmail, comment, rating: reviewRating, date }, index) => (
            <motion.li
              key={`review-${reviewerName}-${index}`}
              className='mb-4'
              initial={{
                opacity: 0,

                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 20,
                duration: 0.8,
                delay: index * 0.07,
              }}
            >
              <div className='flex flex-col gap-2 p-4 border border-border-primary rounded-md overflow-hidden'>
                <div className='flex justify-between items-center gap-2'>
                  <span className='text-gray-500'>
                    <strong className='text-opposite-theme-primary'>{reviewerName}</strong> (
                    {reviewerEmail})
                  </span>
                  <ProductRatingBadge className='relative' rating={reviewRating} />
                </div>
                <p>{comment}</p>
                <p className='text-end text-gray-500'>{getDate(date)}</p>
              </div>
            </motion.li>
          )
        )}
      </ul>
    </section>
  );
}

function getDate(date: string) {
  return new Date(date).toISOString().split('T')[0];
}
