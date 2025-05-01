'use client';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback, useEffect, ComponentPropsWithoutRef, MouseEvent } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { PlusIcon } from '@/shared';
import { XIcon } from './icons/XIcon';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'className'> {
  value?: File | null;
  initPreviewUrl?: string | null;
  onChange?: (file: File | null) => void;
}
export function ImageUploader({ className, value, initPreviewUrl = null, onChange }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initPreviewUrl);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    onChange?.(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleClickDelete = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    onChange?.(null);
  };

  useEffect(() => {
    if (!value) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(URL.createObjectURL(value));

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [value]);

  return (
    <div
      {...getRootProps()}
      className={twMerge(
        clsx(
          'relative size-full cursor-pointer transition-colors duration-300',
          isDragActive && 'animate-pulse bg-skeleton-primary'
        ),
        className
      )}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <>
          <button
            type='button'
            className='absolute top-1 right-1 size-[20%] rounded-md bg-gray-700/70 z-1 transition-opacity duration-500 text-white-primary hover:opacity-70'
            onClick={handleClickDelete}
          >
            <XIcon className='size-full' />
          </button>
          <Image src={previewUrl} alt='preview image' className='absolute inset-0 size-full' fill />
        </>
      ) : (
        <div className='absolute top-1/2 left-1/2 -translate-1/2 size-10 rounded-full opacity-70'>
          <PlusIcon className='size-full' />
        </div>
      )}
    </div>
  );
}
