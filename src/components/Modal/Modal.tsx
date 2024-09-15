import FocusTrap from 'focus-trap-react';
import React, { useRef, useCallback } from 'react';

import { twMerge } from 'tailwind-merge';
import CloseSVG from '../../assets/icons/close.svg';
import { Overlay, OverlayProps } from '../Overlay/Overlay';
import { Focusable } from '../Focusable';
import { ModalTitle } from './ModalTitle';

// ----------------------------------------------------------------

export interface ModalProps extends Omit<OverlayProps, 'onOutsideClick'> {
  modalWrapperClassName?: string;
  className?: string;
  shoudlFocusOnMount?: boolean;
  hasCloseButton?: boolean;
  canOutsideClickClose?: boolean;
}

// ----------------------------------------------------------------

export const Modal = (props: ModalProps) => {
  const {
    className,
    modalWrapperClassName,
    children,
    isOpen,
    onClose,
    shoudlFocusOnMount = true,
    hasCloseButton = true,
    canOutsideClickClose = true,
    ...rest
  } = props;

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    event => {
      if (canOutsideClickClose) {
        if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
          onClose();
        }
      }
    },
    [onClose, canOutsideClickClose],
  );

  return (
    <Overlay isOpen={isOpen} onClose={onClose} onOutsideClick={handleOutsideClick} {...rest}>
      <div
        className={twMerge(
          'absolute left-1/2 top-1/2 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2',
          modalWrapperClassName,
        )}
      >
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            allowOutsideClick: true,
            escapeDeactivates: false,
          }}
        >
          <Focusable
            ref={nodeRef}
            shouldFocusOnMount={shoudlFocusOnMount}
            className={twMerge(
              'modal-box relative m-auto bg-white p-8 shadow-none outline-none',
              className,
            )}
          >
            {hasCloseButton && (
              <button type="button" onClick={onClose} className="absolute right-6 top-6">
                <CloseSVG />
              </button>
            )}
            {children}
          </Focusable>
        </FocusTrap>
      </div>
    </Overlay>
  );
};

// =================================================================
Modal.Title = ModalTitle;
