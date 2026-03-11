import { Item } from "../../types/gameState";

export interface ItemDataModalProps {
  open: boolean;
  anchorEl: HTMLElement;
  item: Item;
  sameGear?: {
    name: string;
    item: Item | undefined;
  }[];
}
