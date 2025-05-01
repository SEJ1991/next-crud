'use client';
import { ProductCategory, ProductFormType, ProductInfo } from '@/domains/product';
import { ConfirmButton, ImageUploader } from '@/shared';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface Props {
  mode?: 'new' | 'edit';
  categories: ProductCategory[];
  product?: ProductInfo;
  onClcikBack: () => void;
  onSubmit: (data: ProductFormType) => void;
}

export function ProductForm({ mode = 'new', categories, product, onClcikBack, onSubmit }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<ProductFormType>({
    defaultValues: {
      title: product?.title,
      description: product?.description,
      price: product?.price,
      discountPercentage: product?.discountPercentage,
      rating: product?.rating,
      stock: product?.stock,
      brand: product?.brand,
      category: product?.category,
    },
  });

  const handleValid = (formData: ProductFormType) => {
    if (mode === 'new') {
      onSubmit(formData);
      return;
    }

    const dirtyFormData: Partial<ProductFormType> = {};
    Object.keys(dirtyFields).forEach(field => {
      const key = field as keyof ProductFormType;
      const value = formData[key];

      if (value !== undefined) {
        (dirtyFormData as Record<string, unknown>)[key] = value;
      }
    });

    onSubmit(dirtyFormData as ProductFormType);
  };

  return (
    <form className='flex flex-col gap-6'>
      <Controller
        name='thumbnail'
        control={control}
        rules={{
          validate: value => {
            if (value instanceof File || (mode === 'edit' && value === undefined)) return true;
            return 'Thumbnail is required.';
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormLabelField labelText='Thumbnail' isError={!!error?.message}>
            <motion.div
              variants={IMAGE_VARIANTS}
              whileHover='whileHover'
              className={clsx(
                'size-40 rounded-md cursor-pointer bg-theme-primary overflow-hidden shadow-secondary',
                error?.message && ERROR_BORDER
              )}
            >
              <ImageUploader
                value={value}
                onChange={onChange}
                initPreviewUrl={product?.thumbnail}
              />
            </motion.div>
          </FormLabelField>
        )}
      />
      <FormLabelField labelText='Images'>
        <div className='flex gap-2 flex-wrap'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Controller
              key={index}
              name={`images.${index}`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <motion.div
                  variants={IMAGE_VARIANTS}
                  whileHover='whileHover'
                  className='size-40 rounded-md cursor-pointer bg-theme-primary overflow-hidden shadow-secondary'
                >
                  <ImageUploader
                    value={value}
                    onChange={onChange}
                    initPreviewUrl={product?.images?.[index]}
                  />
                </motion.div>
              )}
            />
          ))}
        </div>
      </FormLabelField>

      <div className='flex flex-col gap-2 sm:flex-row'>
        <FormLabelField labelText='Title' isError={!!errors.title?.message}>
          <input
            {...register('title', {
              required: 'Title is required.',
            })}
            className={clsx('max-w-50 form-input-layout', errors.title?.message && ERROR_BORDER)}
          />
        </FormLabelField>
        <FormLabelField labelText='Brand'>
          <input {...register('brand')} className='max-w-50 form-input-layout' />
        </FormLabelField>
      </div>
      <FormLabelField labelText='Category' isError={!!errors.category?.message}>
        <select
          {...register('category', { required: 'Category is required.' })}
          className={clsx(
            'w-50 form-input-layout cursor-pointer',
            errors.category?.message && ERROR_BORDER
          )}
        >
          {categories.map(({ name, slug }) => (
            <option key={slug} value={slug}>
              {name}
            </option>
          ))}
        </select>
      </FormLabelField>
      <FormLabelField labelText='Dscription'>
        <textarea
          {...register('description')}
          className='w-full max-w-[800px] h-50 form-input-layout resize-none'
        />
      </FormLabelField>
      <div className='flex gap-2'>
        <FormLabelField labelText='Price' isError={!!errors.price?.message}>
          <input
            type='number'
            step='0.01'
            {...register('price', {
              required: 'Price is required.',
              valueAsNumber: true,
              validate: (value = 0) => !isNaN(value) || 'Invalid number',
            })}
            className={clsx('w-25 form-input-layout', errors.price?.message && ERROR_BORDER)}
          />
        </FormLabelField>
        <FormLabelField labelText='Discount(%)'>
          <input
            type='number'
            step='0.01'
            {...register('discountPercentage', {
              valueAsNumber: true,
              validate: (value = 0) => !isNaN(value) || 'Invalid number',
            })}
            className='w-25 form-input-layout'
          />
        </FormLabelField>
        <FormLabelField labelText='Stock' isError={!!errors.stock?.message}>
          <input
            type='number'
            {...register('stock', {
              required: 'Stock is required.',
              valueAsNumber: true,
            })}
            className={clsx('w-25 form-input-layout', errors.stock?.message && ERROR_BORDER)}
          />
        </FormLabelField>
      </div>
      <div className='flex justify-center gap-2 pt-4'>
        <button
          type='button'
          className='px-6 py-2 border border-opposite-theme-primary rounded-md'
          onClick={onClcikBack}
        >
          Back
        </button>
        <ConfirmButton
          type='button'
          className='bg-accent-primary text-white-primary px-6 py-2 rounded-md'
          onConfirm={handleSubmit(handleValid)}
        >
          {mode === 'new' ? 'Create' : 'Update'}
        </ConfirmButton>
      </div>
    </form>
  );
}

const ERROR_BORDER = 'border border-red-400';
const IMAGE_VARIANTS = {
  whileHover: {
    scale: 1.4,
    zIndex: 2,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 1,
    },
  },
};

interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  labelText?: string;
  isError?: boolean;
}
function FormLabelField({ labelText, isError, ...props }: FormFieldProps) {
  return (
    <div
      {...props}
      className={twMerge(clsx('flex flex-col gap-1', isError && 'text-red-400'), props.className)}
    >
      <label className='font-semibold'>{labelText}</label>
      {props.children}
    </div>
  );
}
