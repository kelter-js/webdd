import { StoreSet } from "./types";
// FIXME типизация
export const updateGameTier = (set: StoreSet) => () => {
  set((state) => {
    console.log("state.player.currentTier", state.player.currentTier);
    return {
      ...state,
      player: {
        ...state.player,
        currentTier: state.player.currentTier + 1,
      },
    };
  });
};
