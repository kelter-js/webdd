import { MemoizedItem } from "../types";
import { Item } from "../types/gameState";

export const memoizeItem = (item: Item): MemoizedItem => [
  item.baseId,
  item.gearId,
];
