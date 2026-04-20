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
