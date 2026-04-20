import { TURN_STATES } from "../../../entities";
import { StoreSet } from "./types";

export const setBattleTurn = (set: StoreSet) => (newTurn: TURN_STATES) => {
  set((state) => {
    const battle = state.player.battle;
    if (!battle) return state;

    return {
      ...state,
      player: {
        ...state.player,
        battle: {
          ...battle,
          turn: newTurn,
          enemy: {
            ...battle.enemy,
            party:
              newTurn === TURN_STATES.ENEMY_TURN
                ? battle.enemy.party.map((m) => ({ ...m, hasTurn: true }))
                : battle.enemy.party,
          },
          player: {
            ...battle.player,
            party:
              newTurn === TURN_STATES.PLAYER_TURN
                ? battle.player.party.map((m) => ({ ...m, hasTurn: true }))
                : battle.player.party,
          },
        },
      },
    };
  });
};
