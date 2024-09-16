import { BrowserRouter } from 'react-router-dom';
import { IPropsChildren } from '../../types/common.types';

export const RouterProvider = (props: IPropsChildren) => {
  const { children } = props;

  return <BrowserRouter>{children}</BrowserRouter>;
};
