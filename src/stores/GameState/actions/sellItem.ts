import { DungeonCreation } from "../../../types/gameState";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { increaseCharacterStat } from "../../utils";
import { StoreSet } from "./types";
// FIXME типизация
export const sellItem = (set: StoreSet) => (itemId: string) => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    const itemData = state.inventory?.find((item) => item.gearId === itemId);

    if (itemData) {
      // const goldAmount = getPrice(itemData.price, itemData.tier);
      // copyState.player.gold += goldAmount;
      // copyState.inventory = copyState.inventory!.filter(item => item.gearId !== itemId);
      // copyState.player.inventory_memoized = copyState.inventory.map(item => memoizeItem(item));
    }

    return copyState;
  });
};
