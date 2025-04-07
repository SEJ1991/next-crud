import React, { ComponentPropsWithoutRef } from 'react';
import { BiMoon } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'button'> {
  iconSize?: string;
}
/**
 * 다크/라이트 모드 스위칭 버튼
 * @property {string | undefined} size react-icons 사이즈 (기본값: 2rem)
 */
export function ThemeButton({ iconSize = '2rem', ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge('transition-transform duration-800 hover:rotate-60', props.className)}
    >
      <BiMoon
        className='text-opposite-theme-primary transition-colors duration-300'
        size={iconSize}
      />
    </button>
  );
}
