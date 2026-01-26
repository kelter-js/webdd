import { Item } from "../types/gameState";

export const memoizeItem = (item: Item) => [item.baseId, item.gearId];
