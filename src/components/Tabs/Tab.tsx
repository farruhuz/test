import { IPropsChildren } from "../../types/common.types";
import { TabState } from "./Tabs";

interface TabProps extends IPropsChildren, Partial<Pick<TabState, 'renderTab'>> {
  href?: string;
  isActive?: boolean;
  onClick?: VoidFunction;
}

// =================================================================

export const Tab = (props: TabProps) => {
  const { isActive = false, renderTab, children, href, onClick } = props;

  if (typeof renderTab == 'function') {
    return renderTab({ isActive, child: children, href, onClick });
  }

  return (
    <>
      {children}
    </>
  )
};
