import classNames from 'classnames/bind';
import { FC } from 'react';
import { SUIT_COLOR_MAP } from 'common/constants';
import { CardSuit, CardValue } from 'common/types';
import { Suit } from 'components/Suit';
import styles from './Card.module.css';

const cx = classNames.bind(styles);

interface ICardProps {
  suit: CardSuit;
  value: CardValue;
}

export const Card: FC<ICardProps> = ({ suit, value }) => (
  <div className={cx('card', { [SUIT_COLOR_MAP[suit]]: true })}>
    <div className={cx('value')}>
      <h1>{value}</h1>
      <Suit suit={suit} size="sm" />
    </div>
    <div className={cx('suit')}>
      <Suit suit={suit} size="lg" />
    </div>
  </div>
);

export const CardPlaceholder: FC = () => <div className={cx('placeholder')} />;
