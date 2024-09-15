import { ReactNode, useRef } from 'react';
import { useEffectOnce } from 'react-use';

import { twMerge } from 'tailwind-merge';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

import { FadeTransition } from '@/components/Animations';
import { Portal } from '@/components/Portal';

// ----------------------------------------------------------------

export interface OverlayProps {
  isOpen: boolean;
  shouldUseAnimation?: boolean;
  shouldUsePortal?: boolean;
  hasBackdrop?: boolean;
  canEscapeKeyClose?: boolean;
  backdropClassName?: string;
  onClose: VoidFunction;
  children: ReactNode;
  onOutsideClick: React.MouseEventHandler<HTMLDivElement>;
}

// ----------------------------------------------------------------

export const Overlay = (props: OverlayProps) => {
  const {
    isOpen,
    onClose,
    children,
    onOutsideClick,
    backdropClassName,
    shouldUseAnimation = true,
    shouldUsePortal = true,
    hasBackdrop = true,
    canEscapeKeyClose = true,
  } = props;

  const onCloseRef = useRef<VoidFunction>();
  if (!onCloseRef.current) {
    onCloseRef.current = () => {
      onClose();
    };
  }

  useLockBodyScroll(isOpen);

  useEffectOnce(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onCloseRef.current?.();
      }
    };

    if (canEscapeKeyClose) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  });

  const modal = (
    <div className="fixed inset-0 z-50">
      <div
        onClick={onOutsideClick}
        className={twMerge('absolute inset-0', backdropClassName, hasBackdrop && 'bg-black/45')}
      >
        {children}
      </div>
    </div>
  );

  const overlay = shouldUseAnimation ? (
    <FadeTransition inProp={isOpen}>{modal}</FadeTransition>
  ) : (
    modal
  );

  if (!isOpen && !shouldUseAnimation) {
    return null;
  }

  if (shouldUsePortal) {
    return <Portal>{overlay}</Portal>;
  }

  return overlay;
};
