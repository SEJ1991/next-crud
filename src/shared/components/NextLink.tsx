import Link from 'next/link';
import { ComponentProps } from 'react';

/**
 * 외부링크는 target='_blank', rel='noopener noreferrer' 처리가 자동으로 되도록 하는 커스텀 Link 컴포넌트
 */
export function NextLink(props: ComponentProps<typeof Link>) {
  const isExternal = typeof props.href === 'string' && isExternalLink(props.href);

  return (
    <Link
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {props.children}
    </Link>
  );
}

/**
 * 절대경로, 상대경로를 판단하여 외부 경로는 true, 내부 경로는 false로 리턴하는 함수
 *
 * @param url
 */
function isExternalLink(url: string) {
  return !url.startsWith('/') && !url.startsWith('#');
}
