import { StoreSet } from "./types";
// FIXME типизация
export const resetBattle = (set: StoreSet) => () => {
  set((state) => ({
    ...state,
    player: { ...state.player, battle: null },
  }));
};
