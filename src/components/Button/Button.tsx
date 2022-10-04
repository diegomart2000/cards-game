import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { Size } from 'common/types';
import styles from './Button.module.css';

const cx = classNames.bind(styles);

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;

  size?: Size;
  children?: React.ReactNode;
}

export const Button: FC<IButtonProps> = ({
  primary,
  secondary,
  size = 'default',
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    className={cx('button', { primary, secondary }, { [size]: true }, className)}
    {...props}
  >
    {children}
  </button>
);
