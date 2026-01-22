import { StoreSet } from "./types";
// FIXME типизация
export const setBattle = (set: StoreSet) => (battleState: any) => {
  set((state) => ({
    ...state,
    player: { ...state.player, battle: battleState },
  }));
};
