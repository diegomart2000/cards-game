/* eslint-disable no-param-reassign */
import produce from 'immer';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';
import { StateCreator } from 'zustand';
import { HAND_SIZE } from 'common/constants';
import { GameStatus } from 'common/types';
import { getStatickDeck } from 'common/utils/getStaticDeck';
import soundService from 'service/soundService';
import { IGameState } from 'store/game/types';
import { getWinStatusSelector } from 'store/selectors';

const STATIC_DECK = getStatickDeck();

export const createGameSlice: StateCreator<
  IGameState,
  [['zustand/devtools', never]],
  [],
  IGameState
> = (set, get) => ({
  game: {
    currentDeck: {
      deck: [],
      hands: [],
      currentHand: null,
    },

    // This will shuffle the deck and generate all possible hands
    shuffleDeck: async () => {
      set(
        produce<IGameState>(({ game }) => {
          const deck = shuffle(STATIC_DECK);
          const hands = chunk(deck, HAND_SIZE);
          game.currentDeck = {
            deck,
            hands,
            currentHand: null,
          };
        }),
        false,
        'game/shuffleDeck'
      );

      soundService.playNoOverlap('cardShuffle');
      soundService.playNoOverlap('backgroundMusic', 1000);
    },

    // This will move current hand if possible and will deal the cards
    deal: () => {
      const { currentDeck } = get().game;

      if (!currentDeck.deck.length) {
        return [];
      }

      const currentHand = currentDeck.currentHand === null ? 0 : currentDeck.currentHand + 1;

      if (currentHand > currentDeck.hands.length) {
        return [];
      }

      if (currentDeck.deck.length)
        set(
          produce<IGameState>(({ game }) => {
            game.currentDeck = {
              ...game.currentDeck,
              currentHand,
            };
          }),
          false,
          'game/deal'
        );

      soundService.play('cardRequest');

      const fx = currentDeck.hands[currentHand].reduce(
        (chain) => chain.play('cardDeal'),
        soundService.chain()
      );

      const winStatus = getWinStatusSelector(get().game);
      if (winStatus === GameStatus.WIN) {
        fx.stop('backgroundMusic').play(['winMusic', 'winAmbient']);
      }

      if (winStatus === GameStatus.LOSE) {
        fx.stop('backgroundMusic').play(['loseAmbient', 'loseMusic']);
      }

      fx.run();

      return currentDeck.hands[currentHand];
    },
  },
});
