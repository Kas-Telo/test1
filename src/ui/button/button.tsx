import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { ButtonTypography } from '../typography';

import style from './button.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = DefaultButtonPropsType & {
  children: ReactNode;
  size: 'large' | 'small';
  sizeTypography: 'large' | 'small';
  variant: 'primary' | 'secondary';
  variantTypography: 'mobile' | 'desktop';
  submit: boolean;
  dataTestId?: string;
};

export const Button = ({
  dataTestId,
  children,
  disabled,
  size,
  sizeTypography,
  variant,
  variantTypography,
  className,
  submit,
  ...restProps
}: Props) => {
  const classSize = `${size === 'large' ? style.large : style.small}`;
  let classDisabled: string;

  if (disabled) {
    classDisabled = `${variant === 'primary' ? style.disabledPrimary : style.disabledSecondary}`;
  } else {
    classDisabled = `${variant === 'primary' ? style.primary : style.secondary}`;
  }

  const buttonTypographyClass = `${variant === 'primary' ? style.primaryTypography : style.secondaryTypography}`;

  return (
    <button
      data-test-id={dataTestId}
      className={`${classSize} ${classDisabled} ${className}`}
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      {...restProps}
    >
      <ButtonTypography className={buttonTypographyClass} type={sizeTypography} variant={variantTypography}>
        {children}
      </ButtonTypography>
    </button>
  );
};
