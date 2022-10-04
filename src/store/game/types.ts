import { Card } from 'common/types';

export interface IGameSlice {
  currentDeck: {
    deck: Card[];
    hands: Card[][];
    currentHand: number | null;
  };
  shuffleDeck: () => void;
  deal: () => Card[];
}

export interface IGameState {
  game: IGameSlice;
}
