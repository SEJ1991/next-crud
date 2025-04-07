import React, { ComponentProps } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

/**
 * 스피너 컴포넌트
 * @property {string | undefined} size react-icons 사이즈 (기본값: 2rem)
 */
export function Spinner(props: ComponentProps<typeof AiOutlineLoading3Quarters>) {
  return (
    <AiOutlineLoading3Quarters
      {...props}
      className={twMerge('animate-spin duration-800', props.className)}
      size={props.size ?? '2rem'}
    />
  );
}
