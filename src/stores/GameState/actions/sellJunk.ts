import { JUNK_DATA } from "../../../constants/items";
import { StoreSet } from "./types";
// FIXME типизация
export const sellJunk = (set: StoreSet) => () => {
  set((state) => {
    const stateCopy = { ...state, player: { ...state.player } };

    const goldAmount = stateCopy.player.junk.reduce<number>((acc, item) => {
      const [junkType, amount] = item;

      const junkData = JUNK_DATA[junkType];
      acc += junkData.price * Number(amount);

      return acc;
    }, 0);

    stateCopy.player.gold += goldAmount;
    stateCopy.player.junk = [];

    return stateCopy;
  });
};
