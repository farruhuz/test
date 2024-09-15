import { memo } from 'react';

import { twMerge } from 'tailwind-merge';

// =================================================================

export type BadgeType =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

interface BadgeProps {
  type?: BadgeType;
  text: string;
  className?: string;
}

const badgeType: Record<BadgeType, string> = {
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  ghost: 'badge-ghost',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

// =================================================================

export const Badge = memo((props: BadgeProps) => {
  const { text, type, className } = props;

  return <span className={twMerge('badge', className, type && badgeType[type])}>{text}</span>;
});

// =================================================================

if (process.env.NODE_ENV !== 'production') {
  Badge.displayName = 'Badge';
}
