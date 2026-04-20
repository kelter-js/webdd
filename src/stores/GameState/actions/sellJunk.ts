import { JUNK_DATA } from "../../../constants/items";
import { StoreSet } from "./types";

export const sellJunk = (set: StoreSet) => () => {
  set((state) => {
    const { junk, gold } = state.player;

    const goldAmount = junk.reduce<number>((acc, item) => {
      const [junkType, amount] = item;
      const junkData = JUNK_DATA[junkType];
      acc += junkData.price * Number(amount);
      return acc;
    }, 0);

    return {
      ...state,
      player: { ...state.player, gold: gold + Math.abs(goldAmount), junk: [] },
    };
  });
};
