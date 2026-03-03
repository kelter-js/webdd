import { DungeonCreation } from "../../../types/gameState";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { StoreSet } from "./types";
// FIXME типизация
export const setDungeon =
  (set: StoreSet) => (props: DungeonCreation | null) => {
    set((state) => {
      const location = state.player.location;
      const { dungeon, type, attempts, position } = props ?? {};

      if (location) {
        // устанавливаем изначальное значение шанса на встречу с противником
        if (state.player?.location && !state.player.location?.encounterChance) {
          state.player.location.encounterChance = MIN_ENCOUNTER_CHANCE;
        }

        return {
          player: {
            ...state.player,
            location: {
              ...state.player.location,
              dungeon,
              type,
              attempts,
              position,
              roomsVisited: 0,
              dungeonLevel:
                state.player.location?.dungeonLevel ?? state.player.currentTier,
            },
          },
        };
      }

      return state;
    });
  };
