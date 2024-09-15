import { forwardRef } from 'react';
import styles from '@/components/Animations/SlideTransition.module.css';
import { BaseTransition, BaseTransitionProps } from '.';

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

