import { CLASSES } from "../../entities/characterClasses";

import { Item } from "../../types/gameState";

export interface DragItemWithMeta {
  characterName?: string;
  item: Item | undefined | null;
}

export enum SORT_TYPES_BY_TIER {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export enum SORT_TYPES_BY_UPGRADE {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export interface InventoryContainerProps {
  searchTerm?: string;
  upgradeTier: null | SORT_TYPES_BY_UPGRADE;
  tier: null | SORT_TYPES_BY_TIER;
  classFilter: null | CLASSES;
}

export interface SortedInventoryProps {
  inventory: Item[] | null;
  searchTerm?: string;
  tier: SORT_TYPES_BY_TIER | null;
  upgradeTier: SORT_TYPES_BY_UPGRADE | null;
  classFilter: CLASSES | null;
}
