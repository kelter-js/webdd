import { increaseCharacterStat } from "../../utils";
import { StoreSet } from "./types";

export const increaseAccuracy = (set: StoreSet) => (characterName: string) => {
  set((state) => increaseCharacterStat(state, characterName, "accuracy"));
};
