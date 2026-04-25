import { JUNK_TYPES } from "../../../entities/junk";
import { StoreSet } from "./types";

export const addJunk =
  (set: StoreSet) => (junkToAdd: JUNK_TYPES, amount: number) => {
    set((state) => {
      const {
        player: { junk },
      } = state;

      const junkItem = junk?.find((item) => item[0] === junkToAdd);

      return {
        ...state,
        player: {
          ...state.player,
          junk: junkItem
            ? junk.map((item) =>
                item[0] === junkToAdd
                  ? [item[0], String(Number(item[1]) + amount)]
                  : item,
              )
            : [...(junk || []), [junkToAdd, String(amount)]],
        },
      };
    });
  };
