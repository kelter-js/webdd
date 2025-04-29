import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Room } from "../types";
import { GameStateData } from "./GameState";

// Define your state interface
interface StoreState {
  gameSaves: { gameState: GameStateData; date: Date }[];

  updateGameSaves: (gameState: GameStateData, index: number) => void;
}

// Define the type for persisted state
type PersistedState = Omit<StoreState, "updateGameSaves">;

// Define storage value type
interface StorageValue {
  state: {
    gameSaves: { gameState: GameStateData; date: Date }[];
    generatedDungeon: [];
  };
}

const reviver = (key: string, value: any) => {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
  ) {
    return new Date(value);
  }
  return value;
};

// Define persistence configuration
const persistConfig: PersistOptions<StoreState, PersistedState> = {
  name: "game-saves",

  partialize: (state) => ({
    gameSaves: state.gameSaves,
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

// Create the store
export const useGameSaves = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      gameSaves: [
        {
          gameState: { party: [], location: { dungeon: [] } },
          date: new Date(),
        },
      ],

      // Methods
      updateGameSaves: (gameState, index) =>
        set((state) => {
          const newGameSaves = [...state.gameSaves];
          newGameSaves[index] = { gameState, date: new Date() };

          return { gameSaves: newGameSaves };
        }),
    }),
    persistConfig
  )
);
