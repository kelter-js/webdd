import { StoreSet } from "./types";

export const healTeam = (set: StoreSet) => () => {
  set((state) => {
    const { statistics } = state;

    return {
      ...state,
      player: {
        ...state.player,
        party: statistics
          ? state.player.party.map((character) => {
              const stat = statistics[character.name];

              if (stat) {
                return {
                  ...character,
                  currentHealth: stat.maxHealth,
                };
              }

              return character;
            })
          : state.player.party,
      },
    };
  });
};
