import { CARD_SUITS, CARD_VALUES } from './constants';

export type CardSuit = typeof CARD_SUITS[number];
export type CardValue = typeof CARD_VALUES[number];

export type Card = {
  value: CardValue;
  suit: CardSuit;
};

export type Size = 'sm' | 'md' | 'lg';

export enum GameStatus {
  PLAYING = 0,
  WIN = 1,
  LOSE = -1,
}
