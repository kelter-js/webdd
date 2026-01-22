import {
  questDeskDialog,
  smithDialog,
  citadelDialog,
  priestDialog,
  tavernDialog,
  watchmenDialog,
  starCounterDialog,
  DEFAULT_TAVERN_WELCOME_OPTIONS,
} from "../constants/dialogs/smith";

import { DIALOGUE_FLAGS, DIALOGUE_IDS } from "../entities/dialogues";
import { useAppState, useGameState } from "../stores";
import { BUILDING_NAMES } from "../constants";
import { getImprovementPrice } from "../utils";
import { useMemo } from "react";

export const useGetDialogue = (npc: string | null) => {
  const {
    player: { dialogFlags, gold, resourcesBagLevel },
  } = useGameState();
  console.log("dialogFlags", dialogFlags);

  // через флаги - определяем какие диалоги могут быть как должны начинаться
  // через ID в опциях - определяем какие должны быть отработаны коллбэки, пример -
  // {
  // text: "Покажи что есть в наличии",
  // nextNode: "end",
  // id: DIALOGUE_IDS.TAVERN_BUY,
  // }

  const { toggleEconomicModal, setDialogueOpen } = useAppState();

  const dialogue = useMemo(() => {
    switch (npc) {
      case BUILDING_NAMES.SMITH:
        return smithDialog.intro_npc;

      case BUILDING_NAMES.QUEST_DESK:
        return questDeskDialog.intro_npc;

      case BUILDING_NAMES.TAVERN:
        if (dialogFlags.includes(DIALOGUE_FLAGS.BODY_PARTS)) {
          tavernDialog.intro_npc.startNode = "alreadyWelcomed";
        }

        return tavernDialog.intro_npc;

      case BUILDING_NAMES.SHOP:
        if (dialogFlags.includes(DIALOGUE_FLAGS.IMPROVE_BAG)) {
          watchmenDialog.intro_npc.nodes.welcome.options =
            watchmenDialog.intro_npc.nodes.welcome.options.filter(
              (option) => option.id !== DIALOGUE_IDS.IMPROVE_BAG_INTRO,
            );

          const isImprovementAvailable = resourcesBagLevel !== 3;

          if (isImprovementAvailable) {
            const priceForImprovement = getImprovementPrice(resourcesBagLevel);
            const cantAffordBag = gold < priceForImprovement;

            watchmenDialog.intro_npc.nodes.welcome.options = [
              ...DEFAULT_TAVERN_WELCOME_OPTIONS.slice(0, 2),
              {
                text: "[купить улучшение сумки на 8 дополнительных слотов]",
                nextNode: "end",
                id: DIALOGUE_IDS.BUY_BAG_IMPROVEMENT,
                isDisabled: cantAffordBag,
              },
            ];
          } else {
            watchmenDialog.intro_npc.nodes.welcome.options =
              DEFAULT_TAVERN_WELCOME_OPTIONS.slice(0, 2);
          }
        } else {
          const hasNoImprovementsYet = resourcesBagLevel === 1;

          if (hasNoImprovementsYet) {
            const priceForImprovement = getImprovementPrice(resourcesBagLevel);
            const cantAffordBag = gold < priceForImprovement;

            watchmenDialog.intro_npc.nodes.services.options[0].isDisabled =
              cantAffordBag;
          }
        }

        return watchmenDialog.intro_npc;

      case BUILDING_NAMES.MEDICAL_STATION:
        if (dialogFlags.includes(DIALOGUE_FLAGS.PRIEST_WELCOME)) {
          priestDialog.intro_npc.startNode = "greetings";
        }

        return priestDialog.intro_npc;

      case BUILDING_NAMES.TOWER:
        if (dialogFlags.includes(DIALOGUE_FLAGS.PHOTO)) {
          starCounterDialog.intro_npc.startNode = "buy_camera";

          const buyNode =
            starCounterDialog.intro_npc.nodes.buy_camera.options.find(
              (option) => option.id === DIALOGUE_IDS.BUY_CAMERA,
            );

          if (buyNode) {
            buyNode.isDisabled = gold < 5000;
          }
        }

        if (dialogFlags.includes(DIALOGUE_FLAGS.CAMERA)) {
          starCounterDialog.intro_npc.startNode = "almanac";
        }

        return starCounterDialog.intro_npc;

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
  }, [npc, dialogFlags, resourcesBagLevel, gold]);

  return dialogue;
};
