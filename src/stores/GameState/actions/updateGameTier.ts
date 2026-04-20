import { StoreSet } from "./types";

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
