import { increaseCharacterStat } from "../../utils";
import { StoreSet } from "./types";
// FIXME типизация
export const increaseAccuracy = (set: StoreSet) => (characterName: string) => {
  set((state) => {
    return increaseCharacterStat(state, characterName, "accuracy");
  });
};
