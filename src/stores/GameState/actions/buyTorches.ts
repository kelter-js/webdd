import { TORCH_PRICE } from "../../../constants";

import { StoreSet } from "./types";

export const buyTorches = (set: StoreSet) => (amountOfTorches: number) => {
  set((state) => {
    const stateCopy = { ...state, player: { ...state.player } };
    const priceToPay = TORCH_PRICE * amountOfTorches;
    stateCopy.player.gold = Math.max(0, stateCopy.player.gold - priceToPay);
    stateCopy.player.torches += amountOfTorches;

    return stateCopy;
  });
};
