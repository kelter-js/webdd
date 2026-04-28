import { RENDER_LOCATIONS } from "../../../entities";
import { StoreSet } from "./types";

const RUN_PRICE = 1000;
const RUN_HEALTH_PENALTY = 10;

export const runFromBattle = (set: StoreSet) => () => {
  set((state) => {
    const copiedState = { ...state, player: { ...state.player } };

    copiedState.player.battle = null;

    copiedState.player.locationState = RENDER_LOCATIONS.DUNGEON;
    copiedState.player.gold = Math.max(0, copiedState.player.gold - RUN_PRICE);
    copiedState.player.party = copiedState.player.party.map((player) => {
      const maxHealth = copiedState.statistics
        ? copiedState.statistics[player.name].maxHealth
        : player.currentHealth;

      return {
        ...player,
        currentHealth: Math.max(
          0,
          player.currentHealth -
            Math.floor((maxHealth / 100) * RUN_HEALTH_PENALTY),
        ),
      };
    });

    return copiedState;
  });
};
