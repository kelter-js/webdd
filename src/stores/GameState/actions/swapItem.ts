import { StoreSet } from "./types";
import { memoizeItem } from "../../../utils/memoizeItem";
import { dememoizeItem } from "../../../utils/dememoizeItem";

export const swapItem =
  (set: StoreSet) =>
  (equipItemId: string, unequipItemId: string, characterName: string) => {
    set((state) => {
      const copyState = { ...state, player: { ...state.player } };
      // ищем в инвентаре сам предмет, который будем экипировать
      const equipItemData = copyState.inventory?.find(
        (item) => item.gearId === equipItemId,
      );
      // в gear_memoized хранятся данные о предметах экипированных
      const characterGear = copyState.player.gear_memoized[characterName];

      if (characterGear && equipItemData) {
        const unequipItem = characterGear.find(
          ([_, gearId]) => gearId === unequipItemId,
        );

        if (unequipItem) {
          // помещаем мемоизированную версию предмета в инвентарь с персонажа
          copyState.player.inventory_memoized.push(unequipItem);

          copyState.player.inventory_memoized =
            copyState.player.inventory_memoized.filter(
              ([_, gearId]) => gearId !== equipItemId,
            );

          //помещаем новый предмет в экипировку персонажа
          characterGear.push(memoizeItem(equipItemData));

          // MOCK
          // ТУТ НУЖНА ЛОГИКА ПЕРЕСЧЕТА ХАРАКТЕРИСТИК ПЕРСОНАЖА И УСТАНОВКА ИХ В STORE

          // обновляем реальный инвентарь из мемоизированных значений
          copyState.inventory = copyState.player.inventory_memoized.map(
            (item) => dememoizeItem(item),
          );
        }
      }

      return copyState;
    });
  };
