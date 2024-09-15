import { ReactNode, forwardRef } from 'react';

interface FocusableProps {
  children: ReactNode;
  className?: string;
  shouldFocusOnMount?: boolean;
}

export const Focusable = forwardRef<HTMLDivElement, FocusableProps>((props, ref) => {
  const { children, className, shouldFocusOnMount = true } = props;

  const refCallback = (node: HTMLDivElement) => {
    if (node) {
      if (shouldFocusOnMount) {
        node.setAttribute('tabindex', '0');
        node.focus();
      }
      if (ref) {
        typeof ref === 'function' ? ref(node) : (ref.current = node);
      }
    }
  };

  return (
    <div ref={refCallback} className={className}>
      {children}
    </div>
  );
});
