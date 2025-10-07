import { DUNGEONS } from "../entities/dungeons";
import { RENDER_LOCATIONS } from "../entities/renderLocations";
import { GameStateData } from "../types/gameState";

export const MIN_ENCOUNTER_CHANCE = 8;
export const MIN_ENCOUNTER_CHANCE_MID_TIER = 6;
export const MIN_ENCOUNTER_CHANCE_HIGHT_TIER = 4;
export const MAX_ENCOUNTER_CHANCE = 85;
export const VISITED_LOCATION_WITH_LIGHT = 10;
export const VISITED_LOCATION_WITHOUT_LIGHT = 25;
export const DEAD_END_ENEMY_CHANCE = 70;

export const DEFAULT_GAME_STATE: GameStateData = {
  party: [],
  location: {
    dungeon: [],
    position: { x: 0, y: 0 },
    type: DUNGEONS.STORY,
    encounterChance: MIN_ENCOUNTER_CHANCE,
  },
  name: "",
  locationState: RENDER_LOCATIONS.SETTLEMENT,
  prevLocationState: null,
  battle: null,
  inventory_memoized: [],
  quest: null,
  gear_memoized: {},
  consumables: [],
  gold: 0,
  isGameOver: false,
  currentTier: 1,
  torches: 0,
  dialogFlags: [],
  economic: null,
};

export const DEFAULT_GAME_SAVE = {
  gameState: DEFAULT_GAME_STATE,
  date: new Date(),
};

export const DEFAULT_GAME_SAVES = [DEFAULT_GAME_SAVE];
