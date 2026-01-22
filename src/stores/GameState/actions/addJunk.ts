import { JUNK_TYPES } from "../../../entities/junk";
import { StoreSet } from "./types";
// FIXME типизация
export const addJunk =
  (set: StoreSet) => (junkToAdd: JUNK_TYPES, amount: number) => {
    set((state) => {
      const stateCopy = { ...state, player: { ...state.player } };

      const junkItem = stateCopy.player.junk.find(
        (item) => item[0] === junkToAdd
      );

      if (junkItem) {
        stateCopy.player.junk = stateCopy.player.junk.map((item) =>
          item[0] === junkToAdd
            ? [item[0], String(Number(item[1]) + amount)]
            : item
        );
      } else {
        stateCopy.player.junk.push([junkToAdd, String(amount)]);
      }

      return stateCopy;
    });
  };
