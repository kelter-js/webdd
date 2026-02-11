import { POTION_TYPES } from "../../entities/consumables";
import { ReceiptData } from "../../types";
import { GameStateData } from "../../types/gameState";
import SmallPotion from "../../assets/potions/small-potion.svg";
import LargePotion from "../../assets/potions/large-potion.svg";
import ExtraLargePotion from "../../assets/potions/extra-large-potion.svg";
import MediumPotion from "../../assets/potions/medium-potion.svg";

export const RECEIPTS: ReceiptData[] = [
  // Малое зелье
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
      let isPotionAdded = false;

      if (newConsumables.length > 1) {
        newConsumables = newConsumables.map((consumable) => {
          const [potionType, amount] = consumable;

          if (potionType === POTION_TYPES.SMALL_HEALTH_POTION) {
            return [potionType, String(Number(amount) - 3)];
          }

          if (potionType === POTION_TYPES.MEDIUM_HEALTH_POTION) {
            isPotionAdded = true;
            return [potionType, String(Number(amount) + 1)];
          }

          return consumable;
        });

        if (!isPotionAdded) {
          newConsumables.push([POTION_TYPES.MEDIUM_HEALTH_POTION, "1"]);
        }
      }

      return { ...state, consumables: newConsumables };
    },
    title: "Среднее зелье здоровья",
    sourceItemIcon: SmallPotion,
    targetItemIcon: MediumPotion,
  },

  // Среднее зелье
  {
    isDisabled: (state: GameStateData) => {
      const { consumables } = state;

      if (consumables.length > 0) {
        const smallPotions = consumables.find(
          ([potionType]) => potionType === POTION_TYPES.MEDIUM_HEALTH_POTION,
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
      let isPotionAdded = false;

      if (newConsumables.length > 1) {
        newConsumables = newConsumables.map((consumable) => {
          const [potionType, amount] = consumable;

          if (potionType === POTION_TYPES.MEDIUM_HEALTH_POTION) {
            return [potionType, String(Number(amount) - 3)];
          }

          if (potionType === POTION_TYPES.LARGE_HEALTH_POTION) {
            isPotionAdded = true;
            return [potionType, String(Number(amount) + 1)];
          }

          return consumable;
        });

        if (!isPotionAdded) {
          newConsumables.push([POTION_TYPES.LARGE_HEALTH_POTION, "1"]);
        }
      }

      return { ...state, consumables: newConsumables };
    },
    title: "Большое зелье здоровья",
    sourceItemIcon: MediumPotion,
    targetItemIcon: LargePotion,
  },

  // Большое зелье
  {
    isDisabled: (state: GameStateData) => {
      const { consumables } = state;

      if (consumables.length > 0) {
        const smallPotions = consumables.find(
          ([potionType]) => potionType === POTION_TYPES.LARGE_HEALTH_POTION,
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
      let isPotionAdded = false;

      if (newConsumables.length > 1) {
        newConsumables = newConsumables.map((consumable) => {
          const [potionType, amount] = consumable;

          if (potionType === POTION_TYPES.LARGE_HEALTH_POTION) {
            return [potionType, String(Number(amount) - 3)];
          }

          if (potionType === POTION_TYPES.EXTRA_LARGE_HEALTH_POTION) {
            isPotionAdded = true;
            return [potionType, String(Number(amount) + 1)];
          }

          return consumable;
        });

        if (!isPotionAdded) {
          newConsumables.push([POTION_TYPES.EXTRA_LARGE_HEALTH_POTION, "1"]);
        }
      }

      return { ...state, consumables: newConsumables };
    },
    title: "Ритуальное зелье здоровья",
    sourceItemIcon: LargePotion,
    targetItemIcon: ExtraLargePotion,
  },
];
