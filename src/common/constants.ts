import zipObject from 'lodash/zipObject';

export const CARD_SUITS = ['♣', '♥', '♠', '♦'] as const;
export const CARD_VALUES = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
] as const;

export const HAND_SIZE = 5;

export const SUIT_COLOR_MAP = zipObject(CARD_SUITS, ['black', 'red', 'black', 'red']);
