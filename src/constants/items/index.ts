import { POTION_TYPES } from "../../entities/consumables";
import { JUNK_TYPES } from "../../entities/junk";

export const CONSUMABLE_ITEMS = {};
export const FIRST_TIER_ITEMS = [];
export const SECONDS_TIER_ITEMS = [];
export const THIRD_TIER_ITEMS = [];

export const JUNK_DATA = {
  [JUNK_TYPES.AXE]: {
    price: 200,
    title: "Декоративный топорик",
  },
};

export const FIRST_TIER_JUNK = [JUNK_TYPES.AXE];
export const SECOND_TIER_JUNK = [];
export const THIRD_TIER_JUNK = [];

export const POTION_TIERS = {
  [POTION_TYPES.SMALL_HEALTH_POTION]: 1,
  [POTION_TYPES.MEDIUM_HEALTH_POTION]: 2,
  [POTION_TYPES.LARGE_HEALTH_POTION]: 3,
  [POTION_TYPES.EXTRA_LARGE_HEALTH_POTION]: 4,
};
