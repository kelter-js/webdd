import { Battle } from "../../../types/gameState";
import { StoreSet } from "./types";

export const updateBattle = (set: StoreSet) => (newBattleModel: Battle) => {
  set((state) => ({
    ...state,
    player: { ...state.player, battle: { ...newBattleModel } },
  }));
};
