import { Item } from "../../../../../../types/gameState";

export interface ShopItemProps {
  isHovered: boolean;
  top: number;
  left: number;
  itemData?: Item;
  onHover: VoidFunction;
  onBlur: VoidFunction;
}
