import { StoreSet } from "./types";

// FIXME типизация
export const changeAttempts = (set: StoreSet) => (attempts: number) => {
  set((state) => {
    const location = state.player.location;

    if (location) {
      return {
        ...state,
        player: {
          ...state.player,
          location: { ...state.player.location, attempts },
        },
      };
    }

    return state;
  });
};
