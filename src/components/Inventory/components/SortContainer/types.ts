import { ChangeEvent } from "react";
import { SORT_TYPES_BY_TIER, SORT_TYPES_BY_UPGRADE } from "../../types";
import { CLASSES } from "../../../../entities/characterClasses";

export interface SortContainerProps {
  search?: string;
  onUpdateSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTier: (e: SORT_TYPES_BY_TIER) => void;
  onChangeUpgradeTier: (e: SORT_TYPES_BY_UPGRADE) => void;
  onChangeClass: (e: CLASSES) => void;
  currentTier: null | SORT_TYPES_BY_TIER;
  currentUpgradeTier: null | SORT_TYPES_BY_UPGRADE;
  currentClass: null | CLASSES;
}
