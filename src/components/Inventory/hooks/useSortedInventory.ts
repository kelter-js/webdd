import { useMemo } from "react";

import {
  SORT_TYPES_BY_TIER,
  SORT_TYPES_BY_UPGRADE,
  SortedInventoryProps,
} from "../types";
import { CLASS_GUN_RESTRICTIONS } from "../../../constants/characters";
import { GEAR_SLOTS } from "../../../entities/gear";
import { CLASSES } from "../../../entities/characterClasses";
import { GUN_TYPES } from "../../../entities/guns";

const isMismatchTierFilter = (
  tier: SORT_TYPES_BY_TIER,
  itemAllOverTier: number,
) =>
  (tier === SORT_TYPES_BY_TIER.FIRST && itemAllOverTier !== 1) ||
  (tier === SORT_TYPES_BY_TIER.SECOND && itemAllOverTier !== 2) ||
  (tier === SORT_TYPES_BY_TIER.THIRD && itemAllOverTier !== 3);

const isMismatchUpgradeTier = (
  upgradeTier: SORT_TYPES_BY_UPGRADE,
  itemTier: number,
) =>
  (upgradeTier === SORT_TYPES_BY_UPGRADE.FIRST && itemTier !== 1) ||
  (upgradeTier === SORT_TYPES_BY_UPGRADE.SECOND && itemTier !== 2) ||
  (upgradeTier === SORT_TYPES_BY_UPGRADE.THIRD && itemTier !== 3);

const isMismatchClassFilter = (
  classFilter: CLASSES,
  itemType: GEAR_SLOTS,
  gunType: GUN_TYPES,
) =>
  itemType !== GEAR_SLOTS.WEAPON ||
  !CLASS_GUN_RESTRICTIONS[classFilter].includes(gunType);

export const useSortedInventory = ({
  inventory,
  searchTerm,
  tier,
  upgradeTier,
  classFilter,
}: SortedInventoryProps) => {
  const inventoryList = useMemo(() => {
    if (!inventory) return [];

    const normalizedSearchTerm = searchTerm?.toLocaleLowerCase();

    return inventory.filter((item) => {
      if (tier) {
        if (isMismatchTierFilter(tier, item.overAllTier)) {
          return false;
        }
      }

      if (upgradeTier) {
        if (isMismatchUpgradeTier(upgradeTier, item.tier)) {
          return false;
        }
      }

      if (classFilter) {
        if (isMismatchClassFilter(classFilter, item.type, item.gunType!)) {
          return false;
        }
      }

      if (normalizedSearchTerm) {
        if (!item.name.toLocaleLowerCase().includes(normalizedSearchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [inventory, searchTerm, tier, upgradeTier, classFilter]);

  return inventoryList;
};
