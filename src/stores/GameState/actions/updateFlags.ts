import { FLAGS } from "../../../constants";
import { StoreSet } from "./types";

// FIXME типизация
export const updateFlags = (set: StoreSet) => (flags: FLAGS) => {
  set((state) => {
    const stateCopy = { ...state, player: { ...state.player } };

    stateCopy.player.flags.push(flags);

    return stateCopy;
  });
};
