import { useContext, createContext, useState, ReactNode } from 'react';
import { IClassName, IPropsChildren } from '../../types/common.types';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { TabPanels } from './TabPanels';
import { TabSwitcher } from './TabSwitcher';

// =================================================================

type RenderTab = {
  isActive: boolean;
  child: ReactNode;
  href?: string;
  onClick?: VoidFunction;
};

export type TabState = {
  activeIndex: number;
  handleActiveTab: (index: number) => void;
  renderTab?: (tab: RenderTab) => JSX.Element;
  isRouterBased?: boolean;
  switcherClassName?: string;
  switcherItemClassName?: string;
  tabPanelsClassName?: string;
};

interface TabsProps
  extends IPropsChildren,
  IClassName,
  Omit<TabState, 'activeIndex' | 'handleActiveTab'> { }

// =================================================================

const TabsContext = createContext<TabState | null>(null);

// =================================================================

export const Tabs = (props: TabsProps) => {
  const {
    children,
    renderTab,
    className,
    switcherClassName,
    switcherItemClassName,
    tabPanelsClassName,
    isRouterBased = false,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleActiveTab = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <TabsContext.Provider
      value={{
        activeIndex,
        handleActiveTab,
        renderTab,
        switcherClassName,
        switcherItemClassName,
        tabPanelsClassName,
        isRouterBased,
      }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// =================================================================

export const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabs should be used within TabsContext!');
  }

  return context;
};

// =================================================================

Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
Tabs.Panels = TabPanels;
Tabs.Switcher = TabSwitcher;
