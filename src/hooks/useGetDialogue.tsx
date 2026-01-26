import {
  questDeskDialog,
  smithDialog,
  citadelDialog,
  priestDialog,
  tavernDialog,
  traderDialog,
  starCounterDialog,
  DEFAULT_TAVERN_WELCOME_OPTIONS,
} from "../constants/dialogs";

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
        return smithDialog;

      case BUILDING_NAMES.QUEST_DESK:
        return questDeskDialog;

      case BUILDING_NAMES.TAVERN:
        if (dialogFlags.includes(DIALOGUE_FLAGS.BODY_PARTS)) {
          tavernDialog.startNode = "alreadyWelcomed";
        }

        return tavernDialog;

      case BUILDING_NAMES.SHOP:
        if (dialogFlags.includes(DIALOGUE_FLAGS.IMPROVE_BAG)) {
          traderDialog.nodes.welcome.options =
            traderDialog.nodes.welcome.options.filter(
              (option) => option.id !== DIALOGUE_IDS.IMPROVE_BAG_INTRO,
            );

          const isImprovementAvailable = resourcesBagLevel !== 3;

          if (isImprovementAvailable) {
            const priceForImprovement = getImprovementPrice(resourcesBagLevel);
            const cantAffordBag = gold < priceForImprovement;

            traderDialog.nodes.welcome.options = [
              ...DEFAULT_TAVERN_WELCOME_OPTIONS.slice(0, 2),
              {
                text: "[купить улучшение сумки на 8 дополнительных слотов]",
                nextNode: "end",
                id: DIALOGUE_IDS.BUY_BAG_IMPROVEMENT,
                isDisabled: cantAffordBag,
              },
            ];
          } else {
            traderDialog.nodes.welcome.options =
              DEFAULT_TAVERN_WELCOME_OPTIONS.slice(0, 2);
          }
        } else {
          const hasNoImprovementsYet = resourcesBagLevel === 1;

          if (hasNoImprovementsYet) {
            const priceForImprovement = getImprovementPrice(resourcesBagLevel);
            const cantAffordBag = gold < priceForImprovement;

            traderDialog.nodes.services.options[0].isDisabled = cantAffordBag;
          }
        }

        return traderDialog;

      case BUILDING_NAMES.MEDICAL_STATION:
        if (dialogFlags.includes(DIALOGUE_FLAGS.PRIEST_WELCOME)) {
          priestDialog.startNode = "greetings";
        }

        return priestDialog;

      case BUILDING_NAMES.TOWER:
        if (dialogFlags.includes(DIALOGUE_FLAGS.PHOTO)) {
          starCounterDialog.startNode = "buy_camera";

          const buyNode = starCounterDialog.nodes.buy_camera.options.find(
            (option) => option.id === DIALOGUE_IDS.BUY_CAMERA,
          );

          if (buyNode) {
            buyNode.isDisabled = gold < 5000;
          }
        }

        if (dialogFlags.includes(DIALOGUE_FLAGS.CAMERA)) {
          starCounterDialog.startNode = "almanac";
        }

        return starCounterDialog;

      case BUILDING_NAMES.CITADEL: {
        if (dialogFlags.includes(DIALOGUE_FLAGS.ECONOMIC_INTRO)) {
          toggleEconomicModal(true);
          setDialogueOpen(null);
          return null;
        }

        return citadelDialog;
      }

      default:
        return null;
    }
  }, [npc, dialogFlags, resourcesBagLevel, gold]);

  return dialogue;
};
