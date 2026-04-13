import { RENDER_LOCATIONS } from "../../../entities";
import { Battle, Reward } from "../../../types/gameState";
import { StoreSet } from "./types";
// FIXME типизация
export const setReward = (set: StoreSet) => (reward: Reward) => {
  set((state) => {
    const copiedState = { ...state, player: { ...state.player } };
    console.log("incoming reward", reward);

    if (!copiedState.player.battle) {
      copiedState.player.battle = {} as Battle;
    }

    copiedState.player.battle = {
      ...(copiedState.player.battle || {}),
      reward,
    };

    copiedState.player.locationState = RENDER_LOCATIONS.DUNGEON;

    console.log("copiedState", copiedState);

    return copiedState;
  });
};
