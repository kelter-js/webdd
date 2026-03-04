import { FLAGS } from "../../constants";
import { CREATURE_TO_IMG_MAP } from "../../constants/creatures";
import {
  FIRST_TIER_ALMANAC_ENEMIES_LIST,
  SECOND_TIER_ALMANAC_ENEMIES_LIST,
  THIRD_TIER_ALMANAC_ENEMIES_LIST,
  ALMANAC_ENEMIES_GENERIC_TYPES,
  ENEMIES,
} from "../../entities/enemies";
import { GameStateData } from "../../types/gameState";

import torso from "../../assets/enemies/closed/first_tier/torso-clean.png";
import spider from "../../assets/enemies/closed/first_tier/spider-clean.png";
import watcher from "../../assets/enemies/closed/first_tier/watcher-clean.png";
import spirit from "../../assets/enemies/closed/first_tier/spirit-clean.png";
import soldier from "../../assets/enemies/closed/second_tier/soldier-clean.png";
import firefighter from "../../assets/enemies/closed/second_tier/firefighter-clean.png";
import sneaker from "../../assets/enemies/closed/second_tier/sneaker-clean.png";
import lost from "../../assets/enemies/closed/second_tier/lost-clean.png";
import allSeeing from "../../assets/enemies/closed/third_tier/all-seeing-clean.png";
import knight from "../../assets/enemies/closed/third_tier/knight-clean.png";
import actress from "../../assets/enemies/closed/third_tier/actress-clean.png";
import singer from "../../assets/enemies/closed/third_tier/singer-clean.png";

const FIRST_TIER_CREATURES_COUNTER = 20;
const SECOND_TIER_CREATURES_COUNTER = 15;
const THIRD_TIER_CREATURES_COUNTER = 10;

export const ENEMY_DESCRIPTIONS = {
  // 1 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.TORSO]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT]: "",

  // 2 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.LOST]: "",

  // 3 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.SINGER]: "",
  [ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT]: "",
};

export const ENEMY_IMAGES = {
  // 1 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.TORSO]: {
    locked: torso,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.TORSO_TIER_1],
  },

  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIDER]: {
    locked: spider,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SPIDER_TIER_1],
  },

  [ALMANAC_ENEMIES_GENERIC_TYPES.WATCHER]: {
    locked: watcher,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.WATCHER_TIER_1],
  },

  [ALMANAC_ENEMIES_GENERIC_TYPES.SPIRIT]: {
    locked: spirit,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SPIRIT_TIER_1],
  },

  // 2 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.SOLDIER]: {
    locked: soldier,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SOLDIER_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.FIREFIGHTER]: {
    locked: firefighter,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.FIREFIGHTER_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.SNEAKER]: {
    locked: sneaker,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SNEAKER_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.LOST]: {
    locked: lost,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.LOST_TIER_1],
  },

  // 3 тир
  [ALMANAC_ENEMIES_GENERIC_TYPES.ALL_SEEING]: {
    locked: allSeeing,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.ALL_SEEING_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.KNIGHT]: {
    locked: knight,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.KNIGHT_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.ACTRESS]: {
    locked: actress,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.ACTRESS_TIER_1],
  },
  [ALMANAC_ENEMIES_GENERIC_TYPES.SINGER]: {
    locked: singer,
    unlocked: CREATURE_TO_IMG_MAP[ENEMIES.SINGER_TIER_1],
  },
};

export const getEnemiesByTier = (currentTier: number) => {
  if (currentTier === 1) {
    return FIRST_TIER_ALMANAC_ENEMIES_LIST;
  }

  if (currentTier === 2) {
    return SECOND_TIER_ALMANAC_ENEMIES_LIST;
  }

  return THIRD_TIER_ALMANAC_ENEMIES_LIST;
};

const ENEMY_TIER_REQUIREMENTS: Record<ALMANAC_ENEMIES_GENERIC_TYPES, number> = {
  // Tier 1
  ...Object.fromEntries(
    FIRST_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      FIRST_TIER_CREATURES_COUNTER,
    ]),
  ),
  // Tier 2
  ...Object.fromEntries(
    SECOND_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      SECOND_TIER_CREATURES_COUNTER,
    ]),
  ),
  // Tier 3
  ...Object.fromEntries(
    THIRD_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      THIRD_TIER_CREATURES_COUNTER,
    ]),
  ),
} as any;

export const isEnemyUnlocked = (
  player: GameStateData,
  enemyType: ALMANAC_ENEMIES_GENERIC_TYPES,
) => {
  const required = ENEMY_TIER_REQUIREMENTS[enemyType];

  if (required === undefined) return false;

  return (player.playStatistics.kills[enemyType] || 0) >= required;
};

export const isEveryEnemyUnlocked = (player: GameStateData) => {
  if (player.flags.includes(FLAGS.CHAOS_CHALICE_REVEICED)) {
    return false;
  }

  const enemyTypes = Object.values(ALMANAC_ENEMIES_GENERIC_TYPES);

  return enemyTypes.every((type) => isEnemyUnlocked(player, type));
};
