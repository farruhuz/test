import { Children, cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { IPropsChildren } from '../../types/common.types';
import { useTabs } from './Tabs';

interface TabSwitcherProps extends IPropsChildren { }

export const TabSwitcher = (props: TabSwitcherProps) => {
  const { children } = props;

  const {
    activeIndex,
    switcherClassName,
    switcherItemClassName,
    renderTab,
    handleActiveTab
  } = useTabs();

  if (Array.isArray(children)) {
    return (
      <ul className={twMerge('flex items-center gap-2', switcherClassName)}>
        {Children.map(children, (child, index) => (
          <li key={index} onClick={() => handleActiveTab(index)} className={switcherItemClassName}>
            {cloneElement(child, { isActive: activeIndex === index, renderTab })}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};
