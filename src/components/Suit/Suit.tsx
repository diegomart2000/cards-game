import classNames from 'classnames/bind';
import zipObject from 'lodash/zipObject';
import { FC } from 'react';
import { CARD_SUITS } from 'common/constants';
import { CardSuit, Size } from 'common/types';
import { Clover } from './Icon/Clover';
import { Diamond } from './Icon/Diamond';
import { Heart } from './Icon/Heart';
import { Spade } from './Icon/Spade';
import styles from './Suit.module.css';

const cx = classNames.bind(styles);

interface ISuitProps {
  suit: CardSuit;
  size?: Size;
}

const SUIT_MAP = zipObject(CARD_SUITS, [Clover, Heart, Spade, Diamond]);

export const Suit: FC<ISuitProps> = ({ suit, size = 'default' }) => (
  <div className={cx('suit', { [size]: true })}>{SUIT_MAP[suit]({})}</div>
);
