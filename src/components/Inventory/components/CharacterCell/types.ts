import { CLASSES } from "../../../../entities/characterClasses";
import { GEAR_SLOTS } from "../../../../entities/gear";
import { Item } from "../../../../types/gameState";

export interface InventoryCellProps {
  type: GEAR_SLOTS;
  item?: Item | null;
  characterClass?: CLASSES;
  name?: string;
}
