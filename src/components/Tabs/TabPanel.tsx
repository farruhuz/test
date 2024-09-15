import { IPropsChildren } from '../../types/common.types';

export const TabPanel = (props: IPropsChildren) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  )
};
