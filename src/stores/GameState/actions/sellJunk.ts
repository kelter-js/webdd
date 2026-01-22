import { JUNK_DATA } from "../../../constants/items";
import { JUNK_TYPES } from "../../../entities/junk";
import { StoreSet } from "./types";
// FIXME типизация
export const sellJunk = (set: StoreSet) => (junkToSell: JUNK_TYPES) => {
  set((state) => {
    const stateCopy = { ...state, player: { ...state.player } };

    const junkItem = stateCopy.player.junk.find(
      (item) => item[0] === junkToSell
    );

    if (junkItem) {
      stateCopy.player.junk = stateCopy.player.junk.filter(
        (junk) => junk[0] !== junkToSell
      );

      stateCopy.player.gold +=
        JUNK_DATA[junkToSell].price * Number(junkItem[1]);
    }

    return stateCopy;
  });
};
