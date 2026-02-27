import { StoreSet } from "./types";

import { rebuildDerivedState } from "../../../utils/rebuildDerivedState";

export const equipItem =
  (set: StoreSet) =>
  (equipItemId: string, characterName: string, unequipItemId?: string) => {
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
        if (unequipItemId) {
          const unequipItem = copyState.player.gear_memoized[
            characterName
          ].find(([_, gearId]) => gearId === unequipItemId);
          // помещаем мемоизированную версию предмета в инвентарь с персонажа
          if (unequipItem) {
            copyState.player.inventory_memoized.push(unequipItem);
            copyState.player.gear_memoized[characterName] =
              copyState.player.gear_memoized[characterName].filter(
                ([_, itemId]) => itemId !== unequipItemId,
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

        // MOCK
        // ТУТ НУЖНА ЛОГИКА ПЕРЕСЧЕТА ХАРАКТЕРИСТИК ПЕРСОНАЖА И УСТАНОВКА ИХ В STORE
      }

      return rebuildDerivedState(copyState, characterName);
    });
  };
