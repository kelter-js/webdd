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
  enhancedPoolList: Omit<Item, "gearId">[],
  enhanced: number,
) => {
  const isEnhancedItem = getRandom(1, 100);

  const poolList =
    isEnhancedItem < enhanced ? enhancedPoolList : averagePoolList;

  const itemIndex = getRandom(0, poolList.length - 1);
  const item = poolList[itemIndex];

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
      return generateItem(
        [...WEAPONS_TIER_2, ...ARMORS_TIER_2],
        [...RARE_ARMORS_TIER_2, ...RARE_WEAPONS_TIER_2],
        enhanced,
      );
    }

    if (tier === 2) {
      return generateItem(
        [...WEAPONS_TIER_3, ...ARMORS_TIER_3],
        [...RARE_ARMORS_TIER_3, ...RARE_WEAPONS_TIER_3],
        enhanced,
      );
    }
  }

  if (currentTier > rollForItem) {
    if (tier === 1) {
      console.log(" SO WE ARE HERE?!?@#?!@");
      return generateItem(
        [...WEAPONS_TIER_1, ...ARMORS_TIER_1],
        [...RARE_ARMORS_TIER_1, ...RARE_WEAPONS_TIER_1],
        enhanced,
      );
    }

    if (tier === 2) {
      return generateItem(
        [...WEAPONS_TIER_2, ...ARMORS_TIER_2],
        [...RARE_ARMORS_TIER_2, ...RARE_WEAPONS_TIER_2],
        enhanced,
      );
    }

    if (tier === 3) {
      return generateItem(
        [...WEAPONS_TIER_3, ...ARMORS_TIER_3],
        [...RARE_ARMORS_TIER_3, ...RARE_WEAPONS_TIER_3],
        enhanced,
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
