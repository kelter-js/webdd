import { FLAGS } from "../constants";

export const getFlagStoryBossByTier = (currentTier: number) => {
  if (currentTier === 1) {
    return FLAGS.FIRST_STORY_BOSS_VICTORY;
  }

  if (currentTier === 1) {
    return FLAGS.SECOND_STORY_BOSS_VICTORY;
  }

  return FLAGS.THIRD_STORY_BOSS_VICTORY;
};
