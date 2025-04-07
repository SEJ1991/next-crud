'use client';
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { useTheme } from 'next-themes';

interface Props extends ComponentPropsWithoutRef<'button'> {
  size?: string;
}
/**
 * 다크/라이트 모드 스위칭 버튼
 * @property {string | undefined} size react-icons 사이즈 (기본값: 2rem)
 */
export function ThemeButton({ size = '2rem', ...props }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const ThemeIcon = () => {
    const iconClassName = 'text-opposite-theme-primary transition-colors duration-300';

    if (theme === 'dark') return <BiMoon className={iconClassName} size={size} />;
    return <BiSun className={iconClassName} size={size} />;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      {...props}
      className={twMerge('transition-transform duration-800 hover:rotate-60', props.className)}
      onClick={handleClick}
    >
      <ThemeIcon />
    </button>
  );
}
