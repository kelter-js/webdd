import { StoreSet } from "./types";

export const healTeam = (set: StoreSet) => () => {
  set((state) => ({
    ...state,
    player: {
      ...state.player,
      party: state.player.party.map((character) => {
        if (state.statistics) {
          character.currentHealth = state.statistics[character.name].maxHealth;
        }

        return character;
      }),
    },
  }));
};
