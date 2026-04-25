import { Item } from "../../types/gameState";

export interface ItemDataModalProps {
  open?: boolean;
  displayDescription?: boolean;
  anchorEl?: HTMLElement;
  item: Item;
  gold?: number;
  sameGear?: {
    name: string;
    item: Item | undefined;
  }[];
}
