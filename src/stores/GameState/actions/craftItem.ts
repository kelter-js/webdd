import { GameStateData } from "../../../types/gameState";
import { rebuildDerivedState } from "../../../utils";
import { StoreSet } from "./types";

// FIXME типизация
export const craftItem = (set: StoreSet) => (playerData: GameStateData) => {
  set((state) => {
    return rebuildDerivedState({
      ...state,
      player: { ...playerData },
    });
  });
};
