import { ReactNode, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

// ----------------------------------------------------------------

const defaultRenderElement = (children: ReactNode) => {
  return <>{children}</>;
};

// ----------------------------------------------------------------

type ClassNames = {
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
};

export interface BaseTransitionProps {
  renderElement?: (children: ReactNode) => JSX.Element;
  key?: string;
  inProp: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: number;
  classNames: ClassNames;
  children: ReactNode;
}

// ----------------------------------------------------------------

export const BaseTransition = forwardRef<HTMLDivElement, BaseTransitionProps>((props, ref) => {
  const {
    renderElement = defaultRenderElement,
    key,
    inProp,
    classNames,
    children,
    mountOnEnter = true,
    unmountOnExit = true,
    timeout = 200,
  } = props;

  return (
    <CSSTransition
      nodeRef={ref}
      key={key}
      in={inProp}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      timeout={timeout}
      classNames={classNames}
    >
      {renderElement(children)}
    </CSSTransition>
  );
});

