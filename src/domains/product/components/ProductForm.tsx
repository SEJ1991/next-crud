'use client';
import { ProductCategory, ProductFormType } from '@/domains/product';
import { ConfirmButton } from '@/shared';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props {
  mode?: 'new' | 'edit';
  categories: ProductCategory[];
  defaultValues?: ProductFormType;
  onClcikBack: () => void;
  onSubmit: (data: ProductFormType) => void;
}

export function ProductForm({
  mode = 'new',
  categories,
  defaultValues,
  onClcikBack,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm<ProductFormType>({
    defaultValues,
  });

  const handleValid = (formData: ProductFormType) => {
    if (mode === 'new') {
      onSubmit(formData);
      return;
    }

    const dirtyFormData: ProductFormType = {};
    Object.keys(dirtyFields).forEach(field => {
      const key = field as keyof ProductFormType;
      const value = formData[key];

      if (value !== undefined) {
        dirtyFormData[key] = value;
      }
    });

    onSubmit(dirtyFormData);
  };

  return (
    <form className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2 sm:flex-row'>
        <FormLabelField labelText='Title' className={clsx(errors.title?.message && 'text-red-400')}>
          <input
            {...register('title', {
              required: 'Title is required.',
            })}
            className={clsx(
              'max-w-50 form-input-layout',
              errors.title?.message && 'border border-red-400'
            )}
            placeholder={errors.title?.message}
          />
        </FormLabelField>
        <FormLabelField labelText='Brand'>
          <input {...register('brand')} className='max-w-50 form-input-layout' />
        </FormLabelField>
      </div>
      <FormLabelField
        labelText='Category'
        className={clsx(errors.category?.message && 'text-red-400')}
      >
        <select
          {...register('category', { required: 'Category is required.' })}
          className={clsx(
            'w-50 form-input-layout cursor-pointer',
            errors.category?.message && 'border border-red-400'
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
        <FormLabelField labelText='Price'>
          <input
            type='number'
            step='0.01'
            {...register('price', {
              valueAsNumber: true,
              validate: (value = 0) => !isNaN(value) || 'Invalid number',
            })}
            className='w-25 form-input-layout'
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
        <FormLabelField labelText='Stock'>
          <input type='number' {...register('stock')} className='w-25 form-input-layout' />
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

interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  labelText?: string;
}
function FormLabelField({ labelText, ...props }: FormFieldProps) {
  return (
    <div {...props} className={twMerge('flex flex-col gap-1', props.className)}>
      <label className='font-semibold'>{labelText}</label>
      {props.children}
    </div>
  );
}
