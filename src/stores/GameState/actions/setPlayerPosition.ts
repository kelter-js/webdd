import { DungeonCoordinates } from "../../../types/gameState";

import { StoreSet } from "./types";
// FIXME типизация
export const setPlayerPosition =
  (set: StoreSet) => (position: DungeonCoordinates) => {
    set((state) => {
      const location = state.player?.location;

      if (location) {
        return {
          player: {
            ...state.player,
            location: {
              ...state.player.location,
              position,
            },
          },
        };
      }

      return state;
    });
  };
