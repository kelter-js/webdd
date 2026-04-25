import { DIALOGUE_FLAGS } from "../../../entities/dialogues";
import { StoreSet } from "./types";

export const updateDialogFlags =
  (set: StoreSet) => (flags: DIALOGUE_FLAGS[]) => {
    set((state) => ({
      ...state,
      player: {
        ...state.player,
        dialogFlags: Array.from(
          new Set([...state.player.dialogFlags, ...flags])
        ),
      },
    }));
  };
