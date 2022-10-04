import { GameStatus } from 'common/types';
import { IGameState } from './game/types';

export const getWinStatusSelector = ({ currentDeck }: IGameState['game']): GameStatus => {
  if (currentDeck?.currentHand === null || currentDeck?.currentHand < 10) {
    return GameStatus.PLAYING;
  }
  const lastHandAce = currentDeck.deck[50].value === 'A' || currentDeck.deck[51].value === 'A';

  if (currentDeck.currentHand >= 10 && lastHandAce) {
    return GameStatus.WIN;
  }

  return GameStatus.LOSE;
};

export const isGameStartedSelector = ({ currentDeck }: IGameState['game']) =>
  !!currentDeck.deck.length;
