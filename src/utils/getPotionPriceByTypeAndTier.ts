import { POTION_TYPES } from "../entities/consumables";
import { POTION_TIERS } from "../constants/items";

// FIXME: необходима отладка цен
const SMALL_POTION_PRICE = 50;
const MEDIUM_POTION_PRICE = 100;
const LARGE_POTION_PRICE = 150;
const EXTRA_LARGE_POTION_PRICE = 250;
const DEFAUL_PRICE_MULTIPLIER = 1;

export const getPotionPriceByTypeAndTier = (
  tier: number,
  potionType: POTION_TYPES
) => {
  const priceMultiplier =
    tier < POTION_TIERS[potionType]
      ? POTION_TIERS[potionType]
      : DEFAUL_PRICE_MULTIPLIER;

  switch (potionType) {
    case POTION_TYPES.SMALL_HEALTH_POTION: {
      return SMALL_POTION_PRICE;
    }

    case POTION_TYPES.MEDIUM_HEALTH_POTION: {
      return MEDIUM_POTION_PRICE * priceMultiplier;
    }

    case POTION_TYPES.LARGE_HEALTH_POTION: {
      return LARGE_POTION_PRICE * priceMultiplier;
    }

    case POTION_TYPES.EXTRA_LARGE_HEALTH_POTION: {
      return EXTRA_LARGE_POTION_PRICE * priceMultiplier;
    }

    default:
      return SMALL_POTION_PRICE;
  }
};
