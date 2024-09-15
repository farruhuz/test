import { memo, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

// =================================================================

interface ModalTitleProps {
  className?: string;
  children: ReactNode;
}

// =================================================================

export const ModalTitle = memo((props: ModalTitleProps) => {
  const { className, children } = props;

  return <div className={twMerge('text-2xl font-bold', className)}>{children}</div>;
});

// =================================================================

if (process.env.NODE_ENV !== 'production') {
  ModalTitle.displayName = 'ModalTitle';
}
