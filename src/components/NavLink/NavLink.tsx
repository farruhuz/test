import { memo } from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';

import { twMerge } from 'tailwind-merge';

import { IClassName } from '@/types/common.types';

// =================================================================

interface Props extends Omit<NavLinkProps, 'className'>, IClassName {}

// =================================================================

export const NavLink = memo((props: Props) => {
  const { className, ...rest } = props;

  return (
    <RouterNavLink
      className={({ isActive }) =>
        twMerge(
          className,
          !isActive && 'transition-colors duration-300 hover:text-primary',
          isActive && 'bg-primary text-white',
        )
      }
      {...rest}
    />
  );
});

// =================================================================

if (process.env.NODE_ENV !== 'production') {
  NavLink.displayName = 'NavLink';
}
