import { FC } from 'react';
import { useStore } from 'store';
import { getWinStatusSelector, isGameStartedSelector } from 'store/selectors';
import { Player } from './Player';

export const PlayerContainer: FC = () => {
  const gameState = useStore(({ game }) => game);
  const {
    deal,
    shuffleDeck,
    currentDeck: { hands, currentHand },
  } = gameState;
  const isStarted = isGameStartedSelector(gameState);
  const winStatus = getWinStatusSelector(gameState);
  return (
    <Player
      isStarted={isStarted}
      onShuffleDeck={shuffleDeck}
      onDeal={deal}
      canDeal={hands.length > 0 && (currentHand || 0) < 10}
      winStatus={winStatus}
    />
  );
};
