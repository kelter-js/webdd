import { increaseCharacterStat } from "../../utils";
import { StoreSet } from "./types";

export const increaseEndurance = (set: StoreSet) => (characterName: string) => {
  set((state) => increaseCharacterStat(state, characterName, "endurance"));
};
