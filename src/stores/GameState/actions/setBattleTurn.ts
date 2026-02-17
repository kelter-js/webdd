import { TURN_STATES } from "../../../entities";
import { StoreSet } from "./types";
// FIXME типизация
export const setBattleTurn = (set: StoreSet) => (newTurn: TURN_STATES) => {
  set((state) => {
    const copiedState = { ...state, player: { ...state.player } };

    // нужно в зависимости от того, чей newTurn либо в enemy либо в player - party пройтись и поменять флаг hasTurn на true

    if (copiedState.player.battle) {
      copiedState.player.battle = {
        ...copiedState.player.battle,
        turn: newTurn,
      };

      if (newTurn === TURN_STATES.ENEMY_TURN) {
        copiedState.player.battle.enemy.party =
          copiedState.player.battle.enemy.party.map((member) => ({
            ...member,
            hasTurn: true,
          }));
      }

      if (newTurn === TURN_STATES.PLAYER_TURN) {
        copiedState.player.battle.player.party =
          copiedState.player.battle.player.party.map((member) => ({
            ...member,

            hasTurn: true,
          }));
      }
    }

    return copiedState;
  });
};
