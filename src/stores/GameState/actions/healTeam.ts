import { HP_PER_ENDURANCE_POINT } from "../../constants";
import { StoreSet } from "./types";

export const healTeam = (set: StoreSet) => () => {
  set((state) => ({
    ...state,
    player: {
      ...state.player,
      party: state.player.party.map((character) => {
        character.currentHealth = character.endurance * HP_PER_ENDURANCE_POINT;
        return character;
      }),
    },
  }));
};
