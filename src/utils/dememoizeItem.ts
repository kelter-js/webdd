import { getBaseItemByBaseId } from "./getBaseItemByBaseId";
import { Item } from "../types/gameState";
import { MemoizedItem } from "../types";

export const dememoizeItem = (item: MemoizedItem): Item => {
  const [baseId, itemId] = item;

  const baseItem = getBaseItemByBaseId(baseId);

  return { ...baseItem, gearId: itemId };
};
