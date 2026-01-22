import { TURN_STATES } from "../../../entities";
import { StoreSet } from "./types";
// FIXME типизация
export const setBattleTurn = (set: StoreSet) => (newTurn: TURN_STATES) => {
  set((state) => {
    const copiedState = { ...state, player: { ...state.player } };

    if (copiedState.player.battle) {
      copiedState.player.battle = {
        ...copiedState.player.battle,
        turn: newTurn,
      };
    }

    return copiedState;
  });
};
