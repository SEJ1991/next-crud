import { ArrowForwardIcon } from '@/shared/components/icons/ArrowForwardIcon';
import { NextLink } from '@/shared/components/NextLink';
import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'section'> {
  title?: string;
  href?: string;
  headingElement?: 'h1' | 'h2';
}
/**
 * section의 주제를 나타내는 선택적인 속성을 받아 일관된 주제의 텍스트 스타일을 유지할 수 있는 section wrapper 컴포넌트
 *
 * @property {string | undefined} title
 * @property {string | undefined} href 링크될 path (title과 href의 값이 있으면 Link 연동)
 * @property {'h1' | 'h2' | undefined} headingElement h1 또는 h2 엘리먼트 (기본값: 'h2')
 */
export function SectionFrame({ title, href, headingElement = 'h2', ...props }: Props) {
  const Title = () => {
    if (!title) return null;

    const titleClassName = 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2';
    if (href) {
      return (
        <NextLink className={`inline-flex items-center ${titleClassName} group`} href={href}>
          {title}
          <ArrowForwardIcon className='size-5 sm:size-6 md:size-7 lg:size-8 group-hover:animate-pulse' />
        </NextLink>
      );
    }

    if (headingElement === 'h1') return <h1 className={titleClassName}>{title}</h1>;
    return <h2 className={titleClassName}>{title}</h2>;
  };
  return (
    <section {...props}>
      <Title />
      {props.children}
    </section>
  );
}
