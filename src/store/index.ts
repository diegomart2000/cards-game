import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createGameSlice, IGameState } from './game';
import { createSoundSlice, ISoundState } from './sound';

type State = IGameState & ISoundState; // To extend if there are other slices to add

export const useStore = create<State>()(
  devtools((...a) => ({
    ...createGameSlice(...a),
    ...createSoundSlice(...a),
  }))
);
