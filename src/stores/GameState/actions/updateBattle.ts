import { BattleUpdateState } from "../../../types/gameState";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { StoreSet } from "./types";
// FIXME типизация
export const updateBattle = (set: StoreSet) => (props: BattleUpdateState) => {
  set((state) => {
    // все рассчеты делаем извне, сюда просто передается фулл модель боя и она заменяет собой прошлое состояние
    return state;
  });
};
