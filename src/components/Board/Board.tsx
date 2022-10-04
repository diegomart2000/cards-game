import classNames from 'classnames/bind';
import { FC } from 'react';
import { GameStatus } from 'common/types';
import { Confetti } from 'components/Confetti/Confetti';
import Hand from 'components/Hand';
import Hud from 'components/Hud';
import Player from 'components/Player';
import Winner from 'components/Winner';
import styles from './Board.module.css';

const cx = classNames.bind(styles);

interface IBoardProps {
  winStatus: GameStatus;
  isStarted: boolean;
}

export const Board: FC<IBoardProps> = ({ winStatus, isStarted }) => (
  <div className={cx('board')} data-testid="GameBoardPage">
    <div className={cx('hud-container')}>
      {isStarted && <Hud />}
      {winStatus === GameStatus.WIN && (
        <>
          <Winner />
          <Confetti />
        </>
      )}
    </div>
    <div className={cx('cards-container')}>
      <Hand />
    </div>
    <div className={cx('player-container')}>
      <Player />
    </div>
  </div>
);
