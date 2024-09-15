import { forwardRef } from 'react';

import { BaseTransition, BaseTransitionProps } from '@/components/Animations/BaseTransition';
import styles from '@/components/Animations/SlideTransition.module.css';

export const SlideTranstion = forwardRef<
  HTMLDivElement,
  Omit<BaseTransitionProps, 'classNames' | 'timeout'>
>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <BaseTransition
      ref={ref}
      timeout={500}
      classNames={{
        enter: styles.slideEnter,
        enterActive: styles.slideEnterActive,
        exit: styles.slideExit,
        exitActive: styles.slideExitActive,
      }}
      {...rest}
    >
      {children}
    </BaseTransition>
  );
});

// ----------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
  SlideTranstion.displayName = 'SlideTranstion';
}
