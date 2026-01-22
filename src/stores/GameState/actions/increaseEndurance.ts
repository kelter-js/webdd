import { DungeonCreation } from "../../../types/gameState";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { increaseCharacterStat } from "../../utils";
import { StoreSet } from "./types";
// FIXME типизация
export const increaseEndurance = (set: StoreSet) => (characterName: string) => {
  set((state) => {
    return increaseCharacterStat(state, characterName, "endurance");
  });
};
