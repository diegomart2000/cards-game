import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { Ribbon } from './Ribbon';
import styles from './Winner.module.css';

const cx = classNames.bind(styles);

interface IWinnerProps {
  children?: React.ReactNode;
}

export const Winner: FC<IWinnerProps> = () => {
  const style = useSpring({
    from: { scale: 3, x: 0 },
    to: { scale: 1, x: 0 },
    config: config.wobbly,
    delay: 300,
  });
  return (
    <div className={cx('winner')}>
      <animated.div style={style}>
        <Ribbon />
      </animated.div>
    </div>
  );
};
