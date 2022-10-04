/* eslint-disable no-param-reassign */
import produce from 'immer';
import { StateCreator } from 'zustand';
import { ISoundState } from './types';

export const createSoundSlice: StateCreator<
  ISoundState,
  [['zustand/devtools', never]],
  [],
  ISoundState
> = (set) => ({
  sound: {
    assetList: {},

    // To mark that the required sound is loaded
    loaded: (key: string) =>
      set(
        produce<ISoundState>(({ sound }) => {
          sound.assetList[key] = true;
        }),
        false,
        'sound/loaded'
      ),
  },
});
