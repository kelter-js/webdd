import { generateDungeon as generateDungeonUtil } from "../../../utils";
import { DUNGEONS, RENDER_LOCATIONS } from "../../../entities";
import { MIN_ENCOUNTER_CHANCE } from "../../constants";
import { DungeonCreationData } from "../../../types";
import { StoreSet } from "./types";

const DEFAULT_ATTEMPS_AMOUNT = 5;

const getDungeonSizeByTier = (currentTier: number) => {
  if (currentTier === 3) {
    return 6;
  }

  return 5;
};

export const generateDungeon =
  (set: StoreSet) =>
  ({ dungeonType = DUNGEONS.STORY, dungeonLevel }: DungeonCreationData) => {
    set((state) => {
      const dungeonSize = getDungeonSizeByTier(
        dungeonLevel ?? state.player.currentTier,
      );

      const newDungeon = generateDungeonUtil(
        dungeonSize,
        dungeonSize,
        state.player.playStatistics.dungeonCounter,
        dungeonType,
      );

      return {
        ...state,
        player: {
          ...state.player,
          location: {
            ...(state.player.location || {}),
            dungeon: newDungeon,
            type: dungeonType,
            attempts: DEFAULT_ATTEMPS_AMOUNT,
            position: { x: 0, y: 0 },
            roomsVisited: 0,
            encounterChance: MIN_ENCOUNTER_CHANCE,
            dungeonLevel: dungeonLevel ?? state.player.currentTier,
          },
          locationState: RENDER_LOCATIONS.DUNGEON,
        },
      };
    });
  };
