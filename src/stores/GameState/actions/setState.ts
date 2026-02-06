import { GameStateData } from "../../../types/gameState";
import { dememoizeItem } from "../../../utils/dememoizeItem";
import { StoreSet } from "./types";
export const setState = (set: StoreSet) => (gameState: GameStateData) => {
  set(() => ({
    // FIXME
    // нужна полная реинициализация - пересчет характеристик, инвентаря, гира и статов
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

    // FIXME
    // вызвать пересчет статов
  }));
};
