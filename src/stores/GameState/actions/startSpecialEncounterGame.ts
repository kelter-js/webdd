import { SPECIAL_ENCOUNTERS } from "../../../entities/specialEncounters";
import { StoreSet } from "./types";

export const startSpecialEncounterGame = (set: StoreSet) => (node?: string) => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    if (copyState.player.location) {
      if (node) {
        copyState.player.location.node = node;
      }

      copyState.player.location.attempts =
        copyState.player.location.specialEncounter === SPECIAL_ENCOUNTERS.GHOST
          ? 3
          : 2;
      copyState.player.location.success = 0;
    }

    return copyState;
  });
};
