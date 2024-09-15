import { IPropsChildren } from "../../types/common.types";
import { useTabs } from "./Tabs";


export const TabPanels = (props: IPropsChildren) => {
  const { children } = props;

  const { activeIndex, tabPanelsClassName } = useTabs();

  return (
    <div className={tabPanelsClassName}>
      {Array.isArray(children) ? children[activeIndex] : children}
    </div>
  );
};
