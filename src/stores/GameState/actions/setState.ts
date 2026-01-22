import { GameStateData } from "../../../types/gameState";
import { StoreSet } from "./types";
// FIXME типизация
export const setState = (set: StoreSet) => (gameState: GameStateData) => {
  set(() => ({
    player: {
      ...gameState,
      location: gameState.location
        ? {
            ...gameState.location,
            dungeon: gameState.location.dungeon
              ? gameState.location.dungeon!.map((item) => {
                  return item.map((subItem) => ({ ...subItem }));
                })
              : undefined,
          }
        : null,
    },
  }));
};
