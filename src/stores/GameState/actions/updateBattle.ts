import { Battle } from "../../../types/gameState";
import { StoreSet } from "./types";

export const updateBattle = (set: StoreSet) => (newBattleModel: Battle) => {
  set((state) => {
    if (state.player.battle?.reward) {
      return {
        ...state,
        player: {
          ...state.player,
          battle: {
            ...newBattleModel,
            reward:
              state.player.battle?.reward || newBattleModel.reward || null,
          },
        },
      };
    }

    return {
      ...state,
      player: { ...state.player, battle: { ...newBattleModel } },
    };
  });
};
