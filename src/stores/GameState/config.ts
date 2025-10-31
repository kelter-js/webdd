import { PersistOptions } from "zustand/middleware";
import {
  PersistedState,
  StoreState,
  StorageValue,
} from "../../types/gameState";
import { reviver } from "../utils";

// Define persistence configuration
export const persistConfig: PersistOptions<StoreState, PersistedState> = {
  name: "game-state",

  partialize: (state) => ({
    player: state.player,
  }),

  storage: {
    getItem: (name: string) => {
      const str = localStorage.getItem(name);
      if (!str) return null;

      return JSON.parse(str, reviver) as StorageValue;
    },

    setItem: (name: string, value: unknown) => {
      const storageValue = value as StorageValue;
      const serialized: StorageValue = {
        state: storageValue.state,
      };
      localStorage.setItem(name, JSON.stringify(serialized));
    },

    removeItem: (name: string) => localStorage.removeItem(name),
  },
};
