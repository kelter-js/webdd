import { StoreSet } from "./types";

// FIXME типизация
export const buyPotion = (set: StoreSet) => (mainIndex: number) => {
  set((state) => {
    const potionsList = state.player.potionsToBuy;

    if (potionsList && potionsList[mainIndex]) {
      const copyState = {
        ...state,
        player: { ...state.player, consumables: [...state.player.consumables] },
      };
      const { gold, consumables, potionsToBuy } = copyState.player;

      const { price = 0, type } = potionsList[mainIndex];

      if (gold < price) {
        throw new Error("Not enough gold!");
      }

      copyState.player.gold -= price;

      const hasSamePotions = copyState.player.consumables.find((potion) => {
        const [potionType] = potion;
        return potionType === type;
      });

      if (hasSamePotions) {
        copyState.player.consumables = consumables.map((potion) => {
          const [potionType, amount] = potion;

          if (potionType === type) {
            return [potionType, `${Number(amount) + 1}`];
          }

          return potion;
        });
      } else {
        consumables.push([type, "1"]);
      }

      if (potionsToBuy) {
        copyState.player.potionsToBuy = potionsToBuy.filter(
          (_, index) => index !== mainIndex,
        );
      }

      return copyState;
    }

    return state;
  });
};
