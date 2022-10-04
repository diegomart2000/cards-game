import { FC } from 'react';
import { useStore } from 'store';
import { getWinStatusSelector, isGameStartedSelector } from 'store/selectors';
import { Board } from './Board';

export const BoardContainer: FC = () => {
  const { game } = useStore();
  const winStatus = getWinStatusSelector(game);
  const isStarted = isGameStartedSelector(game);
  return <Board winStatus={winStatus} isStarted={isStarted} />;
};
