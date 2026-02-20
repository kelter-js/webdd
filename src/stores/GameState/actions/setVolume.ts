import { StoreSet } from "./types";

export const setVolume = (set: StoreSet) => (volume: number) => {
  set((state) => ({ ...state, player: { ...state.player, volume } }));
};
