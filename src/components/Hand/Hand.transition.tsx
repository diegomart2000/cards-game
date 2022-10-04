import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { Card } from 'common/types';
import CardComponent from 'components/Card';
import styles from './Hand.module.css';

const cx = classNames.bind(styles);

interface IHandProps {
  cards?: Card[];
}

export const Hand: FC<IHandProps> = ({ cards }) => {
  const transitions = useTransition(cards, {
    expires: 10,
    from: { rotateZ: 180, rotateX: 90, scale: 2, y: -500 },
    enter: { rotateZ: 0, rotateX: 0, scale: 1, y: 0 },
    leave: { rotateZ: 0, rotaxteX: 180, scale: 1, y: 700, position: 'absolute' },
    trail: 431,
    config: config.wobbly,
  });

  return (
    <animated.div className={cx('hand')}>
      {transitions((style, card) => (
        <animated.div key={`card-${card?.value}-${card?.suit}`} style={style}>
          {card && <CardComponent {...card} />}
        </animated.div>
      ))}
    </animated.div>
  );
};
