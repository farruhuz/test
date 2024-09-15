import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { IClassName } from '../../types/common.types';

interface PageTitleProps extends IClassName {
  title: string;
}

// =================================================================

export const PageTitle = memo((props: PageTitleProps) => {
  const { title, className } = props;
  return <h3 className={twMerge('text-[32px] font-semibold leading-10', className)}>{title}</h3>;
});

