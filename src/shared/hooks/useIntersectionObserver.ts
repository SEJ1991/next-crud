import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps<T extends Element> {
  isAvailable: boolean;
  onIntersect: () => void;
  options?: IntersectionObserverInit;
}

export function useIntersectionObserver<T extends Element = Element>({
  isAvailable,
  onIntersect,
  options,
}: UseIntersectionObserverProps<T>) {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!targetRef.current || !isAvailable) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    }, options);

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [options, isAvailable, onIntersect]);

  return targetRef;
}
