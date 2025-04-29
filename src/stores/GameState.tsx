import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Room } from "../types";

export interface GameStateData {
  party: [];
  location: { dungeon: Room[][] };
}

// Define your state interface
interface StoreState {
  player: GameStateData;

  setDungeon: (dungeon: Room[][], position?: { x: number; y: number }) => void;
  setState: (gameState: GameStateData) => void;
}

// Define the type for persisted state
type PersistedState = Omit<StoreState, "setDungeon" | "setState">;

// Define storage value type
interface StorageValue {
  state: {
    player: { party: []; location: { dungeon: [] } };
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

// Create the store
export const useGameState = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      player: { party: [], location: { dungeon: [] } },

      // Methods
      setDungeon: (dungeon, position) =>
        set((state) => {
          if (position) {
            const newDungeon = state.player.location.dungeon.map((row) => [
              ...row,
            ]);

            newDungeon[position.y][position.x].visited = true;
            return {
              player: {
                ...state.player,
                location: {
                  ...state.player.location,
                  dungeon: newDungeon,
                },
              },
            };
          }
          return {
            player: {
              ...state.player,
              location: {
                ...state.player.location,
                dungeon: dungeon,
              },
            },
          };
        }),

      setState: (gameState: GameStateData) =>
        set((state) => ({ player: gameState })),
    }),
    persistConfig
  )
);
