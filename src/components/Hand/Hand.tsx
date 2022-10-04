import classNames from 'classnames/bind';
import delay from 'lodash/delay';
import React, { FC, useState, useEffect } from 'react';
import { useSprings, animated, config } from 'react-spring';
import { Card } from 'common/types';
import CardComponent, { CardPlaceholder } from 'components/Card';
import styles from './Hand.module.css';

const cx = classNames.bind(styles);

interface IHandProps {
  cards?: Card[];
}

export const Hand: FC<IHandProps> = ({ cards }) => {
  const [springs] = useSprings(
    cards?.length || 0,
    (i) => ({
      delay: i * 431,
      from: { rotateZ: 180, rotateX: 90, scale: 2, y: -500 },
      to: { rotateZ: 0, rotateX: 0, scale: 1, y: 0 },
      reset: true,
      config: config.stiff,
    }),
    [cards]
  );

  const [dealyed, setDelayed] = useState(cards?.map(() => false));
  useEffect(() => {
    const delayed = cards?.map((card, i) => {
      delay(
        () =>
          setDelayed((prev = []) => {
            const delays = [...prev];
            delays[i] = false;
            return delays;
          }),
        i * 431
      );

      return true;
    });

    setDelayed(delayed);
  }, [cards, setDelayed]);

  return (
    <div className={cx('hand', { final: cards && cards?.length < 5 })}>
      {cards?.map((card, i) => {
        const style = springs?.[i];
        return (
          <animated.div key={`card-${i}-${card?.value}-${card?.suit}`} style={style}>
            {dealyed?.[i] ? <CardPlaceholder /> : <CardComponent {...card} />}
          </animated.div>
        );
      })}
    </div>
  );
};
