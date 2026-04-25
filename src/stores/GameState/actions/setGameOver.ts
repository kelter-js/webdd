import { StoreSet } from "./types";

export const setGameOver = (set: StoreSet) => () =>
  set((state) => ({
    ...state,
    player: { ...state.player, isGameOver: true },
  }));
