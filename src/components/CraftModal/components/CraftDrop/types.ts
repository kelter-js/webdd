import { Item } from "../../../../types/gameState";

export interface CraftDropProps {
  item: Item | null;
  onClose: VoidFunction;
}
