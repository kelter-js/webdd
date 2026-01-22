import { Reward } from "../../../types/gameState";
import { StoreSet } from "./types";
// FIXME типизация
export const setReward = (set: StoreSet) => (reward: Reward) => {
  set((state) => {
    const copiedState = { ...state, player: { ...state.player } };

    if (copiedState.player.battle) {
      copiedState.player.battle = { ...copiedState.player.battle, reward };
    }

    return copiedState;
  });
};
