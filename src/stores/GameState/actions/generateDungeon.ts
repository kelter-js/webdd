import { DUNGEONS, RENDER_LOCATIONS } from "../../../entities";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { generateDungeon as generateDungeonUtil } from "../../../utils";

import { StoreSet } from "./types";

const DEFAULT_ATTEMPS_AMOUNT = 5;

const getDungeonSizeByTier = (currentTier: number) => {
  if (currentTier === 3) {
    return 10;
  }

  if (currentTier === 2) {
    return 7;
  }

  return 5;
};

// FIXME типизация
export const generateDungeon =
  (set: StoreSet) =>
  (dungeonType: DUNGEONS = DUNGEONS.STORY) => {
    set((state) => {
      const stateCopy = { ...state, player: { ...state.player } };

      const dungeonSize = getDungeonSizeByTier(stateCopy.player.currentTier);
      const newDungeon = generateDungeonUtil(
        dungeonSize,
        dungeonSize,
        dungeonType === DUNGEONS.FIND,
      );

      stateCopy.player.location = {
        ...state.player.location,
        dungeon: newDungeon,
        type: dungeonType,
        attempts: DEFAULT_ATTEMPS_AMOUNT,
        position: { x: 0, y: 0 },
        roomsVisited: 0,
        encounterChance: MIN_ENCOUNTER_CHANCE,
      };

      stateCopy.player.locationState = RENDER_LOCATIONS.DUNGEON;

      return stateCopy;
    });
  };
