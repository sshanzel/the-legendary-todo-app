import React from 'react';
import clx from 'classnames';

interface BUTTON_TYPE {
  base: string;
  hover: string;
  disabled: string;
}

const PRIMARY: BUTTON_TYPE = {
  base: 'bg-blue-500',
  hover: 'bg-blue-400',
  disabled: 'bg-blue-200',
};

const SECONDARY: BUTTON_TYPE = {
  base: 'bg-teal-500',
  hover: 'bg-teal-400',
  disabled: 'bg-teal-200',
};

const TERTIARY: BUTTON_TYPE = {
  base: 'bg-red-500',
  hover: 'bg-red-400',
  disabled: 'bg-red-200',
};

export type BUTTON_TYPES = {
  PRIMARY: BUTTON_TYPE;
  SECONDARY?: BUTTON_TYPE;
  TERTIARY?: BUTTON_TYPE;
  QUARTERNARY?: BUTTON_TYPE;
  QUINARY?: BUTTON_TYPE;
};

export const TSBUTTON_TYPES: BUTTON_TYPES = {
  PRIMARY,
  SECONDARY,
  TERTIARY,
};

export type TSButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {
  disabled?: boolean;
  buttonType?: keyof BUTTON_TYPES;
};

const TSButton: React.FC<TSButtonProps> = ({
  disabled,
  buttonType = 'PRIMARY',
  className,
  children,
  ...rest
}) => {
  const button_type = TSBUTTON_TYPES[buttonType] || TSBUTTON_TYPES['PRIMARY'];

  return (
    <div className={clx('shadow', className)}>
      <button
        className={clx(
          'text-white px-4 h-full w-full py-2 focus:outline-none',
          !disabled && `hover:${button_type.hover}`,
          disabled ? button_type.disabled : button_type.base
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default TSButton;
