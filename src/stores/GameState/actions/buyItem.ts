import { memoizeItem, getBaseItemByBaseId } from "../../../utils";
import { StoreSet } from "./types";

export const buyItem = (set: StoreSet) => (itemId: string) => {
  set((state) => {
    const itemData = state.sell_inventory?.find(
      (item) => item.gearId === itemId,
    );

    const {
      sell_inventory,
      inventory,
      player: { itemsToBuy, gold, inventory_memoized },
    } = state;

    if (!itemData || !sell_inventory || !itemsToBuy) return state;

    return {
      ...state,
      player: {
        ...state.player,
        gold: gold - itemData.price,
        itemsToBuy: itemsToBuy.filter(([_, gearId]) => gearId !== itemId),
        inventory_memoized: [
          ...(inventory_memoized || []),
          memoizeItem(itemData),
        ],
      },
      sell_inventory: sell_inventory.filter((item) => item.gearId !== itemId),
      inventory: [
        ...(inventory || []),
        {
          ...itemData,
          // сбрасываем цену - мы ее получили с  наценкой торговца, теперь в инвентаре храним с базовой ценой
          price: getBaseItemByBaseId(itemData.baseId).price,
        },
      ],
    };
  });
};
