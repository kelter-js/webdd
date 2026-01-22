import { StoreSet } from "./types";
// FIXME типизация
export const setSliders = (set: StoreSet) => (sliderId: string | null) => {
  set((state) => ({
    ...state,
    player: { ...state.player, sliderId },
  }));
};
