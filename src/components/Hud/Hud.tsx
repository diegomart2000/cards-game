import classNames from 'classnames/bind';
import { FC } from 'react';
import Counter from './Counter';
import styles from './Hud.module.css';

const cx = classNames.bind(styles);

interface IHudProps {
  left: number;
  aces: number;
}

export const Hud: FC<IHudProps> = ({ left, aces }) => (
  <div className={cx('hud')}>
    <Counter value={left} indicator="Cards Left" />
    <Counter value={aces} indicator="Aces Left" />
  </div>
);
