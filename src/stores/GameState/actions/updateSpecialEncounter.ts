import { StoreSet } from "./types";

interface SpecialEncounterUpdateData {
  node?: string;
  reset?: boolean;
  isSuccessful?: boolean;
}

export const updateSpecialEncounter =
  (set: StoreSet) =>
  ({ node, reset, isSuccessful }: SpecialEncounterUpdateData) => {
    set((state) => {
      const copyState = { ...state, player: { ...state.player } };

      if (copyState.player.location) {
        if (reset) {
          copyState.player.location.attempts =
            (copyState.player.location.attempts ?? 0) - 1;
          copyState.player.location.success = 0;
        }

        if (isSuccessful) {
          copyState.player.location.success =
            (copyState.player.location.success ?? 0) + 1;
        }

        if (node) {
          copyState.player.location.node = node;
        }
      }

      return copyState;
    });
  };
