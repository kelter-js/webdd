import { DUNGEONS, RENDER_LOCATIONS } from "../../../entities";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { generateDungeon as generateDungeonUtil } from "../../../utils";

import { StoreSet } from "./types";
import { DungeonCreationData } from "../../../types";

const DEFAULT_ATTEMPS_AMOUNT = 5;

const getDungeonSizeByTier = (currentTier: number) => {
  if (currentTier === 3) {
    return 6;
  }

  return 5;
};

// FIXME типизация
export const generateDungeon =
  (set: StoreSet) =>
  ({ dungeonType = DUNGEONS.STORY, dungeonLevel }: DungeonCreationData) => {
    set((state) => {
      const stateCopy = { ...state, player: { ...state.player } };

      const dungeonSize = getDungeonSizeByTier(
        dungeonLevel ?? stateCopy.player.currentTier,
      );
      const newDungeon = generateDungeonUtil(
        dungeonSize,
        dungeonSize,
        stateCopy.player.playStatistics.dungeonCounter,
        dungeonType,
      );

      stateCopy.player.location = {
        ...state.player.location,
        dungeon: newDungeon,
        type: dungeonType,
        attempts: DEFAULT_ATTEMPS_AMOUNT,
        position: { x: 0, y: 0 },
        roomsVisited: 0,
        encounterChance: MIN_ENCOUNTER_CHANCE,
        dungeonLevel: dungeonLevel ?? stateCopy.player.currentTier,
      };

      stateCopy.player.locationState = RENDER_LOCATIONS.DUNGEON;

      return stateCopy;
    });
  };
