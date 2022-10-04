export interface ISoundSlice {
  assetList: Record<string, boolean>;
  loaded: (key: string) => void;
}

export interface ISoundState {
  sound: ISoundSlice;
}
