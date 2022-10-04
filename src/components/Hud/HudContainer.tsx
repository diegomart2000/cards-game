import { FC } from 'react';
import { HAND_SIZE } from 'common/constants';
import { Card } from 'common/types';
import { useStore } from 'store';
import { Hud } from './Hud';

const countAces = (currentHand: number, deck: Card[]) =>
  deck.slice(0, (currentHand + 1) * HAND_SIZE).filter(({ value }) => value === 'A').length;

export const HudContainer: FC = () => {
  const { currentHand, deck } = useStore(({ game: { currentDeck } }) => currentDeck);
  let left = currentHand !== null ? deck.length - (currentHand + 1) * HAND_SIZE : deck.length;
  left = left >= 0 ? left : 0;

  const aces = 4 - (currentHand !== null ? countAces(currentHand, deck) : 0);
  return <Hud left={left} aces={aces} />;
};
