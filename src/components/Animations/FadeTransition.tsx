import { forwardRef } from 'react';

import { BaseTransition, BaseTransitionProps } from '@/components/Animations/BaseTransition';
import styles from '@/components/Animations/FadeTransition.module.css';

export const FadeTransition = forwardRef<HTMLDivElement, Omit<BaseTransitionProps, 'classNames'>>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <BaseTransition
        ref={ref}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        {...rest}
      >
        {children}
      </BaseTransition>
    );
  },
);

// ----------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
  FadeTransition.displayName = 'FadeTransition';
}
