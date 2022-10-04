import { FC } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from 'store';
import { Hand } from './Hand';

export const HandContainer: FC = () => {
  const { currentHand, hands } = useStore(({ game: { currentDeck } }) => currentDeck, shallow);
  return <Hand cards={currentHand !== null ? hands[currentHand] : []} />;
};
