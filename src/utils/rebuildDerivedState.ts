import { StoreState } from "../types/gameState";
import { dememoizeItem } from "./dememoizeItem";

export const rebuildDerivedState = (
  state: StoreState,
  characterName: string,
) => ({
  ...state,
  gear: {
    ...(state.gear ?? {}),
    [characterName]:
      state.player.gear_memoized[characterName].map(dememoizeItem),
  },
  inventory: state.player.inventory_memoized.map(dememoizeItem),
});
