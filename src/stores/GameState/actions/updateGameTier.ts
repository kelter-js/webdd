import { StoreSet } from "./types";
// FIXME типизация
export const updateGameTier = (set: StoreSet) => () => {
  set((state) => {
    return {
      ...state,
      player: {
        ...state.player,
        currentTier: state.player.currentTier + 1,
      },
    };
  });
};
