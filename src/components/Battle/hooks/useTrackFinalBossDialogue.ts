import { useEffect } from "react";

import { DIALOGUE_FLAGS } from "../../../entities/dialogues";
import { useAppState, useGameState } from "../../../stores";
import { BUILDING_NAMES } from "../../../constants";
import { ENEMIES } from "../../../entities";

export const useTrackFinalBossDialogue = () => {
  const {
    player: { battle, dialogFlags },
  } = useGameState();

  const { setDialogueOpen, isDialogueOpen } = useAppState();

  useEffect(() => {
    if (
      battle?.enemy.party[0].type === ENEMIES.MERGED_MASS_TIER_1 &&
      !isDialogueOpen &&
      !dialogFlags.includes(DIALOGUE_FLAGS.FINAL_DIALOG_ENDED)
    ) {
      setDialogueOpen(BUILDING_NAMES.FINAL_DIALOGUE);
    }
  }, [battle?.enemy.party, isDialogueOpen]);
};
