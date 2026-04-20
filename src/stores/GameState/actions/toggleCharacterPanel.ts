import { RENDER_LOCATIONS } from "../../../entities";
import { StoreSet } from "./types";
// FIXME типизация
export const toggleCharacterPanel = (set: StoreSet) => () => {
  set((state) => {
    //здесь учитываем текущее местоположение - из инвентаря в окно пресонажа и наоборот
    const getPrevLocation = () => {
      if (state.player.locationState === RENDER_LOCATIONS.INVENTORY) {
        return state.player.prevLocationState;
      }

      return state.player.prevLocationState ? null : state.player.locationState;
    };
    //здесь учитываем текущее местоположение - из инвентаря в окно пресонажа и наоборот
    const getNextLocation = () => {
      if (state.player.locationState === RENDER_LOCATIONS.INVENTORY) {
        return RENDER_LOCATIONS.LEVELING;
      }

      return state.player.prevLocationState
        ? state.player.prevLocationState
        : RENDER_LOCATIONS.LEVELING;
    };

    return {
      player: {
        ...state.player,
        prevLocationState: getPrevLocation(),
        locationState: getNextLocation(),
      },
    };
  });
};
