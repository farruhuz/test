import { forwardRef } from 'react';

import styles from './FadeTransition.module.css';
import { BaseTransition, BaseTransitionProps } from './BaseTransition';

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

