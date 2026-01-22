import { getImprovementPrice } from "../../../utils";
import { StoreSet } from "./types";

const MAX_BAG_LEVEL = 3;

export const increaseResourcesBagLevel = (set: StoreSet) => () => {
  set((state) => {
    const copyState = { ...state, player: { ...state.player } };

    const improvementPrice = getImprovementPrice(
      copyState.player.resourcesBagLevel,
    );
    copyState.player.gold = copyState.player.gold - improvementPrice;

    copyState.player.resourcesBagLevel += 1;

    if (copyState.player.resourcesBagLevel > MAX_BAG_LEVEL) {
      copyState.player.resourcesBagLevel = MAX_BAG_LEVEL;
    }

    return copyState;
  });
};
