import { useEffect } from "react";

import { useAppState, useGameState } from "../stores";
import { RENDER_LOCATIONS } from "../entities/renderLocations";
import { BUILDING_NAMES, FLAGS } from "../constants";
import { DIALOGUE_FLAGS } from "../entities/dialogues";

// REFACTORING CHECKED ✅

export const useTutorial = (loaded: boolean) => {
  const { setDialogueOpen } = useAppState();

  const {
    player: { flags, sliderId, dialogFlags, locationState },
  } = useGameState();

  useEffect(() => {
    if (
      loaded &&
      flags.includes(FLAGS.INTRO_SHOWED) &&
      !dialogFlags.includes(DIALOGUE_FLAGS.TUTOR_TIER_1_ENDED)
    ) {
      setDialogueOpen(BUILDING_NAMES.TUTOR);
    }

    if (
      loaded &&
      flags.includes(FLAGS.FIRST_STORY_BOSS_VICTORY) &&
      !dialogFlags.includes(DIALOGUE_FLAGS.TUTOR_TIER_2_ENDED) &&
      locationState === RENDER_LOCATIONS.SETTLEMENT
    ) {
      setDialogueOpen(BUILDING_NAMES.TUTOR);
    }

    if (
      loaded &&
      flags.includes(FLAGS.SECOND_STORY_BOSS_VICTORY) &&
      !dialogFlags.includes(DIALOGUE_FLAGS.TUTOR_TIER_3_ENDED) &&
      locationState === RENDER_LOCATIONS.SETTLEMENT
    ) {
      setDialogueOpen(BUILDING_NAMES.TUTOR);
    }
  }, [dialogFlags, flags, sliderId, loaded, locationState]);
};
