import { POSITIONS } from "../../common/TurnIndicator/entities";
import { POTION_TYPES } from "../../entities/consumables";
import { ReceiptData } from "../../types";
import { GameStateData } from "../../types/gameState";

export const RECEIPTS: ReceiptData[] = [
  {
    isDisabled: (state: GameStateData) => {
      const { consumables } = state;

      if (consumables.length > 0) {
        const smallPotions = consumables.find(
          ([potionType]) => potionType === POTION_TYPES.SMALL_HEALTH_POTION,
        );

        if (smallPotions) {
          const [_, amount] = smallPotions;

          return Number(amount) < 3;
        }
      }

      return true;
    },
    create: (state: GameStateData) => {
      const { consumables } = state;
      let newConsumables = [...consumables];

      if (newConsumables.length > 1) {
        newConsumables = newConsumables.map((consumable) => {
          const [potionType, amount] = consumable;

          if (potionType === POTION_TYPES.SMALL_HEALTH_POTION) {
            return [potionType, String(Number(amount) - 3)];
          }

          return consumable;
        });
      }

      return { ...state, consumables: newConsumables };
    },
    title: "Среднее зелье здоровья",
    sourceItemIcon: "",
    targetItemIcon: "",
  },
];
