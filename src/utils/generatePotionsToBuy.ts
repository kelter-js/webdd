import { POTION_TYPES } from "../entities/consumables";
import { MAX_AMOUNT_OF_POTIONS_TO_SELL } from "../stores/constants";
import { getPotionPriceByTypeAndTier } from "./getPotionPriceByTypeAndTier";
import { getRandom } from "./getRandom";

const SMALL_POTION_CHANCE = 50;
const MEDIUM_POTION_CHANCE = 25;
const LARGE_POTION_CHANCE = 10;
const EXTRA_LARGE_POTION_CHANCE = 5;
const DEFAULT_SELL_AMOUNT_OF_POTIONS = 1;
const START_RANGE = 1;
const END_RANGE = 100;
const POTION_PRESET = { amount: DEFAULT_SELL_AMOUNT_OF_POTIONS };

export const generatePotion = (tier: number) => {
  const roll = getRandom(START_RANGE, END_RANGE);
  const medium = MEDIUM_POTION_CHANCE * tier;
  const large = LARGE_POTION_CHANCE * tier;
  const extra = EXTRA_LARGE_POTION_CHANCE * tier;

  const [low, middle, high, highest] = [
    SMALL_POTION_CHANCE,
    medium,
    large,
    extra,
  ].sort((a, b) => a - b);

  if (roll < low) {
    return {
      ...POTION_PRESET,
      type: POTION_TYPES.EXTRA_LARGE_HEALTH_POTION,
      price: getPotionPriceByTypeAndTier(
        tier,
        POTION_TYPES.EXTRA_LARGE_HEALTH_POTION
      ),
    };
  }

  if (roll < middle) {
    return {
      ...POTION_PRESET,
      type: POTION_TYPES.LARGE_HEALTH_POTION,
      price: getPotionPriceByTypeAndTier(
        tier,
        POTION_TYPES.LARGE_HEALTH_POTION
      ),
    };
  }

  if (roll < high) {
    return {
      ...POTION_PRESET,
      type: POTION_TYPES.MEDIUM_HEALTH_POTION,
      price: getPotionPriceByTypeAndTier(
        tier,
        POTION_TYPES.MEDIUM_HEALTH_POTION
      ),
    };
  }

  if (roll < highest) {
    return {
      ...POTION_PRESET,
      type: POTION_TYPES.SMALL_HEALTH_POTION,
      price: getPotionPriceByTypeAndTier(
        tier,
        POTION_TYPES.SMALL_HEALTH_POTION
      ),
    };
  }

  return null;
};

export const generatePotionsList = (tier: number) => {
  return new Array(MAX_AMOUNT_OF_POTIONS_TO_SELL)
    .fill(null)
    .map(() => generatePotion(tier))
    .filter((potion): potion is NonNullable<typeof potion> => potion !== null);
};
