import { MemoizedItem } from "../types";
import { Item } from "../types/gameState";
import { getBaseItemByBaseId } from "./getBaseItemByBaseId";

export const dememoizeItem = (item: MemoizedItem): Item => {
  const [baseId, itemId] = item;

  const baseItem = getBaseItemByBaseId(baseId);

  return { ...baseItem, gearId: itemId };
};
