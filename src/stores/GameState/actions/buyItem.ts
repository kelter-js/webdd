import { getBaseItemByBaseId } from "../../../utils/getBaseItemByBaseId";
import { memoizeItem } from "../../../utils/memoizeItem";
import { StoreSet } from "./types";
// FIXME типизация
export const buyItem = (set: StoreSet) => (itemId: string) => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    const itemData = state.sell_inventory?.find(
      (item) => item.gearId === itemId,
    );

    if (itemData) {
      copyState.player.gold -= itemData.price;

      copyState.sell_inventory = copyState.sell_inventory!.filter(
        (item) => item.gearId !== itemId,
      );

      copyState.player.itemsToBuy = copyState.player.itemsToBuy!.filter(
        ([_, gearId]) => gearId !== itemId,
      );

      copyState.inventory?.push({
        ...itemData,
        // сбрасываем цену - мы ее получили с  наценкой торговца, теперь в инвентаре храним с базовой ценой
        price: getBaseItemByBaseId(itemData.baseId).price,
      });
      copyState.player.inventory_memoized.push(memoizeItem(itemData));
    }

    return copyState;
  });
};
