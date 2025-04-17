import { ComponentProps } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function SpinnerIcon(props: ComponentProps<typeof AiOutlineLoading3Quarters>) {
  return <AiOutlineLoading3Quarters {...props} />;
}
