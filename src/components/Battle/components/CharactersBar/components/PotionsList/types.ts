import { POTION_TYPES } from "../../../../../../entities/consumables";

export interface PotionsListProps {
  onPotionClick: (potion: POTION_TYPES) => void;
  disabled: boolean;
}
