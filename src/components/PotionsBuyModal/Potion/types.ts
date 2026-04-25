import { POTION_TYPES } from "../../../entities/consumables";

export interface PotionProps {
  top: number;
  left: number;
  type: POTION_TYPES;
  price: number;
  onBuy: VoidFunction;
  isDisabled: boolean;
}
