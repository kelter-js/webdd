import { RENDER_LOCATIONS } from "../../../entities";
import { StoreSet } from "./types";

export const setLocationState =
  (set: StoreSet) => (newLocation: RENDER_LOCATIONS) => {
    set((state) => ({
      ...state,
      player: { ...state.player, locationState: newLocation },
    }));
  };
