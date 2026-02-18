import { POTION_TYPES } from "../../entities/consumables";
import { MemoizedItem, RECEIPT_TYPES, ReceiptData } from "../../types";
import { GameStateData } from "../../types/gameState";
import SmallPotion from "../../assets/potions/small-potion.svg";
import LargePotion from "../../assets/potions/large-potion.svg";
import ExtraLargePotion from "../../assets/potions/extra-large-potion.svg";
import MediumPotion from "../../assets/potions/medium-potion.svg";
import { dememoizeItem } from "../../utils/dememoizeItem";
import { BASE_ITEMS_ID } from "../items";
import { BNTI_TIER_2 } from "../armor";
import { v4 } from "uuid";

export const RECEIPTS: ReceiptData[] = [
  // Малое зелье
  {
    type: RECEIPT_TYPES.CONSUMABLE,
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
    type: RECEIPT_TYPES.CONSUMABLE,
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
    type: RECEIPT_TYPES.CONSUMABLE,
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

  // Бронежилеты 1 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) => {
      const { inventory_memoized, gear_memoized } = state;
      const charactersGear = Object.values(gear_memoized).flat(1);

      const allItems = [...inventory_memoized, ...charactersGear];

      const requiredArmor = allItems.filter(
        ([baseId]) => baseId === BASE_ITEMS_ID.BNTI_TIER_1,
      );

      return requiredArmor.length < 3;
    },
    create: (state: GameStateData) => {
      const { inventory_memoized, gear_memoized } = state;

      const copyState: GameStateData = {
        ...state,
        gear_memoized: { ...gear_memoized },
        inventory_memoized: [...inventory_memoized],
      };

      let removed = 0;

      if (removed < 3) {
        const newInventory: MemoizedItem[] = [];

        for (const item of copyState.inventory_memoized) {
          if (item[0] === BASE_ITEMS_ID.BNTI_TIER_1 && removed < 3) {
            removed++;
            continue;
          }

          newInventory.push(item);
        }

        copyState.inventory_memoized = newInventory;
      }

      for (const character of Object.keys(copyState.gear_memoized)) {
        if (removed === 3) break;

        const gear = copyState.gear_memoized[character];
        const newGear: MemoizedItem[] = [];

        for (const item of gear) {
          if (item[0] === BASE_ITEMS_ID.BNTI_TIER_1 && removed < 3) {
            removed++;
            continue;
          }

          newGear.push(item);
        }

        copyState.gear_memoized[character] = newGear;
      }

      const newItem: MemoizedItem = [BASE_ITEMS_ID.BNTI_TIER_2, v4()];

      return {
        ...copyState,
        inventory_memoized: [...copyState.inventory_memoized, newItem],
      };
    },
    title: "БНТИ MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 3000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) => {
      const { inventory_memoized, gear_memoized } = state;
      const charactersGear = Object.values(gear_memoized).flat(1);

      const allItems = [...inventory_memoized, ...charactersGear];

      const requiredArmor = allItems.filter(
        ([baseId]) => baseId === BASE_ITEMS_ID.BNTI_TIER_2,
      );

      return requiredArmor.length < 3;
    },
    create: (state: GameStateData) => {
      const { inventory_memoized, gear_memoized } = state;

      const copyState: GameStateData = {
        ...state,
        gear_memoized: { ...gear_memoized },
        inventory_memoized: [...inventory_memoized],
      };

      let removed = 0;

      if (removed < 3) {
        const newInventory: MemoizedItem[] = [];

        for (const item of copyState.inventory_memoized) {
          if (item[0] === BASE_ITEMS_ID.BNTI_TIER_2 && removed < 3) {
            removed++;
            continue;
          }

          newInventory.push(item);
        }

        copyState.inventory_memoized = newInventory;
      }

      for (const character of Object.keys(copyState.gear_memoized)) {
        if (removed === 3) break;

        const gear = copyState.gear_memoized[character];
        const newGear: MemoizedItem[] = [];

        for (const item of gear) {
          if (item[0] === BASE_ITEMS_ID.BNTI_TIER_2 && removed < 3) {
            removed++;
            continue;
          }

          newGear.push(item);
        }

        copyState.gear_memoized[character] = newGear;
      }

      const newItem: MemoizedItem = [BASE_ITEMS_ID.BNTI_TIER_3, v4()];

      return {
        ...copyState,
        inventory_memoized: [...copyState.inventory_memoized, newItem],
      };
    },
    title: "БНТИ MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
];
