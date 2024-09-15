import { forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

// ----------------------------------------------------------------

interface TextInputProps extends React.ComponentProps<'input'> {
  label?: ReactNode;
  labelClassName?: string;
  wrapperClassName?: string;
  displayName?: string;
  errors?: {
    password?: {
      message?: string
    }
    username?: {
      message?: string
    }
  }
}
// ----------------------------------------------------------------

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    label,
    name,
    placeholder,
    type = 'text',
    labelClassName,
    wrapperClassName,
    className,
    errors,
    ...inputProps
  } = props;

  return (
    <div className={twMerge('from-control mb-3', wrapperClassName)}>
      {label && (
        <label
          htmlFor={name}
          className={twMerge('label flex justify-start font-medium text-gray-500', labelClassName)}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className={twMerge(
          'input input-bordered w-full border-gray-200 bg-gray-300 focus-within:outline-none focus:border-gray-400 focus:outline-none focus:ring-0',
          className,
        )}
        {...inputProps}
      />
    </div>
  );
});

