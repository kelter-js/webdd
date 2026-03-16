import { POTION_TYPES } from "../../entities/consumables";
import { MemoizedItem, RECEIPT_TYPES, ReceiptData } from "../../types";
import { GameStateData } from "../../types/gameState";
import SmallPotion from "../../assets/potions/small-potion.svg";
import LargePotion from "../../assets/potions/large-potion.svg";
import ExtraLargePotion from "../../assets/potions/extra-large-potion.svg";
import MediumPotion from "../../assets/potions/medium-potion.svg";
import { BASE_ITEMS_ID } from "../items";
import { v4 } from "uuid";
import { dememoizeItem } from "../../utils/dememoizeItem";
import { getPotionDescriptionByType } from "../../utils/getPotionDescriptionByType";

const FIRST_TIER_MKII_UPGRADE_COST = 3000;
const FIRST_TIER_MKIII_UPGRADE_COST = 6000;
const SECOND_TIER_MKIII_UPGRADE_COST = 12000;
const THIRD_TIER_MKIII_UPGRADE_COST = 24000;

const craftItem = (
  state: GameStateData,
  sourceItem: BASE_ITEMS_ID,
  targetItem: BASE_ITEMS_ID,
  price?: number,
) => {
  const { inventory_memoized, gear_memoized, gold } = state;

  if (price && price > gold) {
    return { state, item: null };
  }

  const copyState: GameStateData = {
    ...state,
    gear_memoized: { ...gear_memoized },
    inventory_memoized: [...inventory_memoized],
  };

  let removed = 0;

  const newInventory: MemoizedItem[] = [];

  for (const item of copyState.inventory_memoized) {
    if (item[0] === sourceItem && removed < 3) {
      removed++;
      continue;
    }

    newInventory.push(item);
  }

  copyState.inventory_memoized = newInventory;

  if (removed < 3) {
    for (const character of Object.keys(copyState.gear_memoized)) {
      if (removed === 3) break;

      const gear = copyState.gear_memoized[character];
      const newGear: MemoizedItem[] = [];

      for (const item of gear) {
        if (item[0] === sourceItem && removed < 3) {
          removed++;
          continue;
        }

        newGear.push(item);
      }

      copyState.gear_memoized[character] = newGear;
    }
  }

  const newItem: MemoizedItem = [targetItem, v4()];

  if (price) {
    copyState.gold -= price;
  }

  const newState = {
    ...copyState,
    inventory_memoized: [...copyState.inventory_memoized, newItem],
  };

  return { state: newState, item: dememoizeItem(newItem) };
};

const isDisabled = (
  state: GameStateData,
  targetItem: BASE_ITEMS_ID,
  requiredGold?: number,
) => {
  const { inventory_memoized, gear_memoized, gold } = state;
  const charactersGear = Object.values(gear_memoized).flat(1);

  const allItems = [...inventory_memoized, ...charactersGear];

  const requiredItems = allItems.filter(([baseId]) => baseId === targetItem);

  return requiredItems.length < 3 || gold < (requiredGold ?? 0);
};

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

      const newState = { ...state, consumables: newConsumables };

      return {
        state: newState,
        item: `Вы изготовили: одно ${getPotionDescriptionByType(POTION_TYPES.MEDIUM_HEALTH_POTION)}`,
      };
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

      const newState = { ...state, consumables: newConsumables };

      return {
        state: newState,
        item: `Вы изготовили: одно ${getPotionDescriptionByType(POTION_TYPES.LARGE_HEALTH_POTION)}`,
      };
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

      const newState = { ...state, consumables: newConsumables };

      return {
        state: newState,
        item: `Вы изготовили: одно ${getPotionDescriptionByType(POTION_TYPES.EXTRA_LARGE_HEALTH_POTION)}`,
      };
    },
    title: "Ритуальное зелье здоровья",
    sourceItemIcon: LargePotion,
    targetItemIcon: ExtraLargePotion,
  },

  // Бронежилеты 1 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.BNTI_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.BNTI_TIER_1,
        BASE_ITEMS_ID.BNTI_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "БНТИ MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.BNTI_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.BNTI_TIER_2,
        BASE_ITEMS_ID.BNTI_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "БНТИ MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.NPP_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.NPP_TIER_1,
        BASE_ITEMS_ID.NPP_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "NPP MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.NPP_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.NPP_TIER_2,
        BASE_ITEMS_ID.NPP_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "NPP MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },

  // Бронежилеты 2 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.IOTV_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.IOTV_TIER_1,
        BASE_ITEMS_ID.IOTV_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "IOTV MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.IOTV_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.IOTV_TIER_2,
        BASE_ITEMS_ID.IOTV_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "IOTV MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.FORT_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.FORT_TIER_1,
        BASE_ITEMS_ID.FORT_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "FORT MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.FORT_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.FORT_TIER_2,
        BASE_ITEMS_ID.FORT_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "FORT MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },

  // Бронежилеты 3 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.NFM_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.NFM_TIER_1,
        BASE_ITEMS_ID.NFM_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "NFM MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.NFM_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.NFM_TIER_2,
        BASE_ITEMS_ID.NFM_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "NFM MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.REDUT_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.REDUT_TIER_1,
        BASE_ITEMS_ID.REDUT_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "REDUT MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.REDUT_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.REDUT_TIER_2,
        BASE_ITEMS_ID.REDUT_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "REDUT MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },

  // Шлемы 1 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.GALVION_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.GALVION_TIER_1,
        BASE_ITEMS_ID.GALVION_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "Galvion MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.GALVION_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.GALVION_TIER_2,
        BASE_ITEMS_ID.GALVION_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Galvion MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.HJELM_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.HJELM_TIER_1,
        BASE_ITEMS_ID.HJELM_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "HJELM MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.HJELM_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.HJELM_TIER_2,
        BASE_ITEMS_ID.HJELM_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "HJELM MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },

  // Шлемы 2 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.ALTYN_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.ALTYN_TIER_1,
        BASE_ITEMS_ID.ALTYN_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Altyn MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.ALTYN_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.ALTYN_TIER_2,
        BASE_ITEMS_ID.ALTYN_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Altyn MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.MASKA_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.MASKA_TIER_1,
        BASE_ITEMS_ID.MASKA_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Maska MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.MASKA_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.MASKA_TIER_2,
        BASE_ITEMS_ID.MASKA_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Maska MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },

  // Шлемы 3 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_1,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Ronin MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_2,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Ronin MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_1,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Ronin Respirator MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Ronin Respirator MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  // ДРОБОВИКИ
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.MP155_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.MP155_TIER_1,
        BASE_ITEMS_ID.MP155_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "MP-155 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.MP155_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.MP155_TIER_2,
        BASE_ITEMS_ID.MP155_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "MP-155 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.REMINGTON_870_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.REMINGTON_870_TIER_1,
        BASE_ITEMS_ID.REMINGTON_870_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Remington 870 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.REMINGTON_870_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.REMINGTON_870_TIER_2,
        BASE_ITEMS_ID.REMINGTON_870_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Remington 870 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.SAIGA_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.SAIGA_TIER_1,
        BASE_ITEMS_ID.SAIGA_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Saiga-12 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.SAIGA_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.SAIGA_TIER_2,
        BASE_ITEMS_ID.SAIGA_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Saiga-12 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  // СНАЙПЕРСКИЕ ВИНТОВКИ
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.SV98_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.SV98_TIER_1,
        BASE_ITEMS_ID.SV98_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "СВ-98 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.SV98_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.SV98_TIER_2,
        BASE_ITEMS_ID.SV98_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "СВ-98 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.DLV10_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.DLV10_TIER_1,
        BASE_ITEMS_ID.DLV10_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "ДВЛ-10 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.DLV10_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.DLV10_TIER_2,
        BASE_ITEMS_ID.DLV10_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "ДВЛ-10 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.AXMC_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.AXMC_TIER_1,
        BASE_ITEMS_ID.AXMC_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "AXMC MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.AXMC_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.AXMC_TIER_2,
        BASE_ITEMS_ID.AXMC_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "AXMC MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  // ПУЛЕМЕТЫ
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.RPD_TIER_1, FIRST_TIER_MKII_UPGRADE_COST),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RPD_TIER_1,
        BASE_ITEMS_ID.RPD_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "РПД MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.RPD_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RPD_TIER_2,
        BASE_ITEMS_ID.RPD_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "РПД MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.M60_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.M60_TIER_1,
        BASE_ITEMS_ID.M60_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "M60 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.M60_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.M60_TIER_2,
        BASE_ITEMS_ID.M60_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "M60 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.PKM_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.PKM_TIER_1,
        BASE_ITEMS_ID.PKM_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "ПКМ MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.PKM_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.PKM_TIER_2,
        BASE_ITEMS_ID.PKM_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "ПКМ MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  // ШТУРМОВЫЕ ВИНТОВКИ
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.AK_12_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.AK_12_TIER_1,
        BASE_ITEMS_ID.AK_12_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "АК-12 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.AK_12_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.AK_12_TIER_2,
        BASE_ITEMS_ID.AK_12_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "АК-12 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.M4A1_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.M4A1_TIER_1,
        BASE_ITEMS_ID.M4A1_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "M4A1 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.M4A1_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.M4A1_TIER_2,
        BASE_ITEMS_ID.M4A1_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "M4A1 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.SA58_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.SA58_TIER_1,
        BASE_ITEMS_ID.SA58_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "SA-58 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.SA58_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.SA58_TIER_2,
        BASE_ITEMS_ID.SA58_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "SA-58 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.MP5SD_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.MP5SD_TIER_1,
        BASE_ITEMS_ID.MP5SD_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "MP5SD MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.MP5SD_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.MP5SD_TIER_2,
        BASE_ITEMS_ID.MP5SD_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "MP5SD MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.FN_P90S_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.FN_P90S_TIER_1,
        BASE_ITEMS_ID.FN_P90S_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "FN P90S MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.FN_P90S_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.FN_P90S_TIER_2,
        BASE_ITEMS_ID.FN_P90S_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "FN P90S MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.KRISS_VECTOR_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.KRISS_VECTOR_TIER_1,
        BASE_ITEMS_ID.KRISS_VECTOR_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "KRISS VECTOR MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.KRISS_VECTOR_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.KRISS_VECTOR_TIER_2,
        BASE_ITEMS_ID.KRISS_VECTOR_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "KRISS VECTOR MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.GLOCK_17_TIER_1,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.GLOCK_17_TIER_1,
        BASE_ITEMS_ID.GLOCK_17_TIER_2,
        FIRST_TIER_MKII_UPGRADE_COST,
      ),
    title: "Glock 17 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.GLOCK_17_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.GLOCK_17_TIER_2,
        BASE_ITEMS_ID.GLOCK_17_TIER_3,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Glock 17 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.FN_57_TIER_1,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.FN_57_TIER_1,
        BASE_ITEMS_ID.FN_57_TIER_2,
        FIRST_TIER_MKIII_UPGRADE_COST,
      ),
    title: "FN Five Seven MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: FIRST_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.FN_57_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.FN_57_TIER_2,
        BASE_ITEMS_ID.FN_57_TIER_3,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "FN Five Seven MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.DESERT_EAGLE_TIER_1,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.DESERT_EAGLE_TIER_1,
        BASE_ITEMS_ID.DESERT_EAGLE_TIER_2,
        SECOND_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Desert Eagle MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: SECOND_TIER_MKIII_UPGRADE_COST,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(
        state,
        BASE_ITEMS_ID.DESERT_EAGLE_TIER_2,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.DESERT_EAGLE_TIER_2,
        BASE_ITEMS_ID.DESERT_EAGLE_TIER_3,
        THIRD_TIER_MKIII_UPGRADE_COST,
      ),
    title: "Desert Eagle MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: THIRD_TIER_MKIII_UPGRADE_COST,
  },
];
