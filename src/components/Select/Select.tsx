import { forwardRef } from 'react';
import ReactSelect, { Props } from 'react-select';
import makeAnimated from 'react-select/animated';

import { twMerge } from 'tailwind-merge';

const animatedComponents = makeAnimated();

// ----------------------------------------------------------------

interface SelectProps extends Omit<Props, 'components'> {
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
}

// ----------------------------------------------------------------

export const Select = forwardRef<any, SelectProps>((props, ref) => {
  const {
    label,
    wrapperClassName,
    labelClassName,
    name,
    closeMenuOnSelect = false,
    placeholder,
    ...rest
  } = props;

  return (
    <div className={twMerge('from-control mb-3', wrapperClassName)}>
      {label && (
        <label htmlFor={name} className={twMerge('label font-medium', labelClassName)}>
          {label}
        </label>
      )}
      <ReactSelect
        ref={ref}
        menuPortalTarget={document.body}
        name={name}
        inputId={name}
        closeMenuOnSelect={closeMenuOnSelect}
        components={animatedComponents}
        placeholder={placeholder}
        styles={{ menuPortal: base => ({ ...base, zIndex: 60 }) }}
        {...rest}
      />
    </div>
  );
});

// ----------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
  Select.displayName = 'Select';
}
