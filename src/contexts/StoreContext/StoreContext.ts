import { IPropsChildren } from "../../types/common.types";

export const StoreProvider = (props: IPropsChildren) => {
  const { children } = props;

  return children;
};
