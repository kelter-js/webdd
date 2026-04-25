import { FLAGS } from "../../../constants";
import { StoreSet } from "./types";

export const updateFlags = (set: StoreSet) => (flags: FLAGS) => {
  set((state) => ({
    ...state,
    player: { ...state.player, flags: [...state.player.flags, flags] },
  }));
};
