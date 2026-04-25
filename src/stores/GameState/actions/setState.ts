import { dememoizeItem } from "../../../utils/dememoizeItem";
import { GameStateData } from "../../../types/gameState";
import { StoreSet } from "./types";

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

    sell_inventory: gameState.itemsToBuy?.map(dememoizeItem),
    inventory: gameState.inventory_memoized?.map(dememoizeItem),

    gear: Object.fromEntries(
      Object.entries(gameState.gear_memoized).map(([name, gear]) => [
        name,
        gear.map(dememoizeItem),
      ]),
    ),
  }));
};
