import { ECONOMIC_TYPES } from "../../../entities";
import { StoreSet } from "./types";

export const setEconomicBranch =
  (set: StoreSet) => (economicBranch: ECONOMIC_TYPES | null) => {
    set((state) => ({
      player: {
        ...state.player,
        economic: economicBranch,
      },
    }));
  };
