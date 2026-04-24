import { useMemo } from "react";

import {
  SORT_TYPES_BY_TIER,
  SORT_TYPES_BY_UPGRADE,
  SortedInventoryProps,
} from "../types";
import { CLASS_GUN_RESTRICTIONS } from "../../../constants/characters";
import { GEAR_SLOTS } from "../../../entities/gear";
import { Item } from "../../../types/gameState";

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

    return inventory.reduce<Item[]>((acc, item) => {
      let isIncluded = false;

      if (tier) {
        switch (tier) {
          case SORT_TYPES_BY_TIER.FIRST: {
            isIncluded = item.overAllTier === 1;
            break;
          }

          case SORT_TYPES_BY_TIER.SECOND: {
            isIncluded = item.overAllTier === 2;
            break;
          }

          case SORT_TYPES_BY_TIER.THIRD: {
            isIncluded = item.overAllTier === 3;
            break;
          }
        }
      }

      if (upgradeTier) {
        switch (upgradeTier) {
          case SORT_TYPES_BY_UPGRADE.FIRST: {
            isIncluded = item.tier === 1;
            break;
          }

          case SORT_TYPES_BY_UPGRADE.SECOND: {
            isIncluded = item.tier === 2;
            break;
          }

          case SORT_TYPES_BY_UPGRADE.THIRD: {
            isIncluded = item.tier === 3;
            break;
          }
        }
      }

      if (classFilter) {
        if (item.type === GEAR_SLOTS.WEAPON) {
          isIncluded = CLASS_GUN_RESTRICTIONS[classFilter].includes(
            item.gunType!,
          );
        } else {
          return acc;
        }
      }

      if (normalizedSearchTerm) {
        if (item.name.toLocaleLowerCase().includes(normalizedSearchTerm)) {
          isIncluded = true;
        } else if (isIncluded) {
          isIncluded = false;
        }
      }

      if (
        isIncluded ||
        (!normalizedSearchTerm && !tier && !upgradeTier && !classFilter)
      ) {
        acc.push(item);
      }

      return acc;
    }, []);
  }, [inventory, searchTerm, tier, upgradeTier, classFilter]);

  return inventoryList;
};
