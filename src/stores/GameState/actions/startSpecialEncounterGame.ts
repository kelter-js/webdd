import { SPECIAL_ENCOUNTERS } from "../../../entities/specialEncounters";
import { StoreSet } from "./types";

export const startSpecialEncounterGame = (set: StoreSet) => (node?: string) => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    const location = copyState.player.location;

    if (location) {
      const newLocation = { ...location };

      if (node) {
        newLocation.node = node;
      }

      newLocation.attempts =
        newLocation.specialEncounter === SPECIAL_ENCOUNTERS.GHOST ? 3 : 2;
      newLocation.success = 0;

      copyState.player.location = newLocation;
    }

    return copyState;
  });
};
