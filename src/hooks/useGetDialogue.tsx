import {
  questDeskDialog,
  smithDialog,
  citadelDialog,
  priestDialog,
} from "../constants/dialogs/smith";

import { DIALOGUE_FLAGS } from "../entities/dialogues";
import { useAppState, useGameState } from "../stores";
import { BUILDING_NAMES } from "../constants";
import { useMemo } from "react";

export const useGetDialogue = (npc: string | null) => {
  const {
    player: { dialogFlags },
  } = useGameState();
  console.log("dialogFlags", dialogFlags);

  const { toggleEconomicModal, setDialogueOpen } = useAppState();

  const dialogue = useMemo(() => {
    switch (npc) {
      case BUILDING_NAMES.SMITH:
        return smithDialog.intro_npc;

      case BUILDING_NAMES.QUEST_DESK:
        return questDeskDialog.intro_npc;

      case BUILDING_NAMES.MEDICAL_STATION:
        if (dialogFlags.includes(DIALOGUE_FLAGS.PRIEST_WELCOME)) {
          console.log("priestDialog", priestDialog);
          priestDialog.intro_npc.startNode = "greetings";
        }

        return priestDialog.intro_npc;

      case BUILDING_NAMES.CITADEL: {
        if (dialogFlags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
          toggleEconomicModal(true);
          setDialogueOpen(null);
          return null;
        }

        return citadelDialog.intro_npc;
      }

      default:
        return null;
    }
  }, [npc, dialogFlags]);

  return dialogue;
};
