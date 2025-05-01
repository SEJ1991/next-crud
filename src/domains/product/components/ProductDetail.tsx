'use client';
import {
  getDiscountPrice,
  ProductDetailPolicySection,
  ProductDetailReviewSection,
  ProductInfo,
  ProductRatingBadge,
} from '@/domains/product';
import { ArrowLeftIcon, ConfirmButton, ImageWithSkeleton } from '@/shared';
import clsx from 'clsx';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  product: ProductInfo;
  onClickBack: () => void;
  onClickEdit: (id: number, category: string) => () => void;
  onClickDelete: (id: number) => () => void;
}
export function ProductDetail({
  product: {
    id, // 상품 ID
    title, // 상품 이름
    description, // 상품 설명
    brand, // 브랜드 이름
    category, // 카테고리 이름
    price, // 가격 (정가)
    discountPercentage, // 할인율 (% 단위)
    images, // 상품 이미지 배열
    rating, // 평균 평점 (0~5)
    stock,
    minimumOrderQuantity, // 최소 주문 수량
    availabilityStatus,
    warrantyInformation, // 보증/AS 정보
    shippingInformation, // 배송 안내
    returnPolicy, // 반품/환불 정책
    reviews, // 유저 리뷰 목록
    weight, // 상품 무게
    dimensions: {
      width, // 상품 너비
      height, // 상품 높이
      depth, // 상품 깊이
    },
  },
  onClickBack,
  onClickEdit,
  onClickDelete,
}: Props) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const handleClickImg = (index: number) => () => {
    setSelectedImgIndex(index);
  };

  const isDiscount = discountPercentage > 0;
  return (
    <div className='flex flex-col gap-16 lg:w-[80%]'>
      <div className='flex items-center gap-4'>
        <button
          onClick={onClickBack}
          className='size-10 border border-border-primary rounded-md shrink-0'
        >
          <ArrowLeftIcon className='size-full' />
        </button>
        <h1 className='text-4xl font-semibold'>{title}</h1>
        <div className='flex flex-col gap-2 sm:flex-row'>
          <button
            className='border border-border-primary px-5 py-2 rounded-md'
            onClick={onClickEdit(id, category)}
          >
            Edit
          </button>
          <ConfirmButton
            className='px-5 py-2 rounded-md bg-red-500 text-white-primary'
            onConfirm={onClickDelete(id)}
          >
            Delete
          </ConfirmButton>
        </div>
      </div>
      <section className='flex flex-col'>
        <div className='flex flex-col items-center gap-6 lg:flex-row lg:items-stretch'>
          <div>
            <div className='relative aspect-square size-80 rounded-md mx-auto mb-2 overflow-hidden'>
              <ProductRatingBadge rating={rating} />
              <ImageWithSkeleton
                src={images[selectedImgIndex]}
                alt={`${title}'s selected image`}
                sizes={`
                  (min-width: 1024px) 70vw,
                  (min-width: 768px) 40vw,
                  (min-width: 480px) 50vw,
                  60vw
              `}
                priority
              />
            </div>
            <ul className='flex gap-2 justify-center'>
              {images.map((image, index) => (
                <li key={image}>
                  <button
                    className={clsx(
                      'relative aspect-square size-20 rounded-md overflow-hidden',
                      selectedImgIndex === index && 'border border-opposite-theme-primary'
                    )}
                    onClick={handleClickImg(index)}
                  >
                    <ImageWithSkeleton
                      src={image}
                      alt={`${title}'s one of images`}
                      sizes={`
                        (min-width: 1024px) 35vw,
                        (min-width: 768px) 20vw,
                        (min-width: 480px) 25vw,
                        30vw
                    `}
                      priority
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col justify-between gap-4 w-[80%]'>
            <dl className='flex flex-col gap-1'>
              <dt className='text-3xl'>
                {title} {brand && <span className='text-lg text-gray-500'>({brand})</span>}
              </dt>
              <dd>category: {category}</dd>
              <dd>description: {description}</dd>
              <dd>
                price:{' '}
                <span className={clsx(isDiscount && 'mr-2 text-gray-500 line-through')}>
                  ${price.toLocaleString()}
                </span>
                {isDiscount && (
                  <span className='text-red-500'>
                    ➡️
                    <strong className='ml-2'>
                      ${getDiscountPrice(price, discountPercentage).toLocaleString()}
                    </strong>
                    ({discountPercentage}%)
                  </span>
                )}
              </dd>
              <dd>minimum order quantity: {minimumOrderQuantity.toLocaleString()}</dd>
              <dd>stock: {stock.toLocaleString()}</dd>
              <dd>
                <p>weight: {weight}g</p>
                <p>width: {width}cm</p>
                <p>height: {height}cm</p>
                <p>depth: {depth}cm</p>
              </dd>
            </dl>
            <div className='flex gap-2'>
              <motion.button
                className='w-30 h-12 text-white-primary bg-accent-primary text-xl rounded-md'
                variants={BUTTON_VARINATS}
                whileHover='whileHover'
                whileTap='whileTap'
                disabled={availabilityStatus === 'Out of Stock'}
              >
                Buy
              </motion.button>
              <motion.button
                className='w-30 h-12 text-xl border rounded-md'
                variants={BUTTON_VARINATS}
                whileHover='whileHover'
                whileTap='whileTap'
              >
                Cart
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      <ProductDetailReviewSection reviews={reviews} />
      <ProductDetailPolicySection
        warrantyInformation={warrantyInformation}
        shippingInformation={shippingInformation}
        returnPolicy={returnPolicy}
      />
    </div>
  );
}

const BUTTON_VARINATS = {
  whileHover: {
    y: -2,
  },
  whileTap: {
    y: 3,
  },
  transition: {
    type: 'spring',
    duration: 0.5,
    stiffness: 300,
    damping: 20,
  },
};
