import { DungeonCreation } from "../../../types/gameState";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { StoreSet } from "./types";

export const setDungeon =
  (set: StoreSet) => (props: DungeonCreation | null) => {
    set((state) => {
      const location = state.player.location;
      const { dungeon, type, attempts, position } = props ?? {};

      if (location) {
        return {
          player: {
            ...state.player,
            location: {
              ...location,
              encounterChance: location.encounterChance ?? MIN_ENCOUNTER_CHANCE,
              dungeon,
              type,
              attempts,
              position,
              roomsVisited: 0,
              dungeonLevel: location?.dungeonLevel ?? state.player.currentTier,
            },
          },
        };
      }

      return state;
    });
  };
