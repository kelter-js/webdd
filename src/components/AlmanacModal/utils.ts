import { FLAGS } from "../../constants";

import {
  FIRST_TIER_ALMANAC_ENEMIES_LIST,
  SECOND_TIER_ALMANAC_ENEMIES_LIST,
  THIRD_TIER_ALMANAC_ENEMIES_LIST,
  ALMANAC_ENEMIES_GENERIC_TYPES,
} from "../../entities/enemies";
import { GameStateData } from "../../types/gameState";

const FIRST_TIER_CREATURES_COUNTER = 15;
const SECOND_TIER_CREATURES_COUNTER = 15;
const THIRD_TIER_CREATURES_COUNTER = 10;

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
  ...Object.fromEntries(
    FIRST_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      FIRST_TIER_CREATURES_COUNTER,
    ]),
  ),
  ...Object.fromEntries(
    SECOND_TIER_ALMANAC_ENEMIES_LIST.map((type) => [
      type,
      SECOND_TIER_CREATURES_COUNTER,
    ]),
  ),
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
