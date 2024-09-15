import { forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';

// ----------------------------------------------------------------

type ButtonVariantType =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link'
  | 'outline'
  | 'active'
  | 'disabled';

// ----------------------------------------------------------------

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariantType;
}

// ----------------------------------------------------------------

const buttonVariantStyle: Record<ButtonVariantType, string> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary text-white',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
  link: 'btn-link',
  outline: 'btn-outline',
  active: 'btn-active',
  disabled: 'btn-disabled',
};

// =================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, type = 'button', className, children, ...rest } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={twMerge(
        'btn text-lg font-medium',
        variant && buttonVariantStyle[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

// =================================================================

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
