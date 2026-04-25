import { GameStateData } from "../../../types/gameState";
import { StoreSet } from "./types";

export const updatePlayerState = (set: StoreSet) => (model: GameStateData) => {
  set((state) => ({ ...state, player: model }));
};
