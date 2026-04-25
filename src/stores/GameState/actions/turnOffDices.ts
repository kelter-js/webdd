import { StoreSet } from "./types";

export const turnOffDices = (set: StoreSet) => () =>
  set((state) => ({ ...state, isDiceRequiredRoll: false }));
