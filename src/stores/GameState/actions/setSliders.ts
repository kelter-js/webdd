import { SLIDERS } from "../../../entities/sliders";
import { StoreSet } from "./types";
// FIXME типизация
export const setSliders = (set: StoreSet) => (sliderId: SLIDERS | null) => {
  set((state) => ({
    ...state,
    player: { ...state.player, sliderId },
  }));
};
