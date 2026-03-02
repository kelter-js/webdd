import { POTION_TYPES } from "../../entities/consumables";
import { MemoizedItem, RECEIPT_TYPES, ReceiptData } from "../../types";
import { GameStateData } from "../../types/gameState";
import SmallPotion from "../../assets/potions/small-potion.svg";
import LargePotion from "../../assets/potions/large-potion.svg";
import ExtraLargePotion from "../../assets/potions/extra-large-potion.svg";
import MediumPotion from "../../assets/potions/medium-potion.svg";
import { BASE_ITEMS_ID } from "../items";
import { v4 } from "uuid";

const craftItem = (
  state: GameStateData,
  sourceItem: BASE_ITEMS_ID,
  targetItem: BASE_ITEMS_ID,
) => {
  const { inventory_memoized, gear_memoized } = state;

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

  return {
    ...copyState,
    inventory_memoized: [...copyState.inventory_memoized, newItem],
  };
};

const isDisabled = (state: GameStateData, targetItem: BASE_ITEMS_ID) => {
  const { inventory_memoized, gear_memoized } = state;
  const charactersGear = Object.values(gear_memoized).flat(1);

  const allItems = [...inventory_memoized, ...charactersGear];

  const requiredArmor = allItems.filter(([baseId]) => baseId === targetItem);

  return requiredArmor.length < 3;
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
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.BNTI_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.BNTI_TIER_1, BASE_ITEMS_ID.BNTI_TIER_2),
    title: "БНТИ MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 3000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.BNTI_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.BNTI_TIER_2, BASE_ITEMS_ID.BNTI_TIER_3),
    title: "БНТИ MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.NPP_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.NPP_TIER_1, BASE_ITEMS_ID.NPP_TIER_2),
    title: "NPP MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 3000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.NPP_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.NPP_TIER_2, BASE_ITEMS_ID.NPP_TIER_3),
    title: "NPP MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },

  // Бронежилеты 2 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.IOTV_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.IOTV_TIER_1, BASE_ITEMS_ID.IOTV_TIER_2),
    title: "IOTV MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.IOTV_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.IOTV_TIER_2, BASE_ITEMS_ID.IOTV_TIER_3),
    title: "IOTV MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.FORT_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.FORT_TIER_1, BASE_ITEMS_ID.FORT_TIER_2),
    title: "FORT MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.FORT_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.FORT_TIER_2, BASE_ITEMS_ID.FORT_TIER_3),
    title: "FORT MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },

  // Бронежилеты 3 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.NFM_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.NFM_TIER_1, BASE_ITEMS_ID.NFM_TIER_2),
    title: "NFM MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.NFM_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.NFM_TIER_2, BASE_ITEMS_ID.NFM_TIER_3),
    title: "NFM MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 24000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.REDUT_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.REDUT_TIER_1, BASE_ITEMS_ID.REDUT_TIER_2),
    title: "REDUT MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.REDUT_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.REDUT_TIER_2, BASE_ITEMS_ID.REDUT_TIER_3),
    title: "REDUT MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 24000,
  },

  // Шлемы 1 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.GALVION_TIER_1),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.GALVION_TIER_1,
        BASE_ITEMS_ID.GALVION_TIER_2,
      ),
    title: "Galvion MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 3000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.GALVION_TIER_2),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.GALVION_TIER_2,
        BASE_ITEMS_ID.GALVION_TIER_3,
      ),
    title: "Galvion MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.HJELM_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.HJELM_TIER_1, BASE_ITEMS_ID.HJELM_TIER_2),
    title: "HJELM MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 3000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.HJELM_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.HJELM_TIER_2, BASE_ITEMS_ID.HJELM_TIER_3),
    title: "HJELM MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },

  // Шлемы 2 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.ALTYN_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.ALTYN_TIER_1, BASE_ITEMS_ID.ALTYN_TIER_2),
    title: "Altyn MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.ALTYN_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.ALTYN_TIER_2, BASE_ITEMS_ID.ALTYN_TIER_3),
    title: "Altyn MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.MASKA_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.MASKA_TIER_1, BASE_ITEMS_ID.MASKA_TIER_2),
    title: "Maska MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.MASKA_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.MASKA_TIER_2, BASE_ITEMS_ID.MASKA_TIER_3),
    title: "Maska MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },

  // Шлемы 3 тир
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.RONIN_HELMET_TIER_1),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_1,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_2,
      ),
    title: "Ronin MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.RONIN_HELMET_TIER_2),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_2,
        BASE_ITEMS_ID.RONIN_HELMET_TIER_3,
      ),
    title: "Ronin MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 24000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_1),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_1,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2,
      ),
    title: "Ronin Respirator MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_2,
        BASE_ITEMS_ID.RONIN_RESPIRATOR_TIER_3,
      ),
    title: "Ronin Respirator MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 24000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.MP155_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.MP155_TIER_1, BASE_ITEMS_ID.MP155_TIER_2),
    title: "MP-155 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 3000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.MP155_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.MP155_TIER_2, BASE_ITEMS_ID.MP155_TIER_3),
    title: "MP-155 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.REMINGTON_870_TIER_1),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.REMINGTON_870_TIER_1,
        BASE_ITEMS_ID.REMINGTON_870_TIER_2,
      ),
    title: "Remington 870 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 6000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.REMINGTON_870_TIER_2),
    create: (state: GameStateData) =>
      craftItem(
        state,
        BASE_ITEMS_ID.REMINGTON_870_TIER_2,
        BASE_ITEMS_ID.REMINGTON_870_TIER_3,
      ),
    title: "Remington 870 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.SAIGA_TIER_1),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.SAIGA_TIER_1, BASE_ITEMS_ID.SAIGA_TIER_2),
    title: "Saiga-12 MK II",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 12000,
  },
  {
    type: RECEIPT_TYPES.ITEM,
    isDisabled: (state: GameStateData) =>
      isDisabled(state, BASE_ITEMS_ID.SAIGA_TIER_2),
    create: (state: GameStateData) =>
      craftItem(state, BASE_ITEMS_ID.SAIGA_TIER_2, BASE_ITEMS_ID.SAIGA_TIER_3),
    title: "Saiga-12 MK III",
    sourceItemIcon: "",
    targetItemIcon: "",
    goldRequiredToCraft: 24000,
  },
];
