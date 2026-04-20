import { StoreSet } from "./types";

import { rebuildDerivedState } from "../../../utils";
import { GEAR_SLOTS } from "../../../entities/gear";
import { memoizeItem } from "../../../utils";

export const equipItem =
  (set: StoreSet) =>
  (equipItemId: string, characterName: string, type: GEAR_SLOTS) => {
    set((state) => {
      const copyState = {
        ...state,
        player: {
          ...state.player,
          inventory_memoized: [...state.player.inventory_memoized],
          gear_memoized: { ...state.player.gear_memoized },
        },
      };
      // ищем в инвентаре сам предмет, который будем экипировать
      const equipItemData = copyState.player.inventory_memoized.find(
        ([_, id]) => id === equipItemId,
      );

      if (!copyState.player.gear_memoized[characterName]) {
        copyState.player.gear_memoized[characterName] = [];
      }

      if (copyState.player.gear_memoized[characterName] && equipItemData) {
        if (copyState.gear && copyState.gear[characterName]) {
          const unequipItem = copyState.gear[characterName].find(
            ({ type: itemType }) => itemType === type,
          );
          // помещаем мемоизированную версию предмета в инвентарь с персонажа
          if (unequipItem) {
            copyState.player.inventory_memoized.push(memoizeItem(unequipItem));
            copyState.player.gear_memoized[characterName] =
              copyState.player.gear_memoized[characterName].filter(
                ([_, itemId]) => itemId !== unequipItem.gearId,
              );
          }
        }

        copyState.player.inventory_memoized =
          copyState.player.inventory_memoized.filter(
            ([_, gearId]) => gearId !== equipItemId,
          );

        //помещаем новый предмет в экипировку персонажа
        copyState.player.gear_memoized[characterName] = [
          ...copyState.player.gear_memoized[characterName],
          equipItemData,
        ];
      }

      return rebuildDerivedState(copyState, characterName);
    });
  };
