import { Item } from "../types/gameState";

const TRADER_PERCENTAGE = 15;

export const getItemPrice = (item: Item, currentTier: number) => {
  const { price, overAllTier, tier } = item;
  const additionByTier = (price * tier) / 2;
  const tierDifference = currentTier !== overAllTier ? 50 : 0;
  const tierDifferenceIncrease = (price / 100) * tierDifference;

  const priceCalculated = price + additionByTier + tierDifferenceIncrease;
  const traderCommision = (priceCalculated / 100) * TRADER_PERCENTAGE;

  return priceCalculated + traderCommision;
};
