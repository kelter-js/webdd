import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

import { PersistedState, StorageValue, StoreState } from "../types/gameSave";

import { reviver } from "./utils";

// Define persistence configuration
const persistConfig: PersistOptions<StoreState, PersistedState> = {
  name: "game-saves",
  partialize: (state) => ({
    gameSaves: state.gameSaves,
    defaultSave: state.defaultSave,
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
      gameSaves: [],
      defaultSave: null,

      // Methods
      updateGameSaves: (gameState, index) =>
        set((state) => {
          if (state.gameSaves) {
            const newGameSaves = [...state.gameSaves];
            newGameSaves[index] = {
              gameState: {
                ...gameState,
                location: gameState.location
                  ? {
                      ...gameState.location,
                      dungeon: gameState.location.dungeon
                        ? gameState.location.dungeon!.map((item) => {
                            return item.map((subItem) => ({ ...subItem }));
                          })
                        : undefined,
                    }
                  : null,
              },
              date: new Date(),
            };

            return { gameSaves: newGameSaves };
          }

          return { gameSaves: [{ gameState, date: new Date() }] };
        }),

      autoSave: (gameState) =>
        set(() => ({
          defaultSave: {
            gameState: {
              ...gameState,
              location: gameState.location
                ? {
                    ...gameState.location,
                    dungeon: gameState.location.dungeon
                      ? gameState.location.dungeon!.map((item) => {
                          return item.map((subItem) => ({ ...subItem }));
                        })
                      : undefined,
                  }
                : null,
            },
            date: new Date(),
          },
        })),
    }),
    persistConfig,
  ),
);
