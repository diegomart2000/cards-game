import classNames from 'classnames/bind';
import delay from 'lodash/delay';
import React, { FC, useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import styles from './Counter.module.css';

const cx = classNames.bind(styles);

interface ICounterProps {
  value: number;
  indicator: React.ReactNode;
}

export const Counter: FC<ICounterProps> = ({ value, indicator }) => {
  const [displayValue, setDisplayValue] = useState(value);

  const [style, api] = useSpring(() => ({
    from: { rotateX: -360 },
    to: { rotateX: 0 },
    config: config.wobbly,
  }));

  useEffect(() => {
    delay(() => setDisplayValue(value), 800);
    if (value) {
      api.start({
        from: { rotateX: -360 },
        to: { rotateX: 0 },
        delay: 800,
      });
    }
  }, [api, value]);

  return (
    <div className={cx('counter')}>
      <animated.h2 style={style}>{displayValue}</animated.h2>
      <p>{indicator}</p>
    </div>
  );
};
