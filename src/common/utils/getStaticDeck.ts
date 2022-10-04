import flatten from 'lodash/flatten';
import { CARD_SUITS, CARD_VALUES } from 'common/constants';
import { Card } from 'common/types';

export const getStatickDeck = (): Card[] =>
  flatten<Card>(CARD_SUITS.map((suit) => CARD_VALUES.map((value) => ({ suit, value }))));
