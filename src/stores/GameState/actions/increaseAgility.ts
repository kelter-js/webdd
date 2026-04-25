import { increaseCharacterStat } from "../../utils";
import { StoreSet } from "./types";

export const increaseAgility = (set: StoreSet) => (characterName: string) => {
  set((state) => increaseCharacterStat(state, characterName, "agility"));
};
