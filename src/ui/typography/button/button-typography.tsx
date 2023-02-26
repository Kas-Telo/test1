import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import style from './button-typography.module.css';

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

type Props = DefaultSpanPropsType & {
  children: ReactNode;
  type: 'large' | 'small';
  variant: 'mobile' | 'desktop';
};

export const ButtonTypography = ({ children, type, variant, className, ...restprops }: Props) => {
  const sizeClass = `${type === 'large' ? style.large : style.small}`;
  let mobileClass = '';

  if (variant === 'mobile' && type === 'large') mobileClass = `${style.mobileLarge}`;
  if (variant === 'mobile' && type === 'small') mobileClass = `${style.mobileSmall}`;
  const finalClass = `${sizeClass} ${mobileClass} ${className}`;

  return (
    <span className={finalClass} {...restprops}>
      {children}
    </span>
  );
};
