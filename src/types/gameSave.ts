import { GameStateData } from "./gameState";

interface SaveData {
  gameState: GameStateData;
  date: Date;
}

// Define your state interface
export interface StoreState {
  gameSaves: SaveData[] | null;
  defaultSave: SaveData | null;
  updateGameSaves: (gameState: GameStateData, index: number) => void;
  autoSave: (gameState: GameStateData) => void;
}

// Define the type for persisted state
export type PersistedState = Omit<StoreState, "updateGameSaves" | "autoSave">;

// Define storage value type
export interface StorageValue {
  state: {
    gameSaves: SaveData[] | null;
    defaultSave: SaveData | null;
  };
}
