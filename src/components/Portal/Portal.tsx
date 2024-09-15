import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffectOnce } from 'react-use';

import { IPropsChildren } from '@/types/common.types';

// ----------------------------------------------------------------

export const Portal = (props: IPropsChildren) => {
  const { children } = props;

  const portalRef = useRef<HTMLElement | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffectOnce(() => {
    portalRef.current = document.getElementById('portal');
    setIsMounted(true);
  });

  if (isMounted) {
    return ReactDOM.createPortal(children, portalRef.current!);
  }

  return null;
};
