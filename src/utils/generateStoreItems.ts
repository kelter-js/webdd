import {
  ARMORS_TIER_1,
  ARMORS_TIER_2,
  ARMORS_TIER_3,
  RARE_ARMORS_TIER_1,
  RARE_ARMORS_TIER_2,
  RARE_ARMORS_TIER_3,
} from "../constants/armor";
import {
  RARE_WEAPONS_TIER_1,
  RARE_WEAPONS_TIER_2,
  RARE_WEAPONS_TIER_3,
  WEAPONS_TIER_1,
  WEAPONS_TIER_2,
  WEAPONS_TIER_3,
} from "../constants/guns";
import {
  HELMETS_TIER_1,
  HELMETS_TIER_2,
  HELMETS_TIER_3,
  RARE_HELMETS_TIER_1,
  RARE_HELMETS_TIER_2,
  RARE_HELMETS_TIER_3,
} from "../constants/helmets";
import { MAX_AMOUNT_OF_ITEMS_TO_SELL } from "../stores/constants";
import { Item } from "../types/gameState";
import { getRandom } from "./getRandom";
import { v4 } from "uuid";

const getChancesByTier = (tier: number) => {
  if (tier === 2) {
    return {
      hasNextTier: 10,
      enhanced: 5,
      currentTier: 50,
    };
  }

  if (tier === 3) {
    return {
      hasNextTier: 0,
      enhanced: 5,
      currentTier: 50,
    };
  }

  return { hasNextTier: 10, enhanced: 10, currentTier: 50 };
};

export const generateItem = (
  averagePoolList: Omit<Item, "gearId">[],
  enhanced: number,
  enhancedPoolList?: Omit<Item, "gearId">[],
) => {
  const isEnhancedItem = getRandom(1, 100);

  const poolList =
    isEnhancedItem < enhanced ? enhancedPoolList : averagePoolList;

  const itemIndex = getRandom(0, (poolList || averagePoolList).length - 1);
  const item = (poolList || averagePoolList)[itemIndex];

  return { ...item, gearId: v4() };
};

export const generateStoreItem = (tier: number) => {
  console.log("tier", tier);
  const { hasNextTier, enhanced, currentTier } = getChancesByTier(tier);
  console.log("hasNextTier", hasNextTier);

  const rollForItem = getRandom(1, 100);
  console.log("rollForItem", rollForItem);

  if (hasNextTier > rollForItem) {
    if (tier === 1) {
      return generateItem([...WEAPONS_TIER_2, ...ARMORS_TIER_2], enhanced, [
        ...RARE_ARMORS_TIER_2,
        ...RARE_WEAPONS_TIER_2,
      ]);
    }

    if (tier === 2) {
      return generateItem([...WEAPONS_TIER_3, ...ARMORS_TIER_3], enhanced, [
        ...RARE_ARMORS_TIER_3,
        ...RARE_WEAPONS_TIER_3,
      ]);
    }
  }

  if (currentTier > rollForItem) {
    if (tier === 1) {
      console.log(" SO WE ARE HERE?!?@#?!@");
      return generateItem(
        [...WEAPONS_TIER_1, ...ARMORS_TIER_1, ...HELMETS_TIER_1],
        enhanced,
        [...RARE_ARMORS_TIER_1, ...RARE_WEAPONS_TIER_1, ...RARE_HELMETS_TIER_1],
      );
    }

    if (tier === 2) {
      return generateItem(
        [...WEAPONS_TIER_2, ...ARMORS_TIER_2, ...HELMETS_TIER_2],
        enhanced,
        [...RARE_ARMORS_TIER_2, ...RARE_WEAPONS_TIER_2, ...RARE_HELMETS_TIER_2],
      );
    }

    if (tier === 3) {
      return generateItem(
        [...WEAPONS_TIER_3, ...ARMORS_TIER_3, ...HELMETS_TIER_3],
        enhanced,
        [...RARE_ARMORS_TIER_3, ...RARE_WEAPONS_TIER_3, ...RARE_HELMETS_TIER_3],
      );
    }
  }

  return null;
};

export const generateStoreItems = (tier: number) =>
  new Array(MAX_AMOUNT_OF_ITEMS_TO_SELL)
    .fill(null)
    .map(() => generateStoreItem(tier))
    .filter((potion): potion is NonNullable<typeof potion> => potion !== null);

export const generateGenericItemInCurrentPool = (currentTier: number) => {
  if (currentTier === 1) {
    const itemsList = [...WEAPONS_TIER_1, ...ARMORS_TIER_1, ...HELMETS_TIER_1];

    return generateItem(itemsList, 0);
  }

  if (currentTier === 2) {
    const itemsList = [...WEAPONS_TIER_2, ...ARMORS_TIER_2, ...HELMETS_TIER_2];

    return generateItem(itemsList, 0);
  }

  const itemsList = [...WEAPONS_TIER_3, ...ARMORS_TIER_3, ...HELMETS_TIER_3];

  return generateItem(itemsList, 0);
};
