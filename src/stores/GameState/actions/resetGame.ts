import { DEFAULT_GAME_STATE } from "../../constants";
import { StoreSet } from "./types";

export const resetGame = (set: StoreSet) => () =>
  // FIXME: возможно тут нужно рекалькулировать статы
  set(() => ({
    player: { ...DEFAULT_GAME_STATE },
    effects: null,
    inventory: null,
    statistics: null,
    gear: null,
    abilities: null,
    isDiceRequiredRoll: false,
    isAutoSaveRequired: false,
    playersLvlUpNotifications: [],
  }));
