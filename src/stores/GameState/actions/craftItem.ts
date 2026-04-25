import { GameStateData } from "../../../types/gameState";
import { rebuildDerivedState } from "../../../utils";
import { StoreSet } from "./types";

export const craftItem = (set: StoreSet) => (playerData: GameStateData) => {
  set((state) =>
    rebuildDerivedState({
      ...state,
      player: { ...playerData },
    }),
  );
};
