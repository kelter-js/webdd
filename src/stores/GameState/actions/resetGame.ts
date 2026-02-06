import { DEFAULT_GAME_STATE } from "../../constants";
import { StoreSet } from "./types";

export const resetGame = (set: StoreSet) => () =>
  // FIXME: возможно тут нужно рекалькулировать статы
  set(() => {
    console.log("DEFAULT_GAME_STATE", DEFAULT_GAME_STATE);
    return {
      player: { ...DEFAULT_GAME_STATE, consumables: [], name: "" },
      effects: null,
      sell_inventory: null,
      inventory: null,
      statistics: null,
      gear: null,
      abilities: null,
      isDiceRequiredRoll: false,
      isAutoSaveRequired: false,
      playersLvlUpNotifications: [],
    };
  });
