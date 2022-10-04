import classNames from 'classnames/bind';
import React, { FC } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { GameStatus } from 'common/types';
import Button from 'components/Button';
import styles from './Player.module.css';

const cx = classNames.bind(styles);

interface IPlayerProps {
  isStarted: boolean;
  onShuffleDeck: () => void;
  canDeal: boolean;
  onDeal: () => void;
  winStatus: GameStatus;
}

const shouldPlayAgain = (winStatus: GameStatus) =>
  winStatus === GameStatus.WIN || winStatus === GameStatus.LOSE;

export const Player: FC<IPlayerProps> = ({
  isStarted,
  onShuffleDeck,
  onDeal,
  canDeal,
  winStatus,
}) => {
  const transition = useTransition(canDeal, {
    from: { x: -1000 },
    enter: { x: 0 },
    leave: { x: 1000 },
    config: config.wobbly,
  });

  const playAgaintransition = useTransition(shouldPlayAgain(winStatus), {
    from: { y: 1000 },
    enter: { y: 0 },
    leave: { y: 1000 },
    config: config.wobbly,
    delay: 800,
  });

  return !isStarted ? (
    <Button secondary size="lg" className="self-center" onClick={onShuffleDeck}>
      Start!
    </Button>
  ) : (
    <div className={cx('player')}>
      {transition((style, flag) => (
        <>
          {flag && (
            <div className={cx('deal')}>
              <animated.div style={style}>
                <Button primary size="lg" onClick={onDeal}>
                  DEAL
                </Button>
              </animated.div>
            </div>
          )}
        </>
      ))}

      {shouldPlayAgain(winStatus) && (
        <>
          {playAgaintransition(
            (style, flag) =>
              flag && (
                <animated.div style={style} className={cx('result')}>
                  {winStatus === GameStatus.LOSE && (
                    <div className={cx('lose')}>
                      <h3>You lose.</h3>
                      <h3>Better luck next time!</h3>
                    </div>
                  )}
                  <Button secondary size="md" onClick={onShuffleDeck}>
                    Play Again
                  </Button>
                </animated.div>
              )
          )}
        </>
      )}

      {winStatus === GameStatus.PLAYING && (
        <div className={cx('reset')}>
          <Button secondary size="md" onClick={onShuffleDeck}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};
