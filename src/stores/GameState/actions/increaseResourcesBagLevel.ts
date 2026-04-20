import { getImprovementPrice } from "../../../utils";
import { StoreSet } from "./types";

const MAX_BAG_LEVEL = 3;

export const increaseResourcesBagLevel = (set: StoreSet) => () => {
  set((state) => {
    const { gold, resourcesBagLevel } = state.player;

    const improvementPrice = getImprovementPrice(resourcesBagLevel);

    const increasedLevelBag = resourcesBagLevel + 1;

    return {
      ...state,
      player: {
        ...state.player,
        gold: gold - improvementPrice,
        resourcesBagLevel:
          increasedLevelBag > MAX_BAG_LEVEL ? MAX_BAG_LEVEL : increasedLevelBag,
      },
    };
  });
};
